const express = require("express");
const certificationSchema = require("../models/certification")

const router = express.Router();

// create certification using POST method all model paremeters required
router.post("/certifications", (req,res) => {
    const certification = certificationSchema(req.body);
    certification
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// get all certifications with all parameters
router.get("/certifications", (req,res) => {
    certificationSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// get all certifications from an especific 'org' e.g(Finance and Operations)
// Along with all the parameters
router.get("/certifications/:org", (req,res) => {
    const { org } = req.params
    certificationSchema
    .find()
    .where('org')
    .all([org])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// update certification
// NOT WORKING WITH ACTUAL SCHEMA!!!
router.put("/certifications/:id", (req,res) => {
    const { id } = req.params;
    const { uid, org, certification} = req.body;
    certificationSchema
    .updateOne({_id: id}, {$set :{uid,org,certification} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// delete certification
// NEED TEST!
router.delete("/certifications/:id", (req,res) => {
    const { id } = req.params;
    certificationSchema
    .findByIdAndRemove(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// get only org from all dataset in a list
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
  // only get group (parameter) and value (times the parameter repeats)
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

// get all certifications from specific uid
// along with all the parameters
router.get("/certifications/uid/:uid", (req,res) => {
    const { uid } = req.params
    certificationSchema
    .find()
    .where('uid')
    .all([uid])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}))
})

// get all certifications from specific uid
// along with database id
router.get("/certifications/uidv2/:uid", (req, res) => {
    const { uid } = req.params;
    certificationSchema
      .find({ uid }, 'certification')                      //add or remove parameters of the response
      .then((data) => {
        if (data.length === 0) {
          res.json({ message: "Invalid uid" });
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving certifications by uid');
        });
  });

// Retrieve only certifications from specific uid
router.get("/certifications/uidv3/:uid", (req, res) => {
  const { uid } = req.params;
  certificationSchema
    .find({ uid }, { certification: 1, _id: 0 }) // Specify fields to include/exclude
    .then((data) => {
      if (!data) {
        res.json({ message: "Invalid uid" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving certifications by uid');
    });
});


module.exports = router;