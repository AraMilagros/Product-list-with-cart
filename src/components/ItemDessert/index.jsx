import React from "react";
import estilos from "./estilos.module.css";
import BtnCart from '../BtnAddCart';

const imagenes = require.context('./img/Desktop', true);

export default function index(props) {
    return (
        <div className={estilos.container}>

            <div className={estilos.containerImg}>
                <div className={estilos.imagen}>
                    <img src={imagenes(props.urlimg)} alt="" />
                </div>
                <div className={estilos.btnCart}>
                    <BtnCart />
                </div>
            </div>
        
            <div className={estilos.descripcion}>
                <label>{props.categoria}</label>
                <label className={estilos.tittle}>{props.nombre}</label>
                <label>{props.precio}</label>
            </div>
        </div>
    );
}
