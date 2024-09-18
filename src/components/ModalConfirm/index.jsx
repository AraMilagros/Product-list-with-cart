import React from 'react'
import estilos from './estilos.module.css';
import { useCartContext } from "../../context/CartContext";

const imagen = require.context('./Mini', true);

export default function index() {
    const { listaItems } = useCartContext();

    return (
        <div className={estilos.container}>
            <div className={estilos.encabezado}>
                <i className="fa-regular fa-circle-check"></i>
                <h2>Order Confirmed</h2>
                <label>We hope you enjoy your food!</label>
            </div>

            {listaItems.length === 0 ? ''
                :
                (
                    listaItems.map((item, i) => {
                        return (
                            <div className={estilos.item} key={i}>
                                <div className={estilos.imagen}>
                                    <img src={imagen(`./${item.urlimg}`)} alt={item.urlimg} />
                                </div> 

                                <div className={estilos.detalle}>
                                    <label>Nombre</label>
                                    <div className={estilos.precioCantidad}>
                                        <label>{item.cantidad}</label>
                                        <label>{item.unitario}</label>
                                    </div>
                                </div>

                                <div className={estilos.precio}>
                                    <label>precio unitario total</label>
                                </div>
                            </div>
                        )
                    })
                )
            }

            <div className={estilos.orderTotal}>
                <label>Order Total</label>
                <label>precio final</label>
            </div>

            <a className={estilos.btnFinalizar}>Start New Order</a>
        </div>
    )
}
