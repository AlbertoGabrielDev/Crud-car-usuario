import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import App from '../App';


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

  const handleEditGame = () => {
    axios.put("http://localhost:3002/edit", {
      idcar: editValues.idcar,
      modelo: editValues.modelo,
      marca: editValues.marca,
      placa: editValues.placa,
      km: editValues.km
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.idcar == editValues.idcar
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


  const handleDeleteGame = () => {
    axios.delete(`http://localhost:3002/delete/${editValues.idcar}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.idcar != editValues.idcar;
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
      <Button onClick={()=> handleEditGame()}> Editar</Button>
      <Button onClick={()=> handleDeleteGame()}>Apagar</Button>
    </ButtonGroup>
       </Dialog>
      
    </div>
  );
}


