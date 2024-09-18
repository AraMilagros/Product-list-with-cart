import React, { createContext, useContext, useEffect, useState } from 'react'
export const CartContext = createContext();

CartContext.displayName = 'CartContexto';

export default function CartProvider({ children }) {
    const [listaItems, setListaItems] = useState([]);
    const [totalItems, setTotalItems] = useState([]);

    return (
        <CartContext.Provider value={{ listaItems, setListaItems, totalItems, setTotalItems }}>
            {children}
        </CartContext.Provider>
    );
}


export function useCartContext() {
    const { listaItems, setListaItems } = useContext(CartContext);
    const { totalItems, setTotalItems } = useContext(CartContext);

    const [listaDuplicada, setListaDuplicada] = useState([]);
    const [totalDuplicado, setTotalDuplicado] = useState([]);


    useEffect(() => {
        setListaItems(listaDuplicada);
        setTotalItems(totalDuplicado);
    }, [listaDuplicada, setListaItems, setTotalDuplicado, totalDuplicado]);

    function addCantidad(lista, item) {
        // dentro de setListaDuplicada se hara un map 
        // donde por cada elemento se preguntara si su atributo nombre es igual al atributo nombre del item pasado
        // en caso de ser verdadero, a ese elemento i se le modificara los atributos cantidad y total 
        setListaDuplicada(
            lista.map((i) =>
                i.nombre === item.nombre ?
                    {
                        ...i, cantidad: i.cantidad + 1,
                        total: (i.cantidad + 1) * i.unitario
                    } : i
            )
        )
        sumarTotales(item);
    }

    function removeCantidad(lista, nombre) {
        setListaDuplicada(
            lista.map((i) =>
                i.nombre === nombre ?
                    {
                        ...i, cantidad: i.cantidad - 1,
                        total: (i.cantidad - 1) * i.unitario
                    } : i
            )
        )
    }

    function addItem(lista, item, total) {
        setListaDuplicada([...lista, item]);
        lista.length == 0 ? setTotalDuplicado(total) : sumarTotales(item);
    }

    function removeItem(lista, item) {
        const actualizar = lista.filter((i) => i.nombre !== item.nombre);
        setListaDuplicada(actualizar);
        console.log("desde removeItem", item)
        restarTotales(item);
    }

    function sumarTotales(item) {
        setTotalDuplicado((previo) => ({
            ...previo,
            cantidad: totalItems.cantidad + 1,
            precio: totalItems.precio + item.unitario
        }));
    }

    function restarTotales(item){
        setTotalDuplicado((previo) => ({
            ...previo,
            cantidad: totalItems.cantidad - item.cantidad,
            precio: totalItems.precio - (item.unitario * item.cantidad)
        }));
    }

    return { listaItems, addItem, addCantidad, totalItems, removeItem, removeCantidad }
}
