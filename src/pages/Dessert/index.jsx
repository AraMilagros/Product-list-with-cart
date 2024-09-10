import React from 'react'
import estilos from './estilos.module.css';
import lista from './data.json';
import ItemDessert from '../../components/ItemDessert';

export default function index() {
    return (
        <div className={estilos.container}>
            <h1>Desserts</h1>
            <div className={estilos.containerItems}>
                {lista.map((item, i) => {
                    return (
                        <ItemDessert key={i}
                            urlimg={item.image.desktop}
                            categoria={item.category}
                            nombre={item.name}
                            precio={item.price}
                        />
                    )
                })}
            </div>
        </div>

    )
}
