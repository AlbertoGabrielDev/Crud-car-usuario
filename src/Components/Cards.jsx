import React, { useState } from "react";
//criar um formdialg igual o outro, e na parte das divs, usar o meu forms
import Edit from "./Edit";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
export default function Card(props){
    const [open, setOpen] = useState(false);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return(
        <>
            <Edit
                open={open}
                setOpen={setOpen}
                modelo={props.modelo}
                marca={props.marca}
                placa={props.placa}
                km={props.km}
                listCard={props.listCard}
                setListCard={props.setListCard}
                idcar={props.idcar}
            />
             <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <Item><div className="list">
          <div onClick={()=>setOpen(true)}>
          <div >Id: {props.idcar}</div>
          <div >Modelo: {props.modelo}</div>
          <div >Marca: {props.marca}</div>
          <div >Placa: {props.placa}</div>
          <div >Km: {props.km}</div>
          </div>
          </div></Item>
        </Grid> 
      </Grid>
    </Box>

            
        
        </>
    )
}
