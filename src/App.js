import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Card from "./Components/Cards";
import Post from "./Components/Post";
import {  Route, Routes } from "react-router-dom";
import Menu from './Components/Menu';

export default function App() {
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]); //alterar os nomes aqui

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//alterar os nomes aqui 
  const handleRegisterCar = () => {

    axios.post("http://localhost:3002/register", {
        modelo: values.modelo,
        marca: values.marca,
        placa: values.placa,
        km: values.km,
    }).then(() => {
        axios.post("http://localhost:3002/search", {
            modelo: values.modelo,
            marca: values.marca,
            placa: values.placa,
            km: values.km,
        }).then((response) => {
          setListCard([
              ...listCard, //alterar os nomes aqui 
              {
                  idcar: response.data[0].idcar,
                  modelo: values.modelo,
                  marca: values.marca,
                  placa: values.placa,
                  km: values.km,
              },
          ]
         
          );
      });
    });
    handleClose();
};

  useEffect(() => {
    axios.get("http://localhost:3002/list").then((response) => {
      setListCard(response.data); //alterar os nomes aqui 
    })
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
        ...prevValues,
        [value.target.id]: value.target.value,
    }));
};

  return (
  <>
  <Menu/>
      <div className="container botao">    

        <div className="teste">
          <Routes>
            <Route path='/cliente' element={<Post/>} />
          </Routes>
        </div>

        <div className="borda">
          <Button variant="outlined" onClick={handleClickOpen}>
            Cadastrar
          </Button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText> Cadastro de Veículos </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="modelo"
              label="Modelo"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleaddValues}
            />

           <TextField
              autoFocus
              margin="dense"
              id="marca"
              label="Marca"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleaddValues}
            />
           <TextField
              autoFocus
              margin="dense"
              id="placa"
              label="Placa"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleaddValues}
            />

           <TextField
              autoFocus
              margin="dense"
              id="km"
              label="Km"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleaddValues}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleRegisterCar}>Cadastrar</Button>
          </DialogActions>

      </Dialog>

      <div className="container">
      {
        listCard.map((val)=>(
          <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.idcar}
          idcar={val.idcar}
          modelo={val.modelo}
          marca={val.marca}
          placa={val.placa}
          km={val.km}


          />

        ))}
      
          
      </div>

       
  </>
      
  );
}
