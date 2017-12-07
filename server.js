var express = require("express");




var app = express()

app.get('/', (req,res) => {
    res.send({
        test: 'OK'
    })
})

app.listen(8080, () => console.log("Server is running"))