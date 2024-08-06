/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    let newArr = [];
    arr.forEach((element, index) => {
        newArr.push(fn(element, index));
    })
    return newArr;
};