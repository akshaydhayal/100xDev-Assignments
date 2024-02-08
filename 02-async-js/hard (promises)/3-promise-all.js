/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */



function waitOneSecond() {
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("after 1 sec");
        },1000);
    })
}

function waitTwoSecond() {
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("after 2 seconds");
        },2000);
    })
}

function waitThreeSecond() {
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("after 3 seconds");
        },3000);
    })
}

function calculateTime() {
    let p1=waitOneSecond();
    let p2=waitTwoSecond();
    let p3=waitThreeSecond();
    Promise.all([p1,p2,p3]).then((data)=>{
        console.log("all promises resolved!!");
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
}

calculateTime();