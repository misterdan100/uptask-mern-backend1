import { createContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/clienteAxios"

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
  const [ proyectos, setProyectos ] = useState([])
  const [ alerta, setAlerta ] = useState({})

  const navigate = useNavigate()

  const mostrarAlerta = alerta => {
    setAlerta(alerta)
  }

  const submitProyecto = async proyecto => {
    setProyectos([...proyectos, proyecto])

    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/proyectos', proyecto, config)
      mostrarAlerta({
        msg: 'Proyecto creado Correctamente',
        error: false
      })

      setTimeout(() => {
        mostrarAlerta({})
        navigate('/proyectos')
      }, 3000);


      
    } catch (error) {
      console.log(error)
    }
    
  }


  return (
    <ProyectosContext.Provider
    value={{
      proyectos,
      mostrarAlerta,
      alerta,
      submitProyecto
    }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export default ProyectosContext
export {ProyectosProvider}

