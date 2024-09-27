import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const agregarAlCarrito = (id, cantidad, nombre, categoria, precio, imagen) => {
        setCarrito((previo) => ({
            ...previo,
            [id]: { cantidad, nombre, categoria, precio, imagen },
        }));
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((previo)=>{
            const nuevoCarrito = {...previo};
            delete nuevoCarrito[id];
            return nuevoCarrito;
        });
    }

    const eliminarTodo = () => {
        let item={}
        setCarrito(item);
    }

    return(
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, eliminarTodo, openModal, setOpenModal }}>
            {children}
        </CarritoContext.Provider>
    );
};