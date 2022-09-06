import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function App() {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterGame = () => {
    console.log(values);
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
                ...listCard,
                {
                    idcar: response.data[0].idcar,
                    modelo: values.modelo,
                    marca: values.marca,
                    placa: values.placa,
                    km: values.km,
                },
            ]);
        });
    });
};

  useEffect(() => {
    axios.get("http://localhost:3002/list").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
        ...prevValues,
        [value.target.id]: value.target.value,
    }));
};

  return (
  <>

<Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
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
          <Button onClick={handleRegisterGame}>Cadastrar</Button>
        </DialogActions>
      </Dialog>

      <div className="conteiner">
      {
        listCard.map((val) => {
          return(
            <>
            <div className="list">
          <div className="key" key={val.id}></div>
          <div className="list-car">Id: {val.idcar}</div>
          <div className="list-car">Modelo: {val.modelo}</div>
          <div className="list-car">Marca: {val.marca}</div>
          <div className="list-car">Placa: {val.placa}</div>
          <div className="list-car">Km: {val.km}</div>
          <button>Editar</button>
          <button>Apagar</button>  
          </div>


          </>
        )
      }
      )}

      </div>
       {/* <button onClick={mostrar}>Novo</button> */}
       
  </>
      
  );
}
