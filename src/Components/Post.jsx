import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function Client() {
    const [open, setOpen] = useState(false);

    const [insert, setInsert] = useState();
    const [listclient, setListClient] = useState();

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleRegisterClient = () => {
        axios.post("http://localhost:3003/registerclient", {
            name: insert.name,
            cnh: insert.cnh,
            phone: insert.phone,
            cpf: insert.cnh,
        }).then(() => {
            axios.post("http://localhost:3003/search", {
                name: insert.name,
                cnh: insert.cnh,
                phone: insert.phone,
                cpf: insert.cnh,
            }).then((response) => {
                setListClient([
                    ...listclient, {
                        id: response.data[0].id,
                        name: insert.name,
                        cnh: insert.cnh,
                        phone: insert.phone,
                        cpf: insert.cnh,
                    }
                ])
            })
        })
        handleClose();
    }

    useEffect(() => {
        axios.get("http://localhost:3003/list").then((response) => {
            setInsert(response.data);
        }, [])
    })

    const handleaddValues = (value) => {
        setInsert((prevValues) => ({
            ...prevValues, [value.target.id]: value.target.value,
        }))
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Cadastrar Clientes
            </Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogContent>
                    <DialogContentText>
                        Cadastro de Clientes
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleaddValues}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cnh"
                        label="CNH"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleaddValues}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Telefone"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleaddValues}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cpf"
                        label="CPF"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleaddValues}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRegisterClient}>Cadastrar</Button>
                </DialogActions>
            </Dialog>

            <div className="conteiner">
                {
                    listclient.map((val) => {
                        return(
                          <>
                          <p> listclient={listclient}</p>
                            
                            setListClient={setListClient}
                            key={val.id}
                            id={val.id}
                            name={val.name}
                            cnh={val.cnh}
                            phone={val.phone}
                            cpf={val.cpf}
                          </>
                        )
                    }
                      

                       

                    )}


            </div>
        </>
    )

}