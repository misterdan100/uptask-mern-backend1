import { useState } from "react"
import Alerta from "./Alerta"
import useProyectos from "../hooks/useProyectos"

const FormularioColaborador = () => {
    const [email, setEmail ] = useState('')
    const { alerta, mostrarAlerta, submitColaborador } = useProyectos()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(email == '') {
            mostrarAlerta({msg: 'El E-mail es Obligatorio', error: true})
            return
        }

        submitColaborador(email)
    }
  return (
    <form  
        onSubmit={handleSubmit}
    className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >

        { alerta.msg && <Alerta alerta={alerta}/>}

        <div className="mb-5">
            <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold text-sm"
            >
                E-mail Colaborador:
            </label>

            <input 
                type="email" 
                id="email"
                placeholder="correo@corre.com"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <input type="submit" 
            className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
            value='Buscar Colaborador'
        />

    </form>
  )
}

export default FormularioColaborador