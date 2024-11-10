// 3097. Shortest Subarray With OR at Least K II
// You are given an array nums of non-negative integers and an integer k.

// An array is called special if the bitwise OR of all of its elements is at least k.

// Return the length of the shortest special non-empty 
// subarray
//  of nums, or return -1 if no special subarray exists.

 

// Example 1:

// Input: nums = [1,2,3], k = 2

// Output: 1

// Explanation:

// The subarray [3] has OR value of 3. Hence, we return 1.

function minimumSubarrayLength(nums, k) {
    let ans = Infinity;
    let ors = 0;
    let count = new Array(30).fill(0);
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        ors = updateOr(ors, nums[right], count);
        
        while (ors >= k && left <= right) {
            ans = Math.min(ans, right - left + 1);
            ors = undoOr(ors, nums[left], count);
            left++;
        }
    }
    
    return ans === Infinity ? -1 : ans;
}

function updateOr(ors, num, count) {
    for (let i = 0; i < 30; i++) {
        if ((num >> i) & 1 && ++count[i] === 1) {
            ors |= 1 << i;
        }
    }
    return ors;
}

function undoOr(ors, num, count) {
    for (let i = 0; i < 30; i++) {
        if ((num >> i) & 1 && --count[i] === 0) {
            ors ^= 1 << i;
        }
    }
    return ors;
}