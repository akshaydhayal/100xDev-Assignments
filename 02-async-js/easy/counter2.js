// let start=new Date().getTime();

// // console.log(start.getTime()/1000);
// let ctr=0;
// while(1==1){
//     let curr=new Date().getTime();
//     if(curr-start%1000==0){
//         console.log(ctr);
//         ctr+=1;
//     }else{
//         console.log("A");
//     }
// }

let ctr=1;
function counter(){
    console.clear();
    console.log(ctr);
    ctr+=1;
    setTimeout(counter,1000);
}


setTimeout(counter,1000);