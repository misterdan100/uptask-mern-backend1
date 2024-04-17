import useProyectos from '../hooks/useProyectos'
import PreviewProyecto from '../components/PreviewProyecto'

const Proyectos = () => {
  const { proyectos } = useProyectos()


  return (
    <>
        <h1 className='text-4xl font-black'>
            Proyectos
        </h1>

        <div className="bg-white shadow mt-10 rounded-lg">
          { proyectos.length ? 
          proyectos?.map((proyecto, index) => (
            <PreviewProyecto 
              key={index}
              proyecto={proyecto}
            />
          ))
          : 
          <p className='text-center text-gray-600 uppercase p-5'>No hay proyectos para mostrar.</p>}

        </div>
    </>
  )
}

export default Proyectos