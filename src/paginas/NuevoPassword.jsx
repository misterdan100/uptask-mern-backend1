import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import clienteAxios from "../config/clienteAxios.jsx";
import Alerta from "../components/Alerta.jsx";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/usuarios/olvide-password/${token}`;

        await clienteAxios(url);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta({});
    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTokenValido(false);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alerta.msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg px-10 py-5"
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 hover:bg-sky-800 hover:cursor-pointer py-3 mb-5 w-full text-white uppercase font-bold rounded hover:shadow transition-colors"
          />
        </form>
      )}

      {!tokenValido && (
        <nav className="lg:flex lg:justify-center">
          <Link
            to="/"
            className="block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition"
          >
            Inicia Sesion!
          </Link>
        </nav>
      )}
    </>
  );
};

export default NuevoPassword;