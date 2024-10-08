import React, { useEffect, useState } from 'react'
import estilos from './estilos.module.css';
// import { useCartContext } from "../../context/CartContext";
import { useCarrito } from '../../context/CartCotext';
const carpeta = require.context('./Mini', true);

export default function index(props) {
    const { carrito, eliminarTodo, openModal, setOpenModal } = useCarrito();
    const [precioTotal, setPrecioTotal]=useState(0);
    
    // const { listaItems } = useCartContext();
    
    useEffect(()=>{
        let total = Object.values(carrito)
        .reduce((precio, producto) => precio + (producto.precio * producto.cantidad), 0);

        setPrecioTotal(total);
    },[carrito, ''])

    return (
        <>
            <div className={estilos.overlay}></div>
            <div className={estilos.container}>
                <div className={estilos.encabezado}>
                    <i className="fa-regular fa-circle-check"></i>
                    <h2>Order Confirmed</h2>
                    <label>We hope you enjoy your food!</label>
                </div>
                <div className={estilos.containerItemFood}>
                    {
                        Object.entries(carrito).map(([id, { cantidad, nombre, precio, imagen }]) => (
                            <div className={estilos.itemFood} key={id}>
                                <div className={estilos.detalle}>
                                    <div className={estilos.imagen}>
                                        <img src={carpeta(`./${imagen}`)} alt={nombre} />
                                    </div>
                                    <div className={estilos.texto}>
                                        <label>{nombre}</label>
                                        <div className={estilos.precioCantidad}>
                                            <label>{`${cantidad}x`}</label>
                                            <label>{`@ $${precio}`}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={estilos.precioUnitarioTotal}>
                                    <label>${precio}</label>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className={estilos.orderTotal}>
                        <label>Order Total</label>
                        <label>$ {precioTotal}</label>
                    </div>
                <a className={estilos.btnFinalizar} onClick={() => {setOpenModal(false), eliminarTodo()}}>Start New Order</a>
            </div>
        </>
    )
}
