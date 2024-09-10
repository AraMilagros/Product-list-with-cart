import React from 'react'
import estilos from './estilos.module.css';

import Desserts from '../Dessert';
import Cart from '../Cart';
export default function index() {
    return (
        <div className={estilos.container}>
            <Desserts />
            <Cart />
        </div>
    )
}
