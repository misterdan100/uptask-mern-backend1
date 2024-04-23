import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos()

  const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea;
  return (
    <div className="border-b p-5 flex justify-between items-center ">
      <div>
        <p className="mb-1 text-xl font-bold">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-md">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600 font-semibold">Prioridad: <span 
        className={`
        ${prioridad === 'Media' && 'text-amber-600' }
        ${prioridad === 'Alta' && 'text-red-600' }
        `}>{prioridad}</span></p>
      </div>

      <div className="flex justify-end gap-2 flex-wrap">
        <button 
        onClick={() => handleModalEditarTarea(tarea)}
        className="bg-amber-500 px-4 py-2 text-white uppercase font-bold rounded-lg border hover:border-amber-700 hover:bg-amber-600 transition"
        >
          Editar
        </button>

        {estado ? (
          <button className="bg-sky-600 px-4 py-2 text-white uppercase font-bold rounded-lg border hover:border-sky-800 hover:bg-sky-700 transition">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-2 text-white uppercase font-bold rounded-lg border hover:border-gray-800 hover:bg-gray-700 transition">
            Incompleta
          </button>
        )}

        <button 
          onClick={ () => handleModalEliminarTarea(tarea)}
          className="bg-red-600 px-4 py-2 text-white uppercase font-bold rounded-lg border hover:border-red-800 hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
