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
    let recommendedCertificationsAndEmpCerts = []
    let recommendedCertsObj = {
        RecommendedCerts:recommendedCertificationsPerc
    }
    recommendedCertificationsAndEmpCerts.push(recommendedCertsObj);
    recommendedCertificationsAndEmpCerts.push(ibmCerts);
    return recommendedCertificationsAndEmpCerts;
}

module.exports = getRecommendations;