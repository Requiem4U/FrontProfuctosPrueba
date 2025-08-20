"use client";

import ProductItem from "./ProductItem";

export default function ProductList ({ products, onEdit, onDelete }) {
    if (products.length === 0) return <p className="text-gray-500">No hay productos</p>;

    return (
        <div className="grid grid-cols-5 gap-x-3 gap-y-5 size-full p-2">
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
