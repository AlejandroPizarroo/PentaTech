const express = require("express");
const certificationSchema = require("../models/certification")

const router = express.Router();

// create certification

router.post("/certifications", (req,res) => {
    const certification = certificationSchema(req.body);
    certification
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// get all certifications
router.get("/certifications", (req,res) => {
    certificationSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// get all certifications from udemy
router.get("/certifications/:org", (req,res) => {
    const { org } = req.params
    certificationSchema
    .find()
    .where('org')
    .all([org])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// get specific certification by id
router.get("/certifications/:id", (req,res) => {
    const { id } = req.params;
    certificationSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// update certification
router.put("/certifications/:id", (req,res) => {
    const { id } = req.params;
    const { uid, org, certification} = req.body;
    certificationSchema
    .updateOne({_id: id}, {$set :{uid,org,certification} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// delete certification
router.delete("/certifications/:id", (req,res) => {
    const { id } = req.params;
    certificationSchema
    .findByIdAndRemove(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})


// get only org from all dataset
router.get("/certifications/all/orgs", (req, res) => {
    certificationSchema.find({}, 'org')
      .then((results) => {
        const orgs = results.map(function (doc) {
          return doc.org;
        });
        res.json(orgs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving orgs');
      });
  });

  // get how many times a parameter (:parametr) repeats
router.get("/certifications/count/:parametr", (req, res) => {
    const { parametr } = req.params;
certificationSchema.aggregate([
    { $group: { _id: "$" + parametr, count: { $sum: 1 } } },
    { $project: { group: "$_id", value: "$count", _id: 0 } }, //modify json fields
    { $sort: { value: -1 } },                                 // sort descending
    //{ $limit: 10 }                                          // choose the number of groups
])
    .then((results) => {
    res.json(results);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).send('Error retrieving how many times a parameter repeats');
    });
});
  
module.exports = router;