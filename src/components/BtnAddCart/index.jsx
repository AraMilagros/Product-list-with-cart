import React from 'react'
import estilos from './estilos.module.css';

export default function index() {
    return (
        <div className={estilos.container}>
            <a><i className="fa-solid fa-cart-plus"></i> Add to Cart</a>
        </div>
    )
}
