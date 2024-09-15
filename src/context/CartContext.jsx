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
        console.log(totalItems);
        console.log(totalItems.cantidad);
    }, [listaDuplicada, setListaItems, setTotalDuplicado, totalDuplicado]);


    function calcularItems(){
        let totalCantidad = 0;
        let totalPrecio = 0;
        for (let index = 0; index < listaDuplicada.length; index++) {
            totalCantidad = totalCantidad + listaDuplicada[index].cantidad;
            totalPrecio = totalPrecio + listaDuplicada[index].total;
        }
        
        setTotalDuplicado({
            cantidad: totalCantidad,
            precio: totalPrecio
        });
    }

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
            setTotalDuplicado(i =>({
                cantidad: i.cantidad + 1,
                precio: i.precio + item.unitario
            }));
            // calcularItems();
        }else{
            setListaDuplicada([...listaDuplicada, item]);
            setTotalDuplicado({
                cantidad: 1,
                precio: item.unitario
            })
        }
    }
    return { listaItems, addItem, totalItems }
}
