import React from 'react'
import estilos from './estilos.module.css';

import CartProvider from '../../context/CartContext';
import Desserts from '../Dessert';
import Cart from '../Cart';
import Modal from '../../components/ModalConfirm'
export default function index() {
    return (
        <div className={estilos.container}>
            <CartProvider>
                <Desserts />
                {/* <Cart /> */}
                <Modal />
            </CartProvider>

        </div>
    )
}
