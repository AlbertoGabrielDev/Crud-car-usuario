import React, { useState } from "react";
import Edit from "./Edit";
import "./Card.css";

export default function Card(props){
    const [open, setOpen] = useState(false);
      
    return(
        <>
            <Edit
                open={open}
                setOpen={setOpen}
                modelo={props.modelo}
                marca={props.marca}
                placa={props.placa}
                km={props.km}
                listCar={props.listCar}
                setListCar={props.setListCar}
                idcar={props.idcar}
            />

            <div onClick={()=>setOpen(true)}>
              <div className="list">
                  <div className="card">Id: {props.idcar}</div>
                  <div className="card">Modelo: {props.modelo}</div>
                  <div className="card">Marca: {props.marca}</div>
                  <div className="card">Placa: {props.placa}</div>
                  <div className="card">Km: {props.km}</div>
                </div>
            </div>
        </>
    )
}
