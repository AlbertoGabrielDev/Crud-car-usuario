import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from "react";

import axios from "axios";
import ButtonGroup from '@mui/material/ButtonGroup';


export default function Edit(props) {
    const [open, setOpen] = React.useState(false);
  
    const [editValues, setEditValues] = useState({
        idcar: props.idcar,
        modelo: props.modelo,
        marca: props.marca,
        placa: props.placa,
        km: props.km,
      });


      const handleChangeValues = (values) =>{
        setEditValues((prevValues)=>({
          ...prevValues,[values.target.idcar]: values.target.value,
        }))
      }


      const handleEditCar=()=>{
          axios.put("http://localhost:3002/edit",{
              idcar: editValues.idcar,
              modelo: editValues.modelo,
              marca: editValues.marca,
              placa: editValues.placa,
              km: editValues.km,
            }).then(()=>{
              props.setListCard(
                props.listCard.map((value)=>{
                  return value.idcar == editValues.idcar
                  ?{
                    idcar: editValues.idcar,
                    modelo: editValues.modelo,
                    marca: editValues.marca,
                    km: editValues.km,
                  }
                  : value;
                })
              )
            })
            handleClose();
        }
        

      const handleDeleteCar = () => {
        axios.delete(`http://localhost:3002/delete/${editValues.idcar}`)
        .then(() => {
          props.setListCard(
            props.listCard.filter((value) => {
              return value.idcar != editValues.idcar;
            })
          );
        });
        handleClose();
      };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Editar
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Editar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edite o desejavel.
            </DialogContentText>
            <TextField
              disabled
              margin="dense"
              idcar="idcar"
              label="ID"
              fullWidth
              defaultValue={props.idcar}
              type="text"
              
            />
            <TextField
              autoFocus
              margin="dense"
              idcar="modelo"
              label="Modelo"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={props.modelo}
              onChange={handleChangeValues}
            />
            <TextField
              autoFocus
              margin="dense"
              idcar="marca"
              label="Marca"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={props.marca}
              onChange={handleChangeValues}
            />
            <TextField
              autoFocus
              margin="dense"
              idcar="placa"
              label="Placa"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={props.placa}
              onChange={handleChangeValues}
            />
            <TextField
              autoFocus
              margin="dense"
              idcar="km"
              label="Km"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={props.km}
              onChange={handleChangeValues}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Sair</Button>
            <Button onClick={() => handleEditCar() }>Editar</Button>
            <Button onClick={() => handleDeleteCar() }>Excluir</Button>
          </DialogActions>
        </Dialog>

        {/* <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup> */}
      </div>
    );
  }