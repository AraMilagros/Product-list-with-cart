import React, { useEffect, useState } from 'react'
import estilos from './estilos.module.css';
import { useCarrito } from '../../context/CartCotext';
import ItemCart from '../../components/ItemCart';
import carritoVacio from './illustration-empty-cart.svg';
import tree from './icon-carbon-neutral.svg';

import ModalConfirm from '../../components/ModalConfirm';

export default function index() {

    const { carrito, openModal, setOpenModal } = useCarrito();
    // const [openModal, setOpenModal] = useState(false);
    const [cantidadProductos, setCantidadProductos]=useState(0);
    const [totalPrecio, setTotalPrecio]=useState(0)
    // poner esto en un use state 


    useEffect(() => {
        const tproductos = Object.values(carrito)
            .reduce((total, producto) => total + producto.cantidad, 0);
        const tprecio = Object.values(carrito)
            .reduce((precio, producto) => precio + (producto.precio * producto.cantidad), 0);

        setCantidadProductos(tproductos);
        setTotalPrecio(tprecio);
    }, [carrito, ''])

    return (
        <div className={estilos.container}>
            <h2>Your Cart ({cantidadProductos})</h2>
            {Object.keys(carrito).length === 0 ? (
                <div className={estilos.iconoEmpty}>
                    <img src={carritoVacio} alt='icon-empty-cart' />
                    <label>Your added items will appear here</label>
                </div>
            ) : (
                <>
                    <div>
                        {
                            Object.entries(carrito).map(([id, { cantidad, nombre, categoria, precio }]) => (
                                <ItemCart
                                    key={id}
                                    id={id}
                                    cantidad={cantidad}
                                    nombre={nombre}
                                    categoria={categoria}
                                    precio={precio}
                                />
                            ))
                        }
                    </div>
                    <div className={estilos.precioTotal}>
                        <label>Order Total</label>
                        <label>$ {totalPrecio}</label>
                    </div>
                    <div className={estilos.note}>
                        <img src={tree} alt='icon-carbon-neutral' />
                        <label>This is a <strong>carbon-neutral</strong> delivery</label>
                    </div>
                    <a className={estilos.btnConfirm} onClick={() => setOpenModal(true)}>Confirm Order</a>
                </>
            )}
            {openModal && <ModalConfirm lista={carrito} total={totalPrecio} />}
        </div>
    )
}
