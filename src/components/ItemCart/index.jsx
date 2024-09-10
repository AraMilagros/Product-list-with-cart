import React from 'react'
import estilos from './estilos.module.css';

import icono from './illustration-empty-cart.svg'
export default function index(props) {
  return (

    <div className={estilos.container}>
      <h2>Your Cart (0)</h2>
      <div className={estilos.iconoEmpty}>
        <img src={icono} alt="icon-empty-cart"/>
        <label>Your added items will appear here</label>
      </div>

    </div>
  )
}
