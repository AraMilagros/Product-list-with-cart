import React from 'react'
import estilos from './estilos.module.css';
// import lista from './data.json';
import ItemDessert from '../../components/ItemDessert';

import { useCartContext } from "../../context/CartContext";

export default function index() {
    const { listaItems } = useCartContext();

    return (
        <div className={estilos.container}>
            <h1>Desserts</h1>
            <div className={estilos.containerItems}>
                {listaItems.map((item, i) => {
                    return (
                        <ItemDessert key={i}
                            urlimg={item.image}
                            categoria={item.category}
                            nombre={item.name}
                            precio={item.price}
                            isCart={item.isCart}
                        />
                    )
                })}
            </div>
        </div>

    )
}
