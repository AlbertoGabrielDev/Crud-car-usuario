import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from "./Components/Cards"

export default function App(props) {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  

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
            ]
           
            );
        });
    });
    handleClose();
};

  useEffect(() => {
    axios.get("http://localhost:3002/list").then((response) => {
      setListCard(response.data);
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

<Button variant="outlined" onClick={handleClickOpen}>
        Cadastrar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        
        <DialogContent>
          <DialogContentText>
            Cadastro de Veículos
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
       {/* <button onClick={mostrar}>Novo</button> */}
       
  </>
      
  );
}
