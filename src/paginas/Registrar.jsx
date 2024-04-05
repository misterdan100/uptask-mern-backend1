import { Link } from 'react-router-dom'

const Registrar = () => {
  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl capitalize"
      >Crea tu cuenta y administra tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
        <div className="my-5">
          <label 
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Nombre:</label>
          <input 
            type="text" 
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        
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
          />
        </div>
        
        <div className="my-5">
          <label 
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Repetir Password:</label>
          <input 
            type="password" 
            id="password2"
            placeholder="Repetir tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        
        <input 
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 py-3 mb-5 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to='/'
          className='block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition'
        >
        Ya tienes una cuenta? Inicia Sesion!
        </Link>
        
        <Link
          to='/olvide-password'
          className='block text-center my-5 text-slate-500  text-sm hover:text-sky-500 transition'
        >
        Olvide mi Password!
        </Link>


      </nav>

    </>
  )
}

export default Registrar