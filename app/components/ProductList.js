"use client";

import ProductItem from "./ProductItem";

export default function ProductList ({ products, onEdit, onDelete }) {
    if (products.length === 0) return <p className="text-gray-500">No hay productos</p>;

    return (
        <div className="border border-gray-300 rounded shadow divide-y divide-gray-200">
            {products.map((p, index) => (
                <ProductItem
                    key={index}
                    product={p}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
