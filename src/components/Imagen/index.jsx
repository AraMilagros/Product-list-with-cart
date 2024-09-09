import React from 'react'
import estilos from './estilos.module.css';
import BtnCart from '../BtnAddCart';
import img from './img/Mobile/image-baklava-mobile.jpg';
export default function index() {
    return (
        <div className={estilos.container}>
            <div className={estilos.imagen}>
                <img src={img} alt="" />
            </div>
            <div className={estilos.btnCart}>
                <BtnCart />
            </div>

        </div>
    )
}
