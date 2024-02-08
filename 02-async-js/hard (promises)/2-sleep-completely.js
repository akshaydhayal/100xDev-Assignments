/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleepProgram(n){
    // setTimeout(()=>{
    //     console.log("running after "+n+" seconds");
    // },n*1000);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("resolved after "+n+" seconds");
        },n*1000);
    })
}
async function sleep (seconds) {
    console.log("sleep program start");
    await sleepProgram(seconds);
    console.log("sleep program end");
}
sleep(5);