import React, { createContext, useContext, useEffect, useState } from 'react'
export const CartContext = createContext();

CartContext.displayName = 'CartContexto';

export default function CartProvider({ children }) {
    const [listaItems, setListaItems] = useState([{ nombre: "Waffle with Berries ", unitario: 6.50, cantidad: 1, total: 6.50 }]);
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
    // {nombre: "Waffle with Berries ", unitario: 6.50, cantidad: 1, total: 6.50}
    const [listaDuplicada, setListaDuplicada] = useState([]);
    const [totalDuplicado, setTotalDuplicado] = useState([]);


    useEffect(() => {
        setListaItems(listaDuplicada);
        setTotalItems(totalDuplicado);
        console.log("desde useefect ", totalItems)
    }, [listaDuplicada, setListaItems, setTotalDuplicado, totalDuplicado]);

    function addCantidad(lista, item) {
        // dentro de setListaDuplicada se hara un map 
        // donde por cada elemento se preguntara si su atributo nombre es igual al atributo nombre del item pasado
        // en caso de ser verdadero, a ese elemento i se le modificara los atributos cantidad y total 
        setListaDuplicada(
            lista.map((i)=>
                i.nombre === item.nombre ?
                {
                    ...i, cantidad: i.cantidad + 1,
                    total: (i.cantidad + 1) * i.unitario
                } : i 
            )
        )
    }

    function addItem(lista, item) {
        setListaDuplicada([...lista, item]);
    }



    return { listaItems, addItem, addCantidad, totalItems }
}
