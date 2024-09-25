import React from 'react'
import { CarritoProvider } from '../../context/CartCotext'
import Producto from '../Producto';
import Carrito from '../Cart';

import estilos from './estilos.module.css';

export default function index() {
    return (
        <div className={estilos.container}>
            <CarritoProvider>
                <Producto />
                <Carrito />
            </CarritoProvider>
        </div>

    )
}
