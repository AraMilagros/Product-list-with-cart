import React, { createContext, useContext, useEffect, useState } from 'react';
import datos from './data.json';
export const CartContext = createContext();

CartContext.displayName = 'CartContexto';

export default function CartProvider({ children }) {
    const [listaItems, setListaItems] = useState([]);
    const [totalItems, setTotalItems] = useState([]);

    const [listaCart, setListaCart] = useState([]);

    return (
        <CartContext.Provider value={{ listaItems, setListaItems, totalItems, setTotalItems, listaCart, setListaCart }}>
            {children}
        </CartContext.Provider>
    );
}


export function useCartContext() {
    const { listaItems, setListaItems } = useContext(CartContext);
    const [ itemsDuplicada, setItemsDuplicada] = useState(datos);

    const { listaCart, setListaCart } = useContext(CartContext);
    const [cartDuplicada, setCartDuplicada] = useState([]);
    const { totalItems, setTotalItems } = useContext(CartContext);
    const [totalDuplicado, setTotalDuplicado] = useState([]);

    useEffect(() => {
        setListaItems(itemsDuplicada);
        setTotalItems(totalDuplicado);
        setListaCart(cartDuplicada);

    }, [itemsDuplicada, setListaItems, setTotalDuplicado, totalDuplicado, setCartDuplicada, cartDuplicada]);




    function sumarTotales(item) {
        setTotalDuplicado((previo) => ({
            ...previo,
            cantidad: totalItems.cantidad + 1,
            precio: totalItems.precio + item.unitario
        }));
    }

    function restarTotales(item) {
        setTotalDuplicado((previo) => ({
            ...previo,
            cantidad: totalItems.cantidad - item.cantidad,
            precio: totalItems.precio - (item.unitario * item.cantidad)
        }));
    }

    function cambiarIsCart(item) {
        setItemsDuplicada(
            listaItems.map((i) =>
                i.name === item.nombre ?
                    {
                        ...i, isCart: true
                    } : i
            )
        )
    }

    function cambiarFalse(item){
        setItemsDuplicada(
            listaItems.map((i) =>
                i.name === item.nombre ?
                    {
                        ...i, isCart: false
                    } : i
            )
        )
    }

    function addItem(lista, item, total) {
        // setItemsDuplicada(
        //     listaItems.map((i) =>

        //         i.nombre === item.nombre ?
        //             {
        //                 console.log("entro"),
        //                 ...i, isCart: true
        //             } : i
        //     )
        // )
        setCartDuplicada([...lista, item]);
        lista.length == 0 ? setTotalDuplicado(total) : sumarTotales(item);
        cambiarIsCart(item);
    }

    function removeItem(lista, item) {
        console.log("falta acomodar :'v")
        // const actualizar = lista.filter((i) => i.nombre !== item.nombre);
        // setListaDuplicada(actualizar);
        // console.log("desde removeItem", item)
        // restarTotales(item);
        cambiarFalse(item)
    }


    function addCantidad(lista, item) {
        console.log("falta acomodar")
        // setListaDuplicada(
        //     lista.map((i) =>
        //         i.nombre === item.nombre ?
        //             {
        //                 ...i, cantidad: i.cantidad + 1,
        //                 total: (i.cantidad + 1) * i.unitario
        //             } : i
        //     )
        // )
        // sumarTotales(item);
    }

    function removeCantidad(lista, nombre) {
        console.log('falta acomodar');
        // setListaDuplicada(
        //     lista.map((i) =>
        //         i.nombre === nombre ?
        //             {
        //                 ...i, cantidad: i.cantidad - 1,
        //                 total: (i.cantidad - 1) * i.unitario
        //             } : i
        //     )
        // )
    }


    return { listaItems, listaCart, totalItems, addItem, removeItem }
}
