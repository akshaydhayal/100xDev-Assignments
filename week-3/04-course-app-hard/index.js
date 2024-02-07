const express=require("express");
const jwt=require("jsonwebtoken");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://akshay:akshay@cluster0.jy7weei.mongodb.net/")
.then(()=>{
    console.log("mongoose conencted!!");
});

const adminSchema=new mongoose.Schema({
    username:String,
    password:String
});
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}]
});
const courseSchema=new mongoose.Schema({
    courseId:Number,
    title:String,
    description:String,
    price:Number,
    published:Boolean
});

const Admin=mongoose.model("Admin",adminSchema);
const User=mongoose.model("User",userSchema);
const Course=mongoose.model("Course",courseSchema);

const adminSecret="secret";

function generateAdminJwt(payload){
    return jwt.sign(payload,adminSecret);
}
const adminAuth=(req,res,next)=>{
    const token=req.headers.token;
    const decodedToken=jwt.verify(token,adminSecret);
    if(decodedToken){
        next();
    }else{
        res.status(403).json({msg:"Admin auth failed!!"});
    }
};

app.post("/admin/signup",async(req,res)=>{
    const adminExists=await Admin.findOne({username:req.body.username});
    if(adminExists){
        res.status(403).json({msg:"Admin already exists!!"});
    }else{
        const admin=Admin(req.body);
        console.log(admin);
        admin.save();
        const token=generateAdminJwt(req.body.username);
        res.status(201).json({msg:"Admin added!",token});
    }
});

app.post("/admin/login",async(req,res)=>{
    const adminExist=await Admin.findOne({username:req.headers.username,password:req.headers.password});
    if(adminExist){
        const token=generateAdminJwt(req.headers.username);
        res.status(201).json({msg:"Admin login success!",token});
    }else{
        res.status(403).json({msg:"Admin login failed!!"});
    }
});

let courseId=1;
app.post("/admin/courses",adminAuth,async(req,res)=>{
    const course=Course({courseId,...req.body});
    courseId+=1;
    await course.save();
    console.log(course);
    res.status(201).json({msg:"Course added!!"});
});

app.get("/admin/courses",adminAuth,async(req,res)=>{
    const courses=await Course.find();
    console.log(courses);
    res.status(201).json(courses);
});

app.put("/admin/courses/:courseid",adminAuth,async(req,res)=>{
    await Course.findByIdAndUpdate(req.params.courseid,req.body);
    res.status(201).json({msg:"Course updated!!"});
});

const userSecret = "sec3ret";
function generateUserJwt(payload){
    return jwt.sign(payload,userSecret);
}
const userAuth=(req,res,next)=>{
    const token=req.headers.token;
    const decodedToken=jwt.verify(token,userSecret);
    if(decodedToken){
        next();
    }else{
        res.status(403).json({msg:"User auth failed!!"});
    }
}
app.post("/users/signup",async(req,res)=>{
    const userExists=await User.findOne({username:req.body.username});
    if(userExists){
        res.status(403).json({msg:"User already exists!!"});
    }else{
        const user=User(req.body);
        await user.save();
        console.log(user);
        const token=generateUserJwt(req.body.username);
        res.status(201).json({msg:"User created!!",token});
        
    }
});

app.post("/users/login",async(req,res)=>{
    const userExists=await User.findOne({username:req.headers.username,password:req.headers.password});
    if(userExists){
        const token=generateUserJwt(req.headers.username);
        res.status(201).json({msg:"User login success!!",token});
    }else{
        res.status(403).json({msg:"User login failed!!"});
    }
});

app.get("/users/courses",userAuth,async(req,res)=>{
    const courses=await Course.find();
    res.status(201).json(courses);
});

app.post("/users/courses/:courseid",userAuth,async(req,res)=>{
    const user=await User.findOne({username:req.headers.username});
    user.purchasedCourses.push(req.params.courseid);
    await user.save();
    res.status(201).json({msg:"Course purchased"});
});

app.get("/users",userAuth,async(req,res)=>{
    const users=await User.find().populate("purchasedCourses");
    res.status(201).json(users);
})

app.listen(3002,()=>{
    console.log("server running at 3002");
})