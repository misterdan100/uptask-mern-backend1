import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between hover:bg-gray-50 transition ">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre}
          <span className="text-sm text-gray-500 italic">
            {" / "}
            {cliente}
          </span>
        </p>
        {auth._id !== creador && <p className="py-1 px-2 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Colaborador</p>}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-sky-600 uppercase text-sm font-bold transition"
      >
        Ver proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
