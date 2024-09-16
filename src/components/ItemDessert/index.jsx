import React, { useEffect, useState } from "react";
import estilos from "./estilos.module.css";
import { useCartContext } from "../../context/CartContext";


const imagenes = require.context('./img/Desktop', true);

export default function index(props) {

    const { addItem } = useCartContext();
    const { listaItems } = useCartContext();
    const [contador, setContador] = useState(1);
    const [ocultar, setOcultar] = useState(false);

    const sumar = () => {
        setContador(contador + 1);
        addItem({
            nombre: props.nombre,
            unitario: props.precio,
            cantidad: 1,
            total: props.precio
        }); 
    }

    const restar = () => {

        if(contador == 1) {
            setOcultar(false)
        }
        setContador(contador - 1);
    }

    const agregarItems = () => {
        setOcultar(true);
        console.log('valores: '+ props.nombre + ' | ' + props.precio);
        addItem(listaItems, {
            nombre: props.nombre,
            unitario: props.precio,
            cantidad: 1,
            total: props.precio
        })

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
