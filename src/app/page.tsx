"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  id: number;
  name: string;
  price: number;
};

function Page() {
  const [productos, setProductos] = useState([
    { id: 1, name: "producto1", price: 100 },
    { id: 2, name: "producto2", price: 100 },
    { id: 3, name: "producto3", price: 100 },
    { id: 4, name: "producto4", price: 100 },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({});

  const onSubmit = (data: Inputs) => {
    const id = Number(data.id);
    const price = Number(data.price);
    if (productos.some((p) => p.id === id)) {
      alert("Ya existe un producto con este ID.");
      return;
    }
    const newProduct = { id, name: data.name, price };
    setProductos((prev) => [...prev, newProduct]);
    reset();
  };

  const handleDeleteProduct = (ProductId: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== ProductId));
  };

  useEffect(() => {
    console.log("Productos actualizados", productos);
  }, [productos]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Gestión de Productos
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Agregar Nuevo Producto
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID del producto
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Ingrese el ID del producto"
                  {...register("id", {
                    required: "campo requerido",
                    max: 1000,
                  })}
                />
                {errors.id && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.id.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Ingrese el nombre del producto"
                  {...register("name", {
                    required: "campo requerido",
                    max: 1000,
                  })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio del producto
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="0.00"
                  step="0.01"
                  {...register("price", { required: "campo requerido" })}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.price.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                + Agregar Producto
              </button>
            </form>
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Lista de Productos ({productos.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productos.map((producto, index) => (
                    <tr
                      key={producto.id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {producto.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {producto.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        ${producto.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDeleteProduct(producto.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {productos.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">📦</div>
                  <p className="text-gray-500">No hay productos registrados</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
