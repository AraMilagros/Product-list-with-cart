import React from 'react'
import estilos from './estilos.module.css';

import ItemCart from '../../components/ItemCart';
export default function index() {
    return (
        <div className={estilos.container}>
            <ItemCart />
        </div>
    )
}
