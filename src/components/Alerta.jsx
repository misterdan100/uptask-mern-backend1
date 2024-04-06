
const Alerta = ({alerta}) => {

  return (
    <div
        className={`${alerta.error ? 'bg-red-400 border-red-600' : 'bg-sky-400 border-sky-600'} border-2 text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}
    >
        {alerta.msg}
    </div>
  )
}

export default Alerta