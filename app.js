const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const batchData = require("./models/databaseSchema");
const userData = require("./models/userSchema");
const connectToMongo = require("./db");
const bcrypt = require("bcrypt");
const noticeData = require("./models/noticeSchema");
const app = express();
connectToMongo()
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static("public"));

app.get('/', async(req,res)=>{
    const noticeDataArray = await noticeData.find({});
    res.render("index", {noticeData: noticeDataArray});
})

app.get('/alumni/:batch', async (req,res)=>{
    var batch = Number(req.params.batch);
    const batchDataArray = await batchData.find({});
    res.render("batchPage", {batch:batch, batchData:batchDataArray});
})
app.get('/user', (req,res)=>{
    res.render("signin_signup");
})

app.get('/admin', (req,res)=>{
    res.render("adminPage");
})

app.get("/updateDatabase", async(req, res)=>{
    try{
        res.render("updateDatabase");
    }catch(error){
        console.log(error);
    }
})


app.post('/login', async (req,res) => {
    const loginDetails = req.body;
    const loginPassword = loginDetails.loginPassword;
    const loginUsername = loginDetails.loginUsername;

    await userData.findOne({username:loginUsername})
    .then((loginData)=>{
        if(!loginData){
            return res.status(404).json({ message: 'User not found' });
        }

        bcrypt.compare(loginPassword, loginData.password, (err,result)=>{
            if(err){
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if(result){
                return res.status(200).json({ message: 'Authentication successful' });
            }
            else{
                return res.status(401).json({ message: 'Authentication failed' });
            }
        });
    }).catch((err)=>{
        console.error('Error finding user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
})

app.post('/register', (req,res)=>{
    const {registerUserName, registerEmail, registerPassword} = req.body;

    bcrypt
    .hash(registerPassword, 10)
    .then(hashedPassword => {
        const newUser = new userData({
            email: registerEmail,
            username: registerUserName,
            password: hashedPassword,
            rights: 'user'
        })

        newUser.save()
        .then(() => {
          console.log('User saved successfully');
          res.status(200).json({ message: 'User registered successfully' });
        //   alert('User Registered Succesfully!');
        })
        .catch((error) => {
          console.error('Error saving user:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        //   alert("User Already Exists With Same Username or Email ID");
        });
    })
    .catch(err => console.error(err.message))
    
})

app.post("/updateNotice", (req, res)=>{
    const {noticeHead} = req.body;

    const newNotice = new noticeData({
        noticeHead: noticeHead
    })

    newNotice.save()
    .then(() => {
        console.log('Notice saved successfully');
        res.status(200).json({ message: 'Notice Saved successfully' });
      })
      .catch((error) => {
        console.error('Error saving Notice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });

})

app.post("/updateDatabase", async(req, res)=>{
    const databaseContent = req.body;
    const newBatch = databaseContent.content;
    batchData.insertMany(newBatch, (err)=>{
        if(err){
            console.log(err);
            res.status(500).send("DataInsertFail");
        }else{
            console.log("Data Inserted Successfully!");
            res.status(200).send('DataInsertSuccess');
        }
    })
})
app.listen(PORT, ()=>{
    console.log(`Listening to the port ${PORT}`);
})
