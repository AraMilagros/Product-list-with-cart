import React from 'react'
import estilos from './estilos.module.css';
// import { useCartContext } from "../../context/CartContext";

const imagen = require.context('./Mini', true);

export default function index(props) {

    // const { listaItems } = useCartContext();

    return (
        <>
            <div className={estilos.overlay}></div>
            <div className={estilos.container}>
                <div className={estilos.encabezado}>
                    <i className="fa-regular fa-circle-check"></i>
                    <h2>Order Confirmed</h2>
                    <label>We hope you enjoy your food!</label>
                </div>

                {props.lista.map((item, i) => {
                    return (
                        <div className={estilos.itemFood} key={i}>
                            <div className={estilos.detalle}>
                                <div className={estilos.imagen}>
                                    <img src={imagen(`./${item.urlimg}`)} alt={item.nombre} />
                                </div>
                                <div className={estilos.texto}>
                                    <label>{item.nombre}</label>
                                    <div className={estilos.precioCantidad}>
                                        <label>{`${item.cantidad}x`}</label>
                                        <label>{`@ $${item.unitario}`}</label>
                                    </div>
                                </div>
                            </div>
                            <div className={estilos.precioUnitarioTotal}>
                                <label>`$ ${item.total}`</label>
                            </div>
                        </div>
                    )
                })}

                <div className={estilos.orderTotal}>
                    <label>Order Total</label>
                    <label>{props.total}</label>
                </div>

                <a className={estilos.btnFinalizar} onClick={() => props.closeModal(false)}>Start New Order</a>
            </div>
        </>
    )
}
