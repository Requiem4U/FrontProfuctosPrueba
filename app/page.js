"use client";

import { useState, useEffect, Fragment } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import MyIconPluss from "./components/icons/MyIconPluss";

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
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Inventario de Productos</h1>
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 pb-8">
        <button
          onClick={toggleForm}
          className="flex flex-row px-4 py-3 gap-1 text-white rounded-full items-center h-fit
          bg-green-400 hover:bg-green-500 
          dark:hover:bg-[var(--bg-add-dark-2)] dark:bg-[var(--bg-add-dark)]
          transition delay-110 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          <p className="py-px-5 text-xl font-semibold"> Agregar producto</p>
          <MyIconPluss strokeWidth={4} />

        </button>
      </div>

      {showForm && (
        <Fragment>
          <div
            className="fixed inset-0 bg-black/30 z-60"
            onClick={toggleForm}
          >
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-[480px] z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <ProductForm
                  onSave={handleSave}
                  editProduct={editProduct}
                  onCancel={toggleForm}
                />
              </div>
            </div>
          </div>
        </Fragment>
      )}


      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
