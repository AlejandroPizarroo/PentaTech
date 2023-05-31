function deleteDuplicates(array) {
    const uniqueStrings = new Set();
    const resultArray = [];

    for (const subarray of array) {
        const str = subarray[0];

        if (!uniqueStrings.has(str)) {
            uniqueStrings.add(str);
            resultArray.push(subarray);
        }
    }
    return (resultArray);
}

module.exports = deleteDuplicates;