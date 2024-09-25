import React, { createContext, useContext, useEffect, useState } from 'react';
import datos from './data.json';
export const CartContext = createContext();

// idea para no perder: manejar el contador a 1 usando isCart

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
    const [ cartDuplicada, setCartDuplicada ] = useState([]);
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
        // setTotalDuplicado((previo) => ({
        //     ...previo,
        //     cantidad: totalItems.cantidad - item.cantidad,
        //     precio: totalItems.precio - (item.unitario * item.cantidad)
        // }));
        setTotalDuplicado((previo) => ({
            ...previo,
            cantidad: totalItems.cantidad - 1,
            precio: totalItems.precio - (item.unitario * item.cantidad)
        }))
    }

    function cambiarIsCart(nombre, bandera) {
        setItemsDuplicada(
            listaItems.map((i) =>
                i.name === nombre ?
                    {
                        ...i, isCart: bandera
                    } : i
            )
        )
    }

    function addItem(lista, item, total, bandera) {
        setCartDuplicada([...lista, item]);
        if(lista.length == 0){
            setTotalDuplicado(total)
        }else{
            sumarTotales(item)
        }
        cambiarIsCart(item.nombre, bandera)

    }

    function removeItem(lista, item, bandera) {
        const actualizar = lista.filter((i) => i.nombre !== item.nombre);
        setCartDuplicada(actualizar);
        restarTotales(item);
        cambiarIsCart(item.nombre, bandera);
    }


    function addCantidad(lista, item) {
        setCartDuplicada(
            lista.map((i) =>
                i.nombre === item.nombre ?
                    {
                        ...i, cantidad: i.cantidad + 1,
                        total: (i.cantidad + 1) * i.unitario
                    } : console.log(i)
            )
        )

        sumarTotales(item);
    }

    function removeCantidad(lista, item) {
        setCartDuplicada(
            lista.map((i) =>
                i.nombre === item.nombre ?
                    {
                        ...i, cantidad: i.cantidad - 1,
                        total: (i.cantidad - 1) * i.unitario
                    } : i
            )
        )
        restarTotales(item)
    }


    return { listaItems, listaCart, totalItems, addItem, removeItem, addCantidad, removeCantidad }
}
