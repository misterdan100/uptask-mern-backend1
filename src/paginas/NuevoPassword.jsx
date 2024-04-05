import { Link } from "react-router-dom"

const NuevoPassword = () => {
  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl capitalize"
      >Reestablece tu password y no pierdas acceso a tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5">

        <div className="my-5">
          <label 
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Nuevo password:</label>
          <input 
            type="password" 
            id="password"
            placeholder="Nuevo password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        
        
        <input 
          type="submit"
          value="Guardar nuevo password"
          className="bg-sky-700 py-3 mb-5 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-colors"
        />
      </form>

    </>
  )
}

export default NuevoPassword