const bodyParser = require("body-parser");
const fs=require("fs");
const express=require("express");
const jwt=require("jsonwebtoken");

const app=express();
app.use(bodyParser.json());

const adminSecret="secret";
const adminAuth=(req,res,next)=>{
    const token=req.headers.token;
    const decodedToken=jwt.verify(token,adminSecret);
    if(decodedToken){
        next();
    }else{
        res.status(403).json({msg:"Admin auth failed"});
    }
}
function generateAdminJwt(payload){
    return jwt.sign(payload,adminSecret);
}

app.post("/admin/signup",(req,res)=>{

    fs.readFile("admin.json","utf-8",(err,dataa)=>{
        const data=JSON.parse(dataa);
        console.log(dataa);
        console.log(data);
        const adminExists=data.find((a)=>{
            return a.username==req.body.username;
        });
        if(adminExists){
            res.status(403).json({msg:"Admin already exists!!"});
        }else{
            data.push(req.body);
            fs.writeFile("admin.json",JSON.stringify(data),()=>{
                const token=generateAdminJwt(req.body.username);
                console.log(token);
                res.status(201).send({msg:"Admin created!!",token});
            });
        }
    })
});

app.post("/admin/login",(req,res)=>{
    fs.readFile("admin.json","utf8",(err,data)=>{
        const parseData=JSON.parse(data);
        const adminExists=parseData.find((a)=>{
            return a.username==req.body.username && a.password==req.body.password;
        });
        if(adminExists){
            const token=generateAdminJwt(req.body.username);
            res.json({msg:"admin Login sucess!!",token});
        }else{
            res.status(403).json({msg:"Admin login failed!"});
        }
    })
});

let courseId=1;
x=1;
console.log("sex");

app.post('/admin/courses',adminAuth,(req,res)=>{
    fs.readFile("course.json","utf8",(err,data)=>{
        const parseData=JSON.parse(data);
        console.log("couseId : "+courseId);
        courseId+=1;
        // x=x+1;
        // console.log("x : "+x);
        parseData.push({...req.body,courseId:parseData.length+1});
        console.log(parseData);
        console.log("couseId : "+courseId);
        fs.writeFile("course.json",JSON.stringify(parseData),()=>{
            res.status(201).json({msg:"Course added",course:req.body});
        })
    })
});

app.get("/admin/courses",adminAuth,(req,res)=>{
    fs.readFile("course.json","utf-8",(err,data)=>{
        const parseData=JSON.parse(data);
        res.status(201).json(parseData);
    })
});

app.put("/admin/courses/:courseid",adminAuth,(req,res)=>{
    fs.readFile("course.json","utf-8",(err,data)=>{
        const parseData=JSON.parse(data);
        parseData.forEach((c)=>{
            if(c.courseId==req.params.courseid){
                Object.assign(c,req.body);
                fs.writeFile("course.json",JSON.stringify(parseData),()=>{
                    res.status(201).json({msg:"Course updated!!"});
                })
            }
        })
    })
})

const userSecret="sec3ret";
function generateUserJwt(payload){
    return jwt.sign(payload,userSecret);
}

const userAuth=(req,res,next)=>{
    const token=req.headers.token;
    const decodedToken=jwt.verify(token,userSecret);
    if(decodedToken){
        console.log(token);
        next();
    }else{
        res.status(403).json({msg:"User Auth failed!!"});
    }
}

app.post("/users/signup",(req,res)=>{
    fs.readFile("user.json","utf-8",(err,data)=>{
        const parseData=JSON.parse(data);
        const userExists=parseData.find((u)=>{
            return u.username==req.body.username;
        });
        if(userExists){
            res.status(403).json({msg:"User already exists!!"});
        }else{
            parseData.push({...req.body,purchasedCourses:[]});
            fs.writeFile("user.json",JSON.stringify(parseData),()=>{
                const token=generateUserJwt(req.body.username);
                res.status(201).json({msg:"user created!!",token});
            })
        }
    })
});

app.post("/users/login",(req,res)=>{
    fs.readFile("user.json","utf-8",(err,data)=>{
        const parseData=JSON.parse(data);
        const userExists=parseData.find((u)=>{
            return u.username==req.body.username && u.password==req.body.password;
        });
        if(userExists){
            const token=generateUserJwt(req.body.username);
            res.status(201).json({msg:"User login sucess!!",token});
        }else{
            res.status(403).json({msg:"User login failed!!"});
        }
    })
});

app.get("/users/courses",userAuth,(req,res)=>{
    fs.readFile("course.json","utf-8",(err,data)=>{
        res.status(201).json(JSON.parse(data));
    })
});

app.post("/users/courses/:courseid",userAuth,(req,res)=>{
    const username=jwt.verify(req.headers.token,userSecret);
    const id=req.params.courseid;
    fs.readFile("user.json","utf-8",(err,data)=>{
        const parseData=JSON.parse(data);
        fs.readFile("course.json","utf-8",(err,courseData)=>{
            const parseCourseData=JSON.parse(courseData);
            parseCourseData.forEach((c)=>{
                if(c.courseId==id){
                    parseData.forEach((u) => {
                      if (u.username == username) {
                        u.purchasedCourses.push(c);
                      }
                    });
                }
            });
            fs.writeFile("user.json",JSON.stringify(parseData),()=>{
                res.status(201).json({msg:"Course purchased!!"});
            })
        })
    })
});

app.get("/users",userAuth,(req,res)=>[
    fs.readFile("user.json","utf-8",(err,data)=>{
        res.status(201).json(JSON.parse(data));
    })
])

app.listen(3002,()=>{
    console.log("server running at 3002");
})