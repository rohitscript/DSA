/*
3011. Find if Array Can Be Sorted
Solved
Medium
Topics
Companies
Hint
You are given a 0-indexed array of positive integers nums.

In one operation, you can swap any two adjacent elements if they have the same number of 
set bits
. You are allowed to do this operation any number of times (including zero).

Return true if you can sort the array, else return false.

 
*/

var canSortArray = function(nums) {
    // Helper function to check if the array is sorted in non-decreasing order
    let checkSort = (array) => {
        for (let i = 1; i < array.length; i++) {
            // If any element is greater than the next, array is not sorted
            if (array[i - 1] > array[i]) return false;
        }
        return true; // Array is sorted
    }

    // Check if the input array is already sorted
    if (checkSort(nums) === true) return true;

    // Convert the first element to binary and count its 1-bits (Hamming weight)
    let temp = nums[0];
    let prev = 0;
    while (temp > 0) {
        prev += (temp % 2); // Increment if last binary digit is 1
        temp = Math.floor(temp / 2); // Shift right by dividing by 2
    }

    // Initialize variables to track the current min, max, and previous max values
    let currMax = nums[0];
    let currMin = nums[0];
    let prevMax = -1;

    // Iterate through the array starting from the second element
    for (let i = 1; i < nums.length; i++) {
        // Convert current element to binary and count its 1-bits
        temp = nums[i];
        let curr = 0;
        while (temp > 0) {
            curr += (temp % 2); // Increment if last binary digit is 1
            temp = Math.floor(temp / 2); // Shift right by dividing by 2
        }

        // If the current number of 1-bits is the same as the previous one
        if (prev === curr) {
            // Update the current min and max based on the number
            currMax = Math.max(currMax, nums[i]);
            currMin = Math.min(currMin, nums[i]);
        } else {
            // Otherwise, update previous max to current max and reset current min/max
            prevMax = currMax;
            currMax = nums[i];
            currMin = nums[i];
            prev = curr; // Update prev to current 1-bit count
        }

        // If previous max is greater than the current minimum, sorting isn't possible
        if (prevMax > currMin) return false;
    }

    // Final check in case the previous max is greater than the last current min
    if (prevMax > currMin) return false;

    // If all conditions are satisfied, return true
    return true;
};
