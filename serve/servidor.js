const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "",
    database : "locacao",
});

app.use(express.json());
app.use(cors());

//req= enviar res= RECEBAAAAAAAAAAAAAAAAAAAAAAAA
app.post("/register", (req,res)=>{
    const {modelo }= req.body;
    const {marca }= req.body;
    const {placa }= req.body;
    const {km }= req.body;
    
    let mysql = "INSERT INTO carro(modelo, marca, placa, km) VALUES (?,?,?,?)";

    db.query(mysql, [modelo, marca, placa,km], (err,result)=>{
        res.send(result);
    });
});

app.post("/search",(req,res)=>{
    const {modelo }= req.body;
    const {marca }= req.body;
    const {placa }= req.body;
    const {km }= req.body;

    let mysql= "SELECT * from carro WHERE modelo = ? AND marca = ? AND placa = ? AND km = ?";

    db.query(mysql , [modelo, marca, placa,km], (err, result)=>{
        if (err) res.send(err);
        res.send(result);
    });
});

app.get("/list", (req,res)=>{
    let mysql = "SELECT * FROM carro";
    db.query(mysql, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put("/edit", (req,res)=>{
    const {idcar} = req.body;
    const {modelo }= req.body;
    const {marca }= req.body;
    const {placa }= req.body;
    const {km }= req.body;

    let mysql = "UPDATE carro SET modelo = ?, marca = ?, placa = ?, km = ? WHERE idcar= ?";
    db.query(mysql, [modelo,marca,placa,km,idcar],(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

app.delete("/delete/:idcar",(req,res)=>{
    const {idcar} = req.params;
    let mysql = "DELETE FROM carro WHERE idcar = ?";
    db.query(mysql, [idcar],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.listen(3002,()=>{
    console.log("SIIIIIIIIIIIIIIIIIII");
});