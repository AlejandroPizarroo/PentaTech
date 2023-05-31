function quickSortDescending(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1][1];
    const pivotSubarray = []
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] > pivot) {
            left.push(arr[i]);
        } else if(arr[i][1] < pivot){
            right.push(arr[i]);
        }
        else {
            pivotSubarray.push(arr[i]);
        }
    }
    return [...quickSortDescending(left), ...pivotSubarray, ...quickSortDescending(right)];
}

module.exports = quickSortDescending;