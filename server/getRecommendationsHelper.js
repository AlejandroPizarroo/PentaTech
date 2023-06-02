const getUnsortedAndDuplicatedCerts = require("./jaccard-index.js");
const getSortedButDuplicatedCerts = require("./quickSort.js");
const deleteDuplicatedCerts = require("./deleteDuplicates.js");
function getRecommendations(ibmCerts, courseraCerts) {
    let numRecommendedCerts = 4;
    let UnsortedAndDuplicatedCerts = getUnsortedAndDuplicatedCerts(ibmCerts, courseraCerts);
    let sortedButDuplicatedCerts = getSortedButDuplicatedCerts(UnsortedAndDuplicatedCerts);
    let sortedAndNotDuplicated = deleteDuplicatedCerts(sortedButDuplicatedCerts);
    let recommendedCertifications = [];
    for(let i = 0; i < numRecommendedCerts; i++) {
        recommendedCertifications.push(sortedAndNotDuplicated[i]);
    }
    // array of arrays containg all recommended certs and percentages ---------------------
    let recommendedCertificationsPerc = [];
    for(let i = 0; i < recommendedCertifications.length; i++) {
        let certAndRecommendPerc = []
        let certificationName = recommendedCertifications[i][0];
        certAndRecommendPerc.push(certificationName);
        let index = recommendedCertifications[i][1];
        //convert to percentage from float:
        index = index * 100;
        let percentage = index.toFixed(1) + "%";
        certAndRecommendPerc.push(percentage);
        recommendedCertificationsPerc.push(certAndRecommendPerc);
    }
    let ibmCertsAndRecommendations = ibmCerts;
    for(let i = recommendedCertificationsPerc.length - 1; i > -1; i--) {
        let recommendedCertificationAndPercentage = {
            recommendedCert: recommendedCertificationsPerc[i][0],
            percentage: recommendedCertificationsPerc[i][1]
        }
        ibmCertsAndRecommendations.unshift(recommendedCertificationAndPercentage);
    }
    return ibmCertsAndRecommendations;
}

module.exports = getRecommendations;