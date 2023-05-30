var Jaccard = require("jaccard-index");
var jaccard = Jaccard();


// Google UX Design Professional Certificate (coursera)
// Enterprise Design Thinking Practitioner (ibm employee)
var item1 = "Google UX Design Professional Certificate";
var item2 = "Enterprise Design Thinking Practitioner";
var indexPercentage = jaccard.index(item1, item2) * 100;
var percentage = indexPercentage.toFixed(1) + "%";

console.log(percentage);