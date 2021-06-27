const express =require('express');
//const bodyParser =require('body-parser');
const pdf =require('html-pdf');
const cors = require('cors');

const pdfTemplate =require('./documents')

const app =express();

const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/',(req,res)=>{
    res.send("hello world");
})

//Post -pdf generation and fetching of data
app.post('/create-pdf',(req,res)=>{
    pdf.create(pdfTemplate(req.body),{}).toFile('result.pdf',(err)=>{
        if(err){
            res.send( Promise.reject());
        }
        res.send(Promise.resolve());
    })
})
///////Get  -Send the generated PDF to the client
app.get('/fetch-pdf',(req,res)=>{
    res.sendFile(`${__dirname}/result.pdf`)
})
app.listen(port, ()=> console.log(`listening on port ${port}`));