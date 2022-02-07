const express = require('express');
let axios = require('axios');
var app = express();
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.post('/', async (req, res, next) => {
  try {
    const promises = []

    req.body.developers.forEach(r => {
      promises.push(
        axios.get(`https://api.github.com/users/${r}`)
      )
    });

    const results = await Promise.all(promises)

    const out = []

    results.forEach(res => {
      out.push({
        "name": res.data.name, 
        "bio": res.data.bio
      })
    })

    return res.send(JSON.stringify(out));
  } catch (err) {
    console.log(err)
    next(err);
  }
});

module.exports = app;