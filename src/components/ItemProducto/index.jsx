import React, { useEffect, useState } from 'react'
import estilos from './estilos.module.css'
import { useCarrito } from '../../context/CartCotext'

export default function index(props) {

    const { agregarAlCarrito, carrito, eliminarDelCarrito } = useCarrito();
    const cantidadInicial = carrito[props.id]?.cantidad || 0;
    const [cantidad, setCantidad] = useState(cantidadInicial);
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        if (!carrito[props.id]) {
            setCantidad(0)
        }
    }, [carrito, props.id]);

    const getImg = (nombreImg) => {
        const width = window.innerWidth;
        let carpeta;

        if (width <= 600) {
            carpeta = 'Mobile';
        } else if (width > 600 && width <= 1024) {
            carpeta = 'Tablet';
        } else {
            carpeta = 'Desktop';
        }
        return require(`./img/${carpeta}/${nombreImg}`);
    }

    useEffect(() => {
        const actualizarImg = () => {
            setImgSrc(getImg(props.imagen));
        };
        actualizarImg();
        window.addEventListener('resize', actualizarImg);
        return () => window.removeEventListener('resize', actualizarImg);
    })



    const agregar = () => {
        setCantidad(1);
        agregarAlCarrito(props.id, 1, props.nombre, props.categoria, props.precio);
    }

    const incrementar = () => {
        setCantidad(cantidad + 1);
        agregarAlCarrito(props.id, cantidad + 1, props.nombre, props.categoria, props.precio);
    };

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
            agregarAlCarrito(props.id, cantidad - 1, props.nombre, props.categoria, props.precio);

        } else {
            setCantidad(0);
            eliminarDelCarrito(props.id);
        }
    }

    return (
        <div className={estilos.container}>
            <div className={estilos.containerImg}>
                <div className={estilos.imagen}>
                    <img src={imgSrc} alt={props.nombre} />
                </div>
                {cantidad === 0 ? (
                    <div className={estilos.btnCartEmpty} onClick={agregar}>
                        <div className={estilos.cartEmpty}>
                            <i className="fa-solid fa-cart-plus"></i>
                            <a>Add to Cart</a>
                        </div>
                    </div>
                ) : (
                    <div className={estilos.btnCartFull} >
                        <div className={estilos.cartFull}>
                            <i onClick={decrementar} className="fa-solid fa-minus"></i>
                            <label>{cantidad}</label>
                            <i onClick={incrementar} className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                )}
            </div>
            <div className={estilos.descripcion}>
                <label>{props.categoria}</label>
                <label className={estilos.tittle}>{props.nombre}</label>
                <label>$ {props.precio}</label>
            </div>
        </div>
    )
}
