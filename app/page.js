"use client";

import { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function Home () {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🌟 Cargar productos desde el backend
  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // 🌟 Agregar o editar producto
  const handleSave = async (product) => {
    if (editProduct) {
      // Editar producto (PUT)
      try {
        const res = await fetch(
          `http://localhost:3000/api/productos/${editProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          }
        );
        const updatedProduct = await res.json();
        setProducts(
          products.map((p) => (p.id === editProduct.id ? updatedProduct : p))
        );
      } catch (err) {
        console.error("Error al actualizar producto:", err);
      }
      setEditProduct(null);
    } else {
      // Agregar producto (POST)
      try {
        console.log(JSON.stringify(product))
        const res = await fetch("http://localhost:3000/api/productos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        if (res.status != 400) {
          const newProduct = await res.json();
          setProducts([...products, newProduct]);
        }

      } catch (err) {
        console.error("Error al agregar producto:", err);
      }
    }
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product) => {
    try {
      await fetch(`http://localhost:3000/api/productos/${product.id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p) => p.id !== product.id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  const toggleForm = () => {
    setEditProduct(null);
    setShowForm(!showForm);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Inventario de Productos</h1>

      <button
        onClick={toggleForm}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Cancelar" : "Agregar Producto"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow">
          <ProductForm onSave={handleSave} editProduct={editProduct} />
        </div>
      )}

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
