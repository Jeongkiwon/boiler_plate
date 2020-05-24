const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

app.get('/', (req, res) => res.send('Hello World!'))

mongoose.connect('mongodb+srv://patrick:1203658a!@boilerplate-em9bg.mongodb.net/test?retryWrites=true&w=majority'
,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false})
.then(()=>console.log('MongoDB connected')).catch(err => console.log(err));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));