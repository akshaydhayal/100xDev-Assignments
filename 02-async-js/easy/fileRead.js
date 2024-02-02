const fs=require("fs");

function fileIsRead(err,content){
    if(err){
        console.log("error reading the file");
    }else{
        console.log("file content is : "+content);
    }
}
fs.readFile("file.txt","utf8",fileIsRead);