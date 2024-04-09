import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import Alerta from '../components/Alerta.jsx'

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault() 

    if(email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio!',
        error: true
      })
      return 
    }

    setAlerta({})

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`
      const { data } = await axios.post(url, {
        email
      })

      setAlerta({
        msg: data.msg,
        error: false
      })
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }



  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      { msg && (<Alerta alerta={alerta}/>)}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-700 py-3 mb-5 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition"
        >
          Ya tienes una cuenta? Inicia Sesion!
        </Link>

        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition"
        >
          No tienes una cuenta? Registrate!
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
