// const dbConnect = require("./dbConnect.js");
import dbConnect from "./dbConnect.js";

import SleepRecord from './SleepRecord.js';

// const express = require('express')
import express from 'express';

// const { readFile } = require('fs')
// const { stringify } = require('querystring')

const app = express()

// const fs = require('fs').promises                    // promises is used for asnc await calls
import fs from 'fs/promises';                           // we are removing require keyword as mjs file doesn't except, instead use import

const port = 3000


// app.use(middleware)
app.use(express.json())

app.use((req, res, next) => {
    req.timestamp = new Date().getTime();
    next();
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post('/sleep', async (req, res) => {
    var id = req.body.id;
    // var userId = req.body.userId;
    var hours = req.body.hours;
    const timestamp = req.timestamp;

    // if (!userId || !hours){
    //     return res.status(400).send('Both userId and hours are required');
    // }

    if (!id || !hours){
        return res.status(400).send('Both id and hours are required');
    }

    const data = await fs.readFile("data.json", "utf-8");
    const users = JSON.parse(data);             // Parse the JSON data into a javascript array
    users.push({
        "id" : id,
        "hours" : hours,
        "timestamp" : timestamp
    })
    fs.writeFile("data.json", JSON.stringify(users, null, 2));

    res.status(200).send({
        "id" : id,
        "hours" : hours,
        "timestamp" : timestamp
    })

    // const newRecord = new SleepRecord({ 
    //     "id" : id, 
    //     "hours" : hours, 
    //     "timestamp" : timestamp 
    // });
    // await newRecord.save();
    // res.status(200).send(newRecord);
})


// USING CALLBACK 

// app.get('/sleep/:id', (req, res) => {
//     const id = Number(req.params.id);
//     fs.readFile("data.json", "utf-8", (err, data) => {
//         if (err){
//             return res.status(500).send("Error reading data file")
//         }
//         try {
//             const users = JSON.parse(data);
//             const user = users.find(users => users.id === id);
//             res.status(200).send(user);
//         } catch (parseError) {
//             res.status(500).send("Error parsing data file");
//         }
//     });
// })



// USING PROMISES - async await 

app.get('/sleep/:id', async (req, res) => {
    const id = Number(req.params.id);

    // Reading the file asynchronously
    const data = await fs.readFile("data.json", "utf-8");
    // Parsing JSON data 
    const users = JSON.parse(data);
    // Filter the user by id and store in user array
    const user = users.filter(u => u.id === id);

    if (user.length === 0){
        return res.status(404).send("Sleep Entry not found");
    }

    user.sort((x, y) => {
        new Date(x.timestamp) - new Date(y.timestamp);
    })
    
    res.status(200).send(user);


    // const record = await SleepRecord.findOne({ id });
    // if (!record){
    //     return res.status(404).send("Sleep Entry not found");
    // }
    // res.status(200).send(record);
});



app.delete('/sleep/:id', async (req, res) => {
    const id = Number(req.params.id);

    // Reading the file asynchronously
    const data = await fs.readFile("data.json", "utf-8");

    // Parsing JSON data 
    const users = JSON.parse(data);

    // Remove the user with the specified ID and make new array with updated users
    const updatedUsers = users.filter(u => u.id !== id);

    if (updatedUsers.length === users.length){
        return res.status(404).send("Sleep Entry not found");
    }
        
    // Write the updated data back to the file
    await fs.writeFile("data.json", JSON.stringify(updatedUsers, null, 2));


    // const result = await SleepRecord.findOneAndDelete({ id });
    // if (!result) {
    //     return res.status(404).send('Sleep Entry not found');
    // }

    
    res.redirect('/all');
});


// To display all users data
app.get('/all', async (req, res) => {
    try {
        const data = await fs.readFile("data.json", "utf-8");
        const users = JSON.parse(data);
        res.send(users);


        // const records = await SleepRecord.find({});
        // res.status(200).send(records);
    } catch (error) {
        console.error("Error reading data:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Connect to MongoDB
// dbConnect();

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// module.exports = app;
export {app};
