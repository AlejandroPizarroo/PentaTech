var Jaccard = require("jaccard-index");
var jaccard = Jaccard();

function getRecommendations(ibmCerts, courseraCerts) {
    let ibmCert = "";
    let courseraCert = "";
    let recommendationsUnsortedDuplicated = [];
    let ibmCertsLength = ibmCerts.length;
    let courseraCertsLength = courseraCerts.certification.length;
    for(let i = 0; i < ibmCertsLength; i++) {
        ibmCert = ibmCerts[i].certification;
        for(let i = 0; i < courseraCertsLength; i ++) {
            courseraCert = courseraCerts.certification[i];
            let recommendedCertAndIndex = []
            let ibmCertsArray = ibmCert.split(" ");
            let courseraCertArray = courseraCert.split(" ");
            let index = jaccard.index(ibmCertsArray, courseraCertArray);
            if(index > 0){
                recommendedCertAndIndex.push(courseraCert, index);
                recommendationsUnsortedDuplicated.push(recommendedCertAndIndex);
            }
        }
    }
    return recommendationsUnsortedDuplicated;
}

module.exports = getRecommendations;