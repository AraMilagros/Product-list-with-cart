import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (id, cantidad, nombre, categoria, precio) => {
        setCarrito((previo) => ({
            ...previo,
            [id]: { cantidad, nombre, categoria, precio },
        }));
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((previo)=>{
            const nuevoCarrito = {...previo};
            delete nuevoCarrito[id];
            return nuevoCarrito;
        });
    }


    return(
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};