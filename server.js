var express = require("express");
var path = require('path')
var engine = require('ejs-mate')


var app = express()
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/static',express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {
    return res.render('index',{
        
    })
})

app.listen(8080, () => console.log("Server is running"))