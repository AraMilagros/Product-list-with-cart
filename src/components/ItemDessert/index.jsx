import React, { useEffect, useState } from "react";
import estilos from "./estilos.module.css";

const imagenes = require.context('./img/Desktop', true);

export default function index(props) {

    const [contador, setContador] = useState(1);
    const [ocultar, setOcultar] = useState(false);

    const sumar = () => {
        setContador(contador + 1);
    }

    const restar = () => {

        if(contador == 1) {
            setOcultar(false)
        }
        setContador(contador - 1);
    }

    const agregarItems = () => {
        setOcultar(true);
    }

    return (
        <div className={estilos.container}>

            <div className={estilos.containerImg}>
                <div className={estilos.imagen}>
                    <img src={imagenes(props.urlimg)} alt="" />
                </div>
                {!ocultar && (
                    <div className={estilos.btnCartEmpty} onClick={agregarItems}>
                        <div className={estilos.cartEmpty}>
                            <i className="fa-solid fa-cart-plus"></i>
                            <a>Add to Cart</a>
                        </div>
                    </div>
                )}

                {ocultar && (
                    <div className={estilos.btnCartFull} >
                        <div className={estilos.cartFull}>
                            <i onClick={restar} className="fa-solid fa-minus"></i>
                            <label>{contador}</label>
                            <i onClick={sumar} className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                )}

            </div>
            <div className={estilos.descripcion}>
                <label>{props.categoria}</label>
                <label className={estilos.tittle}>{props.nombre}</label>
                <label>{props.precio}</label>
            </div>
        </div>
    );
}
