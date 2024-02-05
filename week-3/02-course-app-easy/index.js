const express=require("express")
const bodyParser=require("body-parser");
;
const app=express();
app.use(bodyParser.json());

let USERS=[];
let ADMIN=[];
let COURSE=[];

const adminAuth=(req,res,next)=>{
    const adminExists=ADMIN.find((a)=>{
        return a.username==req.headers.username && a.password==req.headers.password;
    });
    if(adminExists){
        next();
    }else{
        res.status(404).json({msg:"Admin Auth failed!!"});
    }
}
app.post("/admin/signup",(req,res)=>{
    const admin=req.body;
    const adminExist=ADMIN.find((a)=>{
        return a.username==admin.username
    });
    if(adminExist){
        res.status(404).json({msg:"Admin slready exists!"});
    }else{
        ADMIN.push(admin);
        res.status(201).json({msg:"admin signed up!!"});
    }
});

app.post("/admin/login",adminAuth,(req,res)=>{
    res.status(201).json({msg:"admin login success"});
})

let courseId=1;
app.post("/admin/courses",adminAuth,(req,res)=>{
    COURSE.push({courseId,...req.body});
    res.status(201).json({msg:"Course added!!",courseId});
    courseId+=1;
});

app.put("/admin/courses/:courseid",adminAuth,(req,res)=>{
    const id=req.params.courseid;
    const {title,description,price,published}=req.body;
    let flag=false;
    COURSE.forEach((c)=>{
        if(c.courseId==id){
            flag=true;
            c.title=title;
            c.description=description;
            c.price=price;
            c.published=published;
        }
    })
    if(flag){
        res.status(201).json({msg:"Course update successfully!"});
    }else{
        res.status(404).json({msg:"Course does not exists"})
    }
})

app.get("/admin/courses",adminAuth,(req,res)=>{
    res.status(201).json(COURSE);
})


const userAuth=(req,res,next)=>{
    const userExists=USERS.find((u)=>{
        return u.username==req.headers.username && u.password==req.headers.password;
    });
    if(userExists){
        next();
    }else{
        res.status(404).json({msg:"User auth failed!!"});
    }
}

app.post("/users/signup",(req,res)=>{
    const userExists=USERS.find((u)=>{
        return u.username==req.body.username;
    });
    if(userExists){
        res.status(404).json({msg:"Users already exists!!"});
    }else{
        USERS.push({...req.body,purchasedCourses:[]});
        res.status(201).json({msg:"User signed up!!"});
    }
});

app.post('/users/login',userAuth,(req,res)=>{
    res.status(200).json({msg:"User login success!!"});
});

app.get('/users/courses',userAuth,(req,res)=>{
    res.status(201).json(COURSE);
});

app.post("/users/courses/:courseid",userAuth,(req,res)=>{
    USERS.forEach((u)=>{
        if(u.username==req.headers.username){
            u.purchasedCourses.push(COURSE[req.params.courseid-1]);
        }
    });
    res.status(201).json({msg:"Course purchased!!"});
});

app.get("/users",userAuth,(req,res)=>{
    res.status(201).json(USERS);
});

app.listen(3002,()=>{
    console.log("server running at 3002");
})











// ## Create a course selling website

// ### Description
// 1. Admins should be able to sign up
// 2. Admins should be able to create courses
//    1. Course has a title, description, price, and image link
//    2. Course should be able to be published
// 3. Admins should be able to edit courses
// 4. Users should be able to sign up
// 5. Users should be able to purchase courses
// 6. Users should be able to view purchased courses
// 7. Users should be able to view all courses

// ## Routes
// ### Admin Routes:
//  - POST /admin/signup
//    Description: Creates a new admin account.
//    Input: { username: 'admin', password: 'pass' }
//    Output: { message: 'Admin created successfully' }
//  - POST /admin/login
//    Description: Authenticates an admin. It requires the admin to send username and password in the headers.
//    Input: Headers: { 'username': 'admin', 'password': 'pass' }
//    Output: { message: 'Logged in successfully' }
//  - POST /admin/courses
//    Description: Creates a new course.
//    Input: Headers: { 'username': 'admin', 'password': 'pass' }
//    Input: Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }
//    Output: { message: 'Course created successfully', courseId: 1 }
//  - PUT /admin/courses/:courseId
//    Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited.
//    Input: Headers: { 'username': 'admin', 'password': 'pass' }
//    Input: Body { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false }
//    Output: { message: 'Course updated successfully' }
//  - GET /admin/courses
//    Description: Returns all the courses.
//    Input: Headers: { 'username': 'admin', 'password': 'pass' }
//    Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
//    User Routes:

// ### User routes
//  - POST /users/signup
//    Description: Creates a new user account.
//    Input: { username: 'user', password: 'pass' }
//    Output: { message: 'User created successfully' } 
//  - POST /users/login
//    Description: Authenticates a user. It requires the user to send username and password in the headers.
//    Input: Headers: { 'username': 'user', 'password': 'pass' }
//    Output: { message: 'Logged in successfully' }
//  - GET /users/courses
//    Description: Lists all the courses.
//    Input: Headers: { 'username': 'admin', 'password': 'pass' }
//    Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
//  - POST /users/courses/:courseId
//    Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
//    Input: Headers: { 'username': 'admin', 'password': 'pass' }
//    Output: { message: 'Course purchased successfully' }
//  - GET /users/purchasedCourses
//    Description: Lists all the courses purchased by the user.
//    Input: Headers: { 'username': 'admin', 'password': 'pass' }
//    Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
