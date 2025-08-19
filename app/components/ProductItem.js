"use client";

export default function ProductItem ({ product, onEdit, onDelete }) {
    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50">
            <div>
                <p className="font-semibold">{product.nombre}</p>
                <p className="font-semibold">$ {product.precio}</p>
                <p className="text-gray-500">Cantidad: {product.cantidad}</p>
            </div>
            <div className="space-x-2">
                <button
                    onClick={() => onEdit(product)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(product)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
