const jwt=require("jsonwebtoken");

const secret="dhayal";
const token=jwt.sign("akshay",secret);
console.log(token);

const r=jwt.verify("ram",secret);
console.log(r);