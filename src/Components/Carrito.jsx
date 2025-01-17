import React, { useEffect, useState } from "react";

export const Carrito = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [carritoVacio, setCarritoVacio] = useState(false);

  useEffect(() => {
    try {
      const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
      if (Array.isArray(carritoActual)) {
        setProductosCarrito(carritoActual);
        setCarritoVacio(carritoActual.length === 0);
      } else {
        console.error(
          "Los datos recuperados del localStorage no son un array:",
          carritoActual
        );
      }
    } catch (error) {
      console.error("Error al parsear datos del localStorage:", error);
    }
  }, []);

  // Eliminar un producto del carrito
  const handleEliminarProducto = (index) => {
    // 1º lo obtiene
    try {
      const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
      // 2º lo verifica en el local storage
      if (Array.isArray(carritoActual)) {
        // Elimina en la posición index
        carritoActual.splice(index, 1);
        // Actualiza
        localStorage.setItem("carrito", JSON.stringify(carritoActual));
        setProductosCarrito(carritoActual);
        setCarritoVacio(carritoActual.length === 0);
      } else {
        console.error(
          "Los datos recuperados del localStorage no son un array:",
          carritoActual
        );
      }
    } catch (error) {
      console.error("Error al parsear datos del localStorage:", error);
    }
  };

  useEffect(() => {
    // EL TOTAL DEL CARRITO
    const calcularTotal = () => {
      let totalCalculado = 0;
      productosCarrito.forEach((item) => {
        totalCalculado += item.precio * item.cantidad;
      });
      return totalCalculado.toFixed(2);
    };

    setTotal(calcularTotal());
  }, [productosCarrito]);


  const CompraCompleta = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); 
  };

  const handleCantidadChange = (e, index) => {
    const newCantidad = parseInt(e.target.value);
    const updatedCarrito = [...productosCarrito];
    updatedCarrito[index].cantidad = newCantidad;
    setProductosCarrito(updatedCarrito);
    localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
  };

  return (
    <div className="container mt-4 w-50vw d-flex flex-column align-items-center">
      <div className="mb-4 text-start">
        <h2>Mi carrito</h2>
      </div>
      {carritoVacio ? (
        <div className="shadow-lg p-3 mb-5 bg-body rounded">
          <p className="fs-4 fst-italic text-center">Su carrito está vacío</p>
        </div>
      ) : (
        <div>
          <div className="table-responsive">
            <table
              className="table table-bordered mt-3"
              style={{ width: "50vw", height: "25vh" }}
            >
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Descripción del Producto</th>
                  <th>Precio</th>
                  <th>Quitar</th>
                </tr>
              </thead>
              <tbody>
                {productosCarrito.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center d-flex align-items-center justify-content-center">
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) => handleCantidadChange(e, index)}
                        min="1"
                        max="50"
                        className="form-control-plaintext text-center"
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td className="text-start pt-3">
                      <img
                        src={item.producto && item.producto.img}
                        alt={item.producto && item.producto.titulo}
                        style={{
                          width: "50px",
                          height: "auto",
                          marginRight: "10px",
                          borderRadius: "10px",
                        }}
                      />
                      {item.producto && item.producto.titulo}
                    </td>
                    <td className="text-center pt-4" style={{ width: "15vh" }}>
                      ${item.precio.toFixed(2)}
                    </td>
                    <td className="p-3" style={{ width: "3vh" }}>
                      <button
                        onClick={() => handleEliminarProducto(index)}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container w-50 d-flex justify-content-end gap-3">
            <div className="fw-bold text-end">
              <p className="fs-4 fs-md-3">
                Total: <span>${total}</span>
              </p>
            </div>
            <div className="text-end mt-0">
              <button onClick={CompraCompleta} className="btn btn-danger">
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      )}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          ¡Compra completada! Gracias por tu compra.
        </div>
      )}
    </div>
  );
};