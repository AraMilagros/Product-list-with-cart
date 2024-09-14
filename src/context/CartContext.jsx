import React, { createContext, useContext, useEffect, useState } from 'react'
export const CartContext = createContext();

CartContext.displayName = 'CartContexto';

export default function CartProvider({children}) {
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
        console.log(listaDuplicada)
    }, [listaDuplicada, setListaItems]);


    function addItem(item) {
        const itemExistente = listaDuplicada.find((i) => i.name === item.name);

        if(itemExistente){
            setListaDuplicada(
                listaDuplicada.map((i)=>
                    i.name === item.name ?
                    {
                        ...i, cantidad: i.cantidad + 1, total: (i.cantidad + 1) * i.unitario
                    }
                    : i
                )
            )
        }else{
            console.log(item); 
            setListaDuplicada([...listaDuplicada, item]);
        }
    }
    return { listaItems, setListaItems, addItem }
}
