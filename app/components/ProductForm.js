"use client"; // Importante: habilita componentes con estado en app/

import { useState, useEffect } from "react";

export default function ProductForm ({ onSave, editProduct }) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");

    useEffect(() => {
        if (editProduct) {
            setNombre(editProduct.nombre);
            setCantidad(editProduct.cantidad);
            setPrecio(editProduct.precio)
        }
    }, [editProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !precio || !cantidad) return;
        onSave({ nombre: nombre, precio: precio, cantidad: cantidad });
        setNombre("");
        setPrecio("");
        setCantidad("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Precio del producto"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />
            <input
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
            />
            <button type="submit">{editProduct ? "Actualizar" : "Agregar"}</button>
        </form>
    );
}
