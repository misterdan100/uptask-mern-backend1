import { useEffect, useState } from "react"
import { useParams, Link} from 'react-router-dom'
import axios from 'axios'
import clienteAxios from "../config/clienteAxios.jsx"
import Alerta from '../components/Alerta.jsx'

const ConfirmarCuenta = () => {
  const [ alerta, setAlerta ] = useState({})
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar/${id}`)
        
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
         
        setCuentaConfirmada(false)
      }
    }

    confirmarCuenta()
  }, [])

  const { msg } = alerta
  

 

  
  return (
    <>

      <h1
        className="text-sky-600 font-black text-6xl capitalize"
      >Confirma tu cuenta y administra tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      { msg && <Alerta alerta={alerta} />}

      </div>

      {cuentaConfirmada && (
        <nav className="lg:flex lg:justify-center">
        <Link
          to='/'
          className='block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition'
        >
        Inicia Sesion!
        </Link>
      </nav>
      )}


    </>
  )
}

export default ConfirmarCuenta