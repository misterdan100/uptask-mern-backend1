import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

import useAuth from '../hooks/useAuth'

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  const { setAuth } = useAuth()


  const handleSubmit = async e => {
    e.preventDefault() 

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl capitalize"
      >Inicia sesion y administra tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alerta.msg && (<Alerta alerta={alerta}/>)}

      <form 
      onSubmit={handleSubmit}
      className="my-10 bg-white shadow rounded-lg px-10 py-5"
      >
        <div className="my-5">
          <label 
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >E-mail:</label>
          <input 
            type="email" 
            id="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label 
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Password:</label>
          <input 
            type="password" 
            id="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        
        <input 
          type="submit"
          value="Iniciar Sesion"
          className="bg-sky-700 py-3 mb-5 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to='registrar'
          className='block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition'
        >
        No tienes una cuenta? Registrate!
        </Link>

        <Link
          to='olvide-password'
          className='block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition'
        >
        Olvide mi Password!
        </Link>

      </nav>

    </>
  )
}

export default Login