import React from 'react'
import estilos from './estilos.module.css';

import ItemProducto from '../../components/ItemProducto';
import datos from './datos.json';

export default function index() {
    return (
        <div className={estilos.container}>
            <h1>Desserts</h1>
            <div className={estilos.containerItems}>
                {datos.map((item, i)=>{
                    return(
                        <ItemProducto
                            key={i}
                            id={item.name}
                            imagen={item.image}
                            nombre={item.name}
                            categoria={item.category}
                            precio={item.price}
                        />
                    )
                })}
            </div>
        </div>
    )
}
