const express = require('express')
const { readFile } = require('fs')
const { stringify } = require('querystring')
const app = express()
const fs = require('fs').promises           // promises is used for asnc await calls
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
    var hours = req.body.hours;
    const timestamp = req.timestamp;

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
    // Find the user by id
    const user = users.find(u => u.id === id);

    res.status(200).send(user);
});



app.delete('/sleep/:id', async (req, res) => {
    const id = Number(req.params.id);

    // Reading the file asynchronously
    const data = await fs.readFile("data.json", "utf-8");

    // Parsing JSON data 
    const users = JSON.parse(data);

    // Remove the user with the specified ID and make new array with updated users
    const updatedUsers = users.filter(u => u.id !== id);
        
    // Write the updated data back to the file
    await fs.writeFile("data.json", JSON.stringify(updatedUsers, null, 2));
    
    res.redirect('/');
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})