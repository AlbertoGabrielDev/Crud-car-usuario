const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password: "",
    database : "locacao",
})

app.use(express.json())
app.use(cors())

app.post("/registerclient",(req,res)=>{
    const name = req.body.name;
    const cnh = req.body.cnh;
    const phone = req.body.phone;
    const cpf= req.body.cpf;

    let mysql = "INSERT INTO client (name, cnh, phone,cpf) VALUES (?,?,?,?)";
    db.query(mysql,[name,cnh,phone,cpf],(err,result)=>{
        res.send(result)
    })
})

app.post("/searchclient",(req,res)=>{
    const name = req.body.name;
    const cnh = req.body.cnh;
    const phone = req.body.phone;
    const cpf= req.body.cpf;

    let mysql = "SELECT * from client WHERE name = ? AND cnh = ? AND phone= ? AND cpf= ?";
    db.query(mysql, [name,cnh,phone,cpf], (err, result)=>{
        if(err) res.send(err);
        res.send(result)
    })
})

app.get("/getclient",(req,res)=>{
    let mysql = "SELECT * FROM client"
    db.query(mysql, (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put("/editclient",(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const cnh = req.body.cnh;
    const phone = req.body.phone;
    const cpf= req.body.cpf;

    let mysql= "UPDATE client SET name =? , cnh = ?, phone= ?, cpf= ? WHERE id = ?";

    db.query(mysql,[name, cnh,phone, cpf, id],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

app.delete("/deleteclient/:id",(req,res)=>{
    const id = req.params

    let mysql = "DELETE FROM client WHERE id = ?";

    db.query( mysql, id, (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3003,()=>{
    console.log("SIIIIIIIIIIIIIII")
})