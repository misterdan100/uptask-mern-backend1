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
  const [ modalEliminarTarea, setModalEliminarTarea] = useState(false)
  const [ tarea, setTarea ] = useState({})
  const [ colaborador, setColaborador ] = useState({})
  const [ modalEliminarColaborador, setModalEliminarColaborador ] = useState(false)

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
      setAlerta({})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
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
    setTarea({})
    setModalFormularioTarea(!modalFormularioTarea)
  }

  // Task functions ---------------
  const submitTarea = async tarea => {

    if(tarea.id) {
      await editarTarea(tarea)
    } else {
      await crearTarea(tarea)
    }
    
  }

  const crearTarea = async tarea => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(`/tareas`, tarea, config);
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = [...proyecto.tareas, data];
      setProyecto(proyectoActualizado);

      setAlerta({
        msg: "Tarea Agregada Correctamente.",
        error: false,
      });


      setTimeout(() => {
        setModalFormularioTarea(false);
        setAlerta({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
      
      const proyectoActualizado = { ...proyecto };
      const tareasActualizadas = proyecto.tareas.map((currentTarea) =>
        currentTarea._id === tarea.id ? data : currentTarea
      );
      proyectoActualizado.tareas = tareasActualizadas;
      
      setAlerta({
        msg: "Tarea Editada Correctamente.",
        error: false,
      });

      setProyecto(proyectoActualizado);

      setTimeout(() => {
        setModalFormularioTarea(false);
        setAlerta({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = tarea => {
    setTarea(tarea)

    setModalFormularioTarea(true)
  }

  const handleModalEliminarTarea = tarea => {
    if(tarea) {
      setTarea(tarea)
    }
    setModalEliminarTarea(!modalEliminarTarea)
  }

  const eliminarTarea = async () => {
    
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, options)

      setAlerta({msg: 'Tarea eliminada!', error: false})

      const proyectoActualizado = {...proyecto}
      const tareasActualizadas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id)
      proyectoActualizado.tareas = tareasActualizadas
      setProyecto(proyectoActualizado)

      setModalEliminarTarea(false)
      setTarea({})

      setTimeout(() => {
        setAlerta({})
      }, 3000);

    } catch (error) {
      console.log(error)
    }
  }

  const submitColaborador = async email => {
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

      const { data } = await clienteAxios.post('/proyectos/colaboradores', {email: email}, config)
      setColaborador(data)
      setAlerta({})
      
    } catch (error) {
     setAlerta({
      msg: error.response.data.msg,
      error: true
     })
    } finally {
      setCargando(false)
    }
  }

  const agregarColaborador = async email => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return 

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

      const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)

      setAlerta({
        msg: data.msg,
        error: false
      })
      setColaborador({})
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      
  } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
  }
  }

  const handleModalEliminarColaborador = colaborador => {
    setModalEliminarColaborador(!modalEliminarColaborador)

    setColaborador(colaborador)
  }

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return 

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

       const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id}, config)

       const proyectoActualizado = {...proyecto}
       proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter( colaboradorState => colaboradorState._id !== colaborador._id)
       setProyecto(proyectoActualizado)

      setAlerta({
        msg: data.msg,
        error: false
      })
      setColaborador({})
      setTimeout(() => {
        setAlerta({})
        setModalEliminarColaborador(false)
      }, 3000);

      
  } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
  }
  }

  const completarTarea = async id => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)

      const proyectoActualizado = {...proyecto}
      proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => {
        if(tareaState._id === data._id) {
          tareaState.estado = data.estado
          return tareaState
        }
        return tareaState
      } ) 

      setProyecto(proyectoActualizado)
      setAlerta(data)
      setAlerta({})


    } catch (error) {
      console.log(error.response)
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
      submitTarea,
      handleModalEditarTarea,
      tarea,
      modalEliminarTarea,
      handleModalEliminarTarea,
      eliminarTarea,
      submitColaborador,
      colaborador,
      agregarColaborador,
      modalEliminarColaborador,
      handleModalEliminarColaborador,
      eliminarColaborador,
      completarTarea
    }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export default ProyectosContext
export {ProyectosProvider}

