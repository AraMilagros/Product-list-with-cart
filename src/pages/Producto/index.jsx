import React, { useEffect } from 'react'
import estilos from './estilos.module.css';
import { useCarrito } from '../../context/CartCotext';
import ItemProducto from '../../components/ItemProducto';
import datos from './datos.json';

export default function index() {

    const {openModal} = useCarrito();

    useEffect(()=>{
        if(openModal){
            window.scroll({
                top:0,
                left:0,
                behavior: 'smooth'
            })
        }
    });

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
