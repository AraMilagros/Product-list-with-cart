import React, { useState } from 'react'
import estilos from './estilos.module.css';
import { useCartContext } from "../../context/CartContext";

import ModalConfirm from '../ModalConfirm';
import icono from './illustration-empty-cart.svg'
import tree from './icon-carbon-neutral.svg';
export default function index() {
  const { listaItems, totalItems, removeItem } = useCartContext();

  const [openModal, setOpenModal] = useState(false);

  const remover = (nombre, cantidad, unitario) => {
    removeItem(listaItems, { nombre, cantidad, unitario });
  }

  return (
    <>
      <div className={estilos.container}>
        <h2>Your Cart ({((totalItems.cantidad != null) && (totalItems.cantidad != 0)) ? totalItems.cantidad : 0})</h2>

        {listaItems.length === 0 ?
          <div className={estilos.iconoEmpty}>
            <img src={icono} alt="icon-empty-cart" />
            <label>Your added items will appear here</label>
          </div>
          : ''
        }

        {listaItems.length != 0 ?
          <div className={estilos.full}>
            {listaItems.map((item, i) => {
              return (
                <div key={i}>

                  <div className={estilos.listItem}>
                    <div className={estilos.item}>
                      <label>{item.nombre}</label>
                      <div className={estilos.precios}>
                        <label>{item.cantidad}x</label>
                        <label>@ {item.unitario}</label>
                        <label>${item.total}</label>
                      </div>
                    </div>
                    <div className={estilos.iconoClose} onClick={() => remover(item.nombre, item.cantidad, item.unitario)}>
                      <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className={estilos.precioTotal}>
              <label>Order Total</label>
              <label>$ {((totalItems.precio != null) && (totalItems.precio != 0)) ? totalItems.precio : 0}</label>
            </div>
            <div className={estilos.note}>
              <img src={tree} alt="tree" />
              <label>This is a <strong>carbon-neutral</strong> delivery</label>
            </div>
            <a className={estilos.btnConfirm} onClick={()=>setOpenModal(true)} >Confirm Order</a>
          </div>
          : ''
        }

      </div>

        {openModal && <ModalConfirm closeModal={setOpenModal} lista={listaItems} total={totalItems.precio} />}

    </>
  )
}
