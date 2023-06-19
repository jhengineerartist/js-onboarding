// Returns the index in the array of the target, or -1 if it is not found
export function binSearch(sortedArr, target, start = 0, end = sortedArr.length - 1) {
    indexOfElement = -1;
    if (start <= end) {
        mid = Math.floor((start + end) / 2);
        if (target == sortedArr[mid]) {
            indexOfElement = mid;
        }
        else if (target < sortedArr[mid]) {
            indexOfElement = binSearch(sortedArr, target, start, mid - 1);
        }
        else {
            indexOfElement = binSearch(sortedArr, target, mid + 1, end);
        }
    }
    return indexOfElement;
}