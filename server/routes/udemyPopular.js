const express = require("express");
const udemyPopularSchema = require("../models/udemyPopular")
const router = express.Router();

//GET the most popular "skills" from Udemy certificates/courses 
//by the number they repeat in the database
//Only working with name parametr
router.get("/popular/count/:parametr", (req, res) => {
    const { parametr } = req.params;
    udemyPopularSchema.aggregate([
        { $group: { _id: "$" + parametr, count: { $sum: 1 } } },
        { $project: { word:"$_id" , group: "$_id", value: "$count", _id: 0 } }, //modify json fields
        { $sort: { value: -1 } },                                 // sort descending
        { $limit: 50 }                                          // choose the number of groups
    ])
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error retrieving how many times a skill/name repeats (Udemy)');
        });
});

module.exports = router;