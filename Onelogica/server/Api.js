const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');

require('dotenv').config();
require("./Connection");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const sign = require('./SchemaForm');// the exported collection and schema is stored in sign.if we want to perform crud in db then we need it.
const track=require('./Trackerschema')
app.get('/', (req, res) => {
    res.send('server working');
  });

  app.post('/signup', async (req, res) => {
    const { username,employeeid, email, password } = req.body;
    //the data which is being sent by signup form will be inside request body.
    //const { username, email, password } = req.body;: This line of code is using destructuring assignment in JavaScript. 
    //It's extracting specific properties (username, email, and password) from the req.body object and assigning their values to individual variables.
    //username, email, and password are variable names that will be created based on the properties found in req.body.
    const existingUser = await sign.findOne({ email:email });//first username is the field name inside schema and secondone is the data recieved from frontend side.
    //If a document with the username specified in the query criteria is found in the "sign" collection, the existingUser variable will be assigned an object representing that document.
    //sign is the name of model. using model we perform crud operations
    if (existingUser) {//objects are considerd as trruthy value
      return res.status(400).json({ message: 'Username already taken' });
    }
  
    const hashedPassword = await bcryptjs.hash(password, 10);//10 is cost factor
    const newUser = new sign({ username, employeeid,email, password: hashedPassword });//creating data using model
  
    try {
      await newUser.save();
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username,employeeid, email, password } = req.body;
    const user = await sign.findOne({ username: username, email: email });
  //This query will retrieve a document from the sign collection where both the username and email fields match the specified values simultaneously.
  // If such a document exists, it will be stored in the user variable.
   //findone will return the required data object or null. null is falsy whereas object is truthy.
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
   
    const isPasswordValid = await bcryptjs.compare(password, user.password);
  //true or false will be returned in above variable.
    if (!isPasswordValid) { //!true=false
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    let token;
    if (username === process.env.NAME&&email===process.env.EMAIL&&password===process.env.ADMIN_PASSW) {
      //generating token for admin roled
      token = jwt.sign({ userId: user._id, employeeid:user.employeeid,role: 'Admin' }, 'your_secret_key', { expiresIn: '1h' });
    } else {
      //generating token for users role
      token = jwt.sign({ userId: user._id, employeeid:user.employeeid,role: 'user' }, 'your_secret_key', { expiresIn: '1h' });
    }
  
    res.json({ token });
  //Sends a JSON response containing the generated token. This response can be consumed by the client, typically for authentication purposes
  });
  

  app.post('/tracking',async (req,res)=>{
    const {username,employeeid,useremail,logintime,logouttime}=req.body;

    const newlog = new track({ username,employeeid, useremail,logintime,logouttime });//creating data using model
   
    try {
      await newlog.save();
      res.status(200).json({ message: 'User details logged successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ message: 'Failed to log' });
    }
  })

  app.get('/getlogs',async(req,res)=>{
    track.find({}).then((data) => {
      res.send(data);
    });
  })
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });