import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";

const FormularioProyecto = () => {
  const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos();

  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cliente, setCliente] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");

  const params = useParams()
  
  useEffect(() => {
    if(params.id) {
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setCliente(proyecto.cliente)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
    } 
  }, [params])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return
    }

    // send data to project provider
    mostrarAlerta({})

    await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})

    setId(null)
    setNombre('')
    setDescripcion('')
    setCliente('')
    setFechaEntrega('')

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 rounded-lg shadow-sm transition "
    >
      {alerta.msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
          placeholder="Nombre proyecto..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripcion Proyecto
        </label>

        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
          placeholder="Descripcionn del proyecto..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="fecha-entrega"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha Entrega
        </label>

        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Cliente
        </label>

        <input
          id="cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
          placeholder="Nombre cliente..."
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={ id ? 'Actualizar proyecto' : 'Crear Proyecto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-sky-700 transition"
      />
    </form>
  );
};

export default FormularioProyecto;
