import React, { createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext();

export default function ContextCart() {
    const [listaItems, setListaItems] = useState([]);

    return (
        <CartContext.Provider value={{ listaItems, setListaItems }}>
            {children}
        </CartContext.Provider>
    );
}


export function useCartContext() {
    const { listaItems, setListaItems } = useContext(CartContext);
    const [listaDuplicada, setListaDuplicada] = useState([]);
    const [precioItem, setPrecioItem] = useState([]);

    useEffect(() => {
        setListaItems(listaDuplicada);
    }, [listaDuplicada]);


    function addItem(item) {
        // primero se verifica que el duplicado tenga al menos un item
        if (listaDuplicada.length == 0) {
            setListaDuplicada([...listaDuplicada], item);
        } else {
            // si posee al menos un item, lo siguiente es verificar si el item nuevo 
            // no es el mismo que ya se a guardado
            const bandera = listaDuplicada.some(obj => obj.name === item.name);
            // en caso de ser el mismo item, lo que se hara es buscar el item guardado para aumentar la cantidad 
            // estructura basica de listado
            // item:{
            //     name,
            //     (precio)unitario,
            //     cantidad
            //     (precio)total
            // }
            if (bandera) {
                // setListaDuplicada(listaDuplicada.map(i => (i.name === item.name ? i.cantidad + 1 : '')));
                setListaDuplicada(
                    listaDuplicada.map(i => (
                        i.name === item.name ? (
                            i.cantidad + 1,
                            i.total = i.unitario * i.cantidad
                        )
                        : ''
                    ))
                )
            }
        }

    }

}
