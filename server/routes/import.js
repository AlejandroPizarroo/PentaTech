const express = require("express");
const router = express.Router();
const importDateSchema = require("../models/importDate")
const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const csvtojson = require('csvtojson');
const certificationSchema = require("../models/certification")


// Set up Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('csv'), async (req, res) => {
  try {
    const jsonArrayObj = await csvtojson().fromFile(req.file.path);

    const cleanedData = jsonArrayObj.map((row) => {
      if (!row.uid.trim()) {
        const errorMessage = `Null or empty "uid" found`;
        //console.error(errorMessage);
        throw new Error(errorMessage);
      }
      else if (!row.certification.trim()) {
        const errorMessage = `Null or empty "certification" found for uid: ${row.uid.trim()}`;
        //console.error(errorMessage);
        throw new Error(errorMessage);
      }
      else if (!row.org.trim()) {
        const errorMessage = `Null or empty "org" found for uid: ${row.uid.trim()}`;
        //console.error(errorMessage);
        throw new Error(errorMessage);
      }
      else if (!row.type.trim()) {
        const errorMessage = `Null or empty "type" found for uid: ${row.uid.trim()}`;
        //console.error(errorMessage);
        throw new Error(errorMessage);
      }


      const key = `${row.uid.trim()}-${row.certification.trim()}`;

      return {
        uid: row.uid.trim(),
        certification: row.certification.trim(),
        key: key,
        org: row.org.trim(),
        work_location: row.work_location.trim(),
        issue_date: row.issue_date.trim(),
        type: row.type.trim()
      };
    });

    const existingData = await certificationSchema.find({}, 'key');
    const existingKeys = existingData.map((data) => data.key);

    const uniqueData = [];
    const uniqueKeys = new Set();

    let duplicateCount = 0;
    let newCert = 0;

    for (const data of cleanedData) {
      const key = `${data.uid}-${data.certification}`;

      if (!uniqueKeys.has(key) && !existingKeys.includes(key)) {
        uniqueData.push(data);
        uniqueKeys.add(key);
        newCert++;
      } else {
        //console.log("repeated: ")
        //console.log(key)
        duplicateCount++;
      }
    }

    if(newCert === 0){
      const errorMessage = 'All the data is duplicated'
      throw new Error(errorMessage) 
    }
    //console.log(uniqueData);
    //console.log(uniqueKeys);
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  
    const savedDate = await importDateSchema.create({date: formattedDate})
    const savedData = await certificationSchema.create(uniqueData);
    
    
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(400).send(`Error: ${error.message}`);
  } finally {
    // Delete the uploaded file
    fs.unlinkSync(req.file.path);
  }
});

router.post('/upload2', upload.single('csv'), async (req, res) => {
  try {
    const jsonArrayObj = await csvtojson().fromFile(req.file.path);

    const cleanedData = jsonArrayObj.map((row) => {
      if (!row.uid.trim()) {
        const errorMessage = `Null or empty "uid" found`;
        throw { message: errorMessage, status: 200 };
      } else if (!row.certification.trim()) {
        const errorMessage = `Null or empty "certification" found for uid: ${row.uid.trim()}`;
        throw { message: errorMessage, status: 200 };
      } else if (!row.org.trim()) {
        const errorMessage = `Null or empty "org" found for uid: ${row.uid.trim()}`;
        throw { message: errorMessage, status: 200 };
      } else if (!row.type.trim()) {
        const errorMessage = `Null or empty "type" found for uid: ${row.uid.trim()}`;
        throw { message: errorMessage, status: 200 };
      }

      const key = `${row.uid.trim()}-${row.certification.trim()}`;

      return {
        uid: row.uid.trim(),
        certification: row.certification.trim(),
        key: key,
        org: row.org.trim(),
        work_location: row.work_location.trim(),
        issue_date: row.issue_date.trim(),
        type: row.type.trim(),
      };
    });

    const existingData = await certificationSchema.find({}, 'key');
    const existingKeys = existingData.map((data) => data.key);

    const uniqueData = [];
    const uniqueKeys = new Set();

    let duplicateCount = 0;
    let newCert = 0;

    for (const data of cleanedData) {
      const key = `${data.uid}-${data.certification}`;

      if (!uniqueKeys.has(key) && !existingKeys.includes(key)) {
        uniqueData.push(data);
        uniqueKeys.add(key);
        newCert++;
      } else {
        //console.log("repeated: ")
        //console.log(key)
        duplicateCount++;
      }
    }

    if(newCert === 0){
      const errorMessage = 'All the data is duplicated'
      throw { message: errorMessage, status: 200 };
    }
    //console.log(uniqueData);
    //console.log(uniqueKeys);
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  
    const savedDate = await importDateSchema.create({date: formattedDate})
    const savedData = await certificationSchema.create(uniqueData);

    res.status(200).json({
      message: `${newCert} New data saved successfully! ${duplicateCount} duplicates found`,
    });

  } catch (error) {
    console.error('Error:', error);
    res.statusMessage = error.message 
    res.status(error.status || 500).json({ message: error.message || 'Error saving data' });
  } finally {
    // Delete the uploaded file
    fs.unlinkSync(req.file.path);
  }
});


router.get('/newest-update', async (req, res) => {
    try {
      const newestObject = await importDateSchema.findOne().sort({ date: -1 });
      res.json({date: newestObject.date});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;

