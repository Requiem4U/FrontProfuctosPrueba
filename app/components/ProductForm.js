"use client";

import { useState, useEffect, useRef } from "react";
import MyIconPluss from "./icons/MyIconPluss";
import MyIconUpdate from "./icons/MyIconUpdate";
import MyIconCancel from "./icons/MyIconCancel";
import MyIconCheck from "./icons/MyIconCheck";

export default function ProductForm ({ onSave, editProduct, onCancel }) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [error, setError] = useState("")

    const nombreRef = useRef(null);
    const precioRef = useRef(null);
    const cantidadRef = useRef(null);

    useEffect(() => {
        if (editProduct) {
            setNombre(editProduct.nombre);
            setCantidad(editProduct.cantidad);
            setPrecio(editProduct.precio);
        }
    }, [editProduct]);

    //Activa el evento submit
    const handleSubmit = (e) => {
        e.preventDefault();
        validateAndSave();
    };

    //Valida que los campos esten lleno y ejecuta la funcion que guarda los cambios en la BD
    const validateAndSave = () => {
        if (validateFields()) {
            console.log(456)
            onSave({ nombre, precio, cantidad });
            setNombre("");
            setPrecio("");
            setCantidad("");
        }
    }

    const validateFields = () => {
        if (!nombre) {
            setErrorMessage("Por favor ingresa el nombre del producto")
            nombreRef.current.focus();
            return false;
        } else {
            if (nombre.trim().length < 3) {
                setErrorMessage("El nombre del producto debe tener al menos 3 letras")
                return false;
            }
            precioRef.current.focus();
        }

        if (!precio) {
            setErrorMessage("Por favor ingresa el precio")
            precioRef.current.focus();
            return false;
        } else {
            if (parseFloat(precio) === 0) {
                setErrorMessage("El precio del producto debe ser mayor a 0")
                precioRef.current.focus();
                return false;
            }
        }

        if (!cantidad) {
            setErrorMessage("Por favor ingresa la cantidad")
            cantidadRef.current.focus();
            return false;
        } else {
            if (parseInt(cantidad) === 0) {
                setErrorMessage("La cantidad de producto debe ser mayor a 0")
                cantidadRef.current.focus();
                return false;
            }
        }

        return true;
    }

    const setErrorMessage = (message) => {
        setError(message);
        setTimeout(() => setError(""), 8000);
    }

    return (
        <form

            className="flex flex-col gap-4 p-6 rounded-lg shadow-md items-center
                 bg-white dark:bg-slate-800"
            noValidate
        >
            <h1 className="text-xl font-semibold">DATOS DEL PRODUCTO</h1>
            <label className="w-full flex flex-col gap-2">
                <p className="font-semibold">Nombre del producto</p>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="p-3 w-full rounded-md border border-gray-300 
                   focus:ring-2 focus:ring-blue-500 hover:bg-gray-200
                   bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
                    required
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            validateAndSave()
                        }
                    }}
                    ref={nombreRef}
                />
            </label>


            <div className="flex flex-row w-full justify-around gap-2 items-center">
                <label className="w-full flex flex-1 flex-col gap-2">
                    <p className="font-semibold">Precio</p>
                    <div className="relative flex w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                            $
                        </span>
                        <input
                            type="number"
                            placeholder="Mayor a 0 (Cero)"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            className="p-3 pl-7 rounded-md border border-gray-300 w-full
                                focus:ring-2 focus:ring-blue-500 hover:bg-gray-200
                                bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
                            required
                            ref={precioRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    validateAndSave()
                                }
                            }}
                        />
                    </div>
                </label>

                <label className="flex flex-1 flex-col w-full gap-2">
                    <p className="font-semibold">Cantidad</p>
                    <input
                        type="number"
                        placeholder="Maypr a 0 (Cero)"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        className="p-3 w-full rounded-md border border-gray-300 
                                focus:ring-2 focus:ring-blue-500 hover:bg-gray-200
                                bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
                        required
                        ref={cantidadRef}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                validateAndSave()
                            }
                        }}
                    />
                </label>
            </div>

            <div className="w-full min-h-[24px] flex flex-row justify-center items-center">
                {error && <p className="w-full text-red-500 text-wrap z-100">{error}</p>}
            </div>

            <div className="flex flex-row w-full justify-around gap-2 items-center mt-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 w-25 rounded-full font-semibold bg-rose-500 hover:bg-rose-600 text-white
                    dark:bg-rose-600 dark:hover:bg-rose-700
                    transition"
                >
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <MyIconCancel strokeWidth={4} />
                    </div>
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 w-25 rounded-full font-semibold text-white bg-green-400 hover:bg-green-500 
                    dark:hover:bg-[var(--bg-add-dark-2)] dark:bg-[var(--bg-add-dark)]
                    transition "
                >
                    {editProduct ? (
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <MyIconUpdate strokeWidth={3} />
                        </div>
                    ) : (
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <MyIconCheck strokeWidth={5} />
                        </div>
                    )}
                </button>
            </div>
        </form>
    );
}
