import { Link } from 'react-router-dom'

const PreviewProyecto = ({proyecto}) => {
    const { nombre, _id, cliente } = proyecto

  return (
    <div className='border-b p-5 flex hover:bg-gray-50 transition '>
        <p className='flex-1'>{nombre}
            <span className='text-sm text-gray-500 italic'>{' / '}{cliente}</span>
        </p>
        <Link
            to={`${_id}`}
            className='text-gray-600 hover:text-sky-600 uppercase text-sm font-bold transition'
        >Ver proyecto
        </Link>
    </div>
  )
}

export default PreviewProyecto