import { createContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/clienteAxios"

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
  const [ proyectos, setProyectos ] = useState([])
  const [ proyecto, setProyecto ] = useState({})
  const [ alerta, setAlerta ] = useState({})
  const [ cargando, setCargando ] = useState(false)
  const [ modalFormularioTarea, setModalFormularioTarea] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios('/proyectos', config)
        setProyectos(data)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerProyectos()
  }, [])

  const mostrarAlerta = alerta => {
    setAlerta(alerta)
  }

  const submitProyecto = async proyecto => {

    if(proyecto.id) {
      await editarProyecto(proyecto)
    } else {
      await nuevoProyecto(proyecto)
    }
  }

  const editarProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

      const proyectosActualizados = proyectos.map(project => {
        if(project._id === proyecto.id) {
          return data
        }
        return project
      })
      setProyectos(proyectosActualizados)
      // setProyectos([...proyectos, data.proyectoAlmacenado])
      
      mostrarAlerta({
        msg: 'Proyecto Actualizado Correctamente',
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

  const nuevoProyecto = async proyecto => {
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
      setProyectos([...proyectos, data.proyectoAlmacenado])
      
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

  const obtenerProyecto = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      setProyecto( data )
    } catch (error) {
      console.log(error)
    }
    
    setCargando(false)
  }

  const eliminarProyecto = async id => {
    try {

      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
      
      setAlerta({
        msg: data.msg,
        error: false
      })

      const proyectosActualizados = proyectos.filter( proyectoState => proyectoState._id !== id)

      setProyectos(proyectosActualizados)

      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000);

    } catch (error) {
      console.log(error)
    }
  }

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea)
  }

  // Task functions ---------------
  const submitTarea = async tarea => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post(`/tareas`, tarea, config)

      const proyectoActualizado = {...proyecto}
      proyectoActualizado.tareas = [...proyecto.tareas, data]
      setProyecto(proyectoActualizado)
      
      setAlerta({
        msg: 'Tarea Agregada Correctamente.',
        error: false
      })

      setTimeout(() => {
        setModalFormularioTarea(false)
        setAlerta({})
      }, 2000);
      
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
      submitProyecto,
      obtenerProyecto,
      proyecto,
      cargando,
      eliminarProyecto,
      modalFormularioTarea,
      handleModalTarea,
      submitTarea
    }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export default ProyectosContext
export {ProyectosProvider}

