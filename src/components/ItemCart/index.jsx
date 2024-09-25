import React from 'react';
import estilos from './estilos.module.css';
import { useCarrito } from '../../context/CartCotext'

export default function index(props) {

    const { carrito, eliminarDelCarrito } = useCarrito();

    const calcularSubTotal = (precio, cantidad) => {
        return precio * cantidad;
    };

    return (

        <div className={estilos.container}>
        
            <div className={estilos.item}>
                <label>{props.nombre}</label>
                <div className={estilos.precios}>
                    <label>{props.cantidad}x</label>
                    <label>@ {props.precio}</label>
                    <label>${calcularSubTotal(props.precio, props.cantidad)}</label>
                </div>
            </div>
            <div className={estilos.iconoClose} onClick={() => eliminarDelCarrito(props.id)}>
                <i className="fa-regular fa-circle-xmark"></i>
            </div>
            
        </div>

    )
}
