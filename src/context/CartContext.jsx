import React, { createContext, useContext, useEffect, useState } from 'react'
export const CartContext = createContext();

CartContext.displayName = 'CartContexto';

export default function CartProvider({children}) {
    const [listaItems, setListaItems] = useState([{nombre: "Waffle with Berries ", unitario: 6.50, cantidad: 1, total: 6.50}]);
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
    }, [listaDuplicada, setListaItems, setTotalDuplicado, totalDuplicado]);

    // idea: hacer 2 funciones diferentes 
        // una para agregar un item nuevo a la lista
        // y otra solo para incrementar la cantidad de un producto 
        function addItem(lista, item) {
        const itemExistente = listaDuplicada.find((i) => i.nombre === item.nombre);
        if(itemExistente){

            setListaDuplicada(
                listaDuplicada.map((i)=>
                    i.nombre === item.nombre ?
                    {
                        ...i, cantidad: i.cantidad + 1, total: (i.cantidad + 1) * i.unitario
                    }
                    : i
                ) 
            )
            setTotalDuplicado(i =>({
                cantidad: i.cantidad + 1,
                precio: i.precio + item.unitario
            }));
            console.log("item modificado")
            console.log(listaItems)

        }else{
            setListaDuplicada([...lista, item]);
            setTotalDuplicado({
                cantidad: 1,
                precio: item.unitario
            });
            console.log("nuevo items");
            console.log(listaItems);
        }

    }
    return { listaItems, addItem, totalItems }
}
