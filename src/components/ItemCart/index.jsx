import React, { useState } from 'react'
import estilos from './estilos.module.css';
import { useCartContext } from "../../context/CartContext";

import icono from './illustration-empty-cart.svg'
export default function index() {
  const { listaItems } = useCartContext();

  // idea: cambiar useState cada vez que se modifique listadoItems
  // se usaria un useEfect y cambiara cada vez que se modifique listadoItems
  return (

    <div className={estilos.container}>
      <h2>Your Cart ({listaItems.length})</h2>

      {listaItems.length === 0 ?
        <div className={estilos.iconoEmpty}>
          <img src={icono} alt="icon-empty-cart" />
          <label>Your added items will appear here</label>
        </div>
        : ''
      }

      {listaItems.length != 0 ?
        <>
                  {listaItems.map((item, i) => {
            return (
              <div className={estilos.full} key={i}>
                <div className={estilos.listItem}>
                  <div className={estilos.item}>
                    <label>{item.nombre}</label>
                    <div className={estilos.precios}>
                      <label>{item.cantidad}</label>
                      <label>{item.unitario}</label>
                      <label>{item.total}</label>
                    </div>
                  </div>
                  <div className={estilos.iconoClose}>
                    <i className="fa-regular fa-circle-xmark"></i>
                  </div>
                </div>

                <div className={estilos.precioTotal}>
                  <label>Order Total</label>
                  <label>ya vemos como hago :v</label>
                </div>

                <a className={estilos.btnConfirm}>Confirm Order</a>
              </div>
            )
          })}

        </>
          : ''
      }

    </div>
  )
}
