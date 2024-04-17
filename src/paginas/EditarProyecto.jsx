import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import FormularioProyecto from "../components/FormularioProyecto";

const EditarProyecto = () => {
  const { proyecto, obtenerProyecto, cargando } = useProyectos();
  const { id } = useParams();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { nombre, descripcion } = proyecto;

  if (cargando) return "Cargando....";

  return (
    <>
      <h1 className="font-black text-4xl">Editar proyecto: {nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
