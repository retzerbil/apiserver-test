const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())


const employees = [{
    name: "Stefan",
    birthDate:new Date('1972-08-03'),
    id:1,
    hourlySalary:100
},{
    name: "Oliver",
    birthDate:new Date('2008-05-28'),
    id:4,
    hourlySalary:50
},
{
    name: "Josefine",
    birthDate:new Date('2002-03-30'),
    id:3,
    hourlySalary:50
},
{
    name: "Fanny",
    birthDate:new Date('2000-01-02'),
    id:2,
    hourlySalary:60
}]

app.get('/api/employees/:anvId',(req,res)=>{
    console.log(req.params.anvId)
    let p = employees.find(employee=>employee.id == req.params.anvId)
    // 404???
    if(p == undefined){
        res.status(404).send('Finns inte')
    }
    res.json(p)
});

app.delete('/api/employees/:anvId',(req,res)=>{
    console.log(req.params.anvId)
    let p = employees.find(employee=>employee.id == req.params.anvId)
    // 404???
    if(p == undefined){
        res.status(404).send('Finns inte')
    }
    employees.splice(employees.indexOf(p),1)
    res.status(204).send('')   
});

app.put('/api/employees/:anvId',(req,res)=>{
    let p = employees.find(employee => employee.id == req.params.anvId)
    if(p === undefined){
        res.status(404).send('finns inte')
    }

    p.birthDate = req.body.birthDate
    p.name = req.body.name
    p.hourlySalary = req.body.hourlySalary
    res.status(204).send('updated')
});



function getNextId(){
    let m = Math.max(...employees.map(employee => employee.id))
    return m + 1
}



app.post('/api/employees',(req,res)=>{
    const employee = {
        name: req.body.name,
        birthDate: req.body.birthDate,
        hourlySalary: req.body.hourlySalary,
        id:getNextId()
    }
    employees.push(employee)
    // ta det som finnas i body skapa nytt objekt och lägg in i arrayen
    // returnera 201 Created
    //console.log(req.body);
    //req.body.name
    //req.body.birthDate
    //req.body.hourlySalary
    res.status(201).send("Created");
});

app.get('/api/employees',(req,res)=>{
    let result = employees.map(p=>({
        id: p.id,
        name: p.name,
        hourlySalary: p.hourlySalary
    }))
     res.json(result)
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  