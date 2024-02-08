/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    let p=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("promise resolved after "+n+" seconds");
        },n*1000);
    });
    return p;
}

let p1=wait(1);
console.log(p1);
p1.then((msg)=>{
    console.log(msg);
})