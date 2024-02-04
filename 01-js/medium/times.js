/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function calculateTime(n) {
    let start=new Date();
    let sum=0;
    for(let i=1; i<=n; i++){
        sum+=i;
    }
    let end=new Date();
    console.log(start.getDate());
    console.log(start.getDay());
    console.log(start.getHours());
    console.log(start.getMinutes());
    console.log(start.getSeconds());
    console.log(start.getMilliseconds());
    console.log("time taken is : "+(end.getSeconds()-start.getSeconds())+" in seconds");
}

calculateTime(10000000000);