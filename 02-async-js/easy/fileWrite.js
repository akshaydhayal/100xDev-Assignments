const fs=require("fs");

function fileIsWritten(){
    console.log("content written to file, success!!");
}
fs.writeFile("file.txt","akshay",fileIsWritten);

