import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import React, { useState } from "react";
import axios from "axios";

export default function Edit(props) {
  const [editValues, setEditValues] = useState({
    idcar: props.idcar,
    modelo: props.modelo,
    marca: props.marca,
    placa: props.placa,
    km: props.km,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };
//alterar os nomes aqui 
  const handleEditCar = () => {
    axios.put("http://localhost:3002/edit", {
      idcar: editValues.idcar,
      modelo: editValues.modelo,
      marca: editValues.marca,
      placa: editValues.placa,
      km: editValues.km
    }).then(() => {
      props.setListCar( //alterar os nomes aqui 
        props.listCar.map((value) => {
          return value.idcar === editValues.idcar
            ? {
              idcar: editValues.id,
              modelo: editValues.modelo,
              marca: editValues.marca,
              placa: editValues.placa,
              km: editValues.km
            }
            : value;
        })
      );
    });
    handleClose();
  };


  const handleDeleteCar = () => {
    axios.delete(`http://localhost:3002/delete/${editValues.idcar}`).then(() => {
      props.setListCar(
        props.listCar.filter((value) => {
          return value.idcar !== editValues.idcar;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
       <Dialog 
       open={props.open}
       onClose = {handleClose}
       aria-labelledby= "form-dialog-title"
       >
         <DialogContent>
          <div className='list-mu'>
          <TextField
            disabled
            margin="dense"
            id="idcar"
            label="idcar"
            defaultValue={props.idcar}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="modelo"
            label="Modelo"
            defaultValue={props.modelo}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="marca"
            label="Marca"
            defaultValue={props.marca}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="placa"
            label="Placa"
            defaultValue={props.placa}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="km"
            label="Km"
            defaultValue={props.km}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          </div>
        </DialogContent> 
        <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
      className='button'
    >
      <Button onClick={()=> handleEditCar()}> Editar</Button>
      <Button onClick={()=> handleDeleteCar()}>Apagar</Button>
    </ButtonGroup>
       </Dialog>
      
    </div>
  );
}


