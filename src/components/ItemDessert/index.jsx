import React, { useEffect, useState } from "react";
import estilos from "./estilos.module.css";
import { useCartContext } from "../../context/CartContext";


export default function index(props) {

    const { addItem, addCantidad, listaItems, removeItem, removeCantidad, listaCart } = useCartContext();
    const [contador, setContador] = useState(1);
    const [ocultar, setOcultar] = useState(false);
    const [imgSrc, setImgSrc] = useState('');

    const obtenerImagen = (nombreImg) =>{
        const width = window.innerWidth;
        let carpeta;

        if(width <= 600){
            carpeta = 'Mobile';
        }else if(width > 600 && width <= 1024){
            carpeta = 'Tablet';
        }else{
            carpeta = 'Desktop';
        }

        return require(`./img/${carpeta}/${nombreImg}`);
    };

    useEffect(()=>{
        const actualizarImg = () => {
            setImgSrc(obtenerImagen(props.urlimg));
        };

        actualizarImg();
        window.addEventListener('resize', actualizarImg);
        return () => window.removeEventListener('resize', actualizarImg);
    });

    const sumar = () => {
        setContador(contador + 1);
        // addCantidad(listaCart, {
        //     nombre: props.nombre,
        //     unitario: props.precio,
        //     cantidad: 1,
        //     total: props.precio
        // })
    }

    const restar = () => {

        if(contador == 1) {
            setOcultar(false);
            
            let item={
                nombre: props.nombre,
                cantidad: props.cantidad,
                unitario: props.unitario
            }
            removeItem(listaCart, item);
        }
        if(contador > 1){
            removeCantidad(listaCart, props.nombre);
        }
        setContador(1);
    }

    const agregarItems = () => {
        addItem(listaCart, {
            nombre: props.nombre,
            unitario: props.precio,
            cantidad: 1,
            total: props.precio,
            urlimg: props.urlimg,
            isCart: props.isCart
        },{
            cantidad: 1,
            precio: props.precio
        })

    }

    return (
        <div className={estilos.container}>

            <div className={estilos.containerImg}>
                <div className={estilos.imagen}>
                    <img src={imgSrc} alt={props.nombre} />
                </div>
                {!props.isCart && (
                    <div className={estilos.btnCartEmpty} onClick={agregarItems}>
                        <div className={estilos.cartEmpty}>
                            <i className="fa-solid fa-cart-plus"></i>
                            <a>Add to Cart</a>
                        </div>
                    </div>
                )}

                {props.isCart && (
                    <div className={estilos.btnCartFull} >
                        <div className={estilos.cartFull}>
                            <i onClick={restar} className="fa-solid fa-minus"></i>
                            <label>{contador}</label>
                            <i onClick={sumar} className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                )}

            </div>
            <div className={estilos.descripcion}>
                <label>{props.categoria}</label>
                <label className={estilos.tittle}>{props.nombre}</label>
                <label>{props.precio}</label>
            </div>
        </div>
    );
}
