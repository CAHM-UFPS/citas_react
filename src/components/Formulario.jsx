import {useState, useEffect} from "react";
import Error from "./error";

function Formulario({pacientes, setPacientes, paciente, setPaciente}){
    //State siempre en parte superior del componente
    //Declaracion: nombre_variable, funcion = valor inicial
    
    /**
     * Reglas:
     * Antes del return
     * No en condicionales
     * No después de un return
     * Dentro de la función
     */
    
    const [nombre, setNombre]=useState("");
    const [propietario, setPropietario]=useState("");
    const [correo, setCorreo]=useState("");
    const [fecha, setFecha]=useState("");
    const [sintomas, setSintomas]=useState("");

    //Notificacion
    const [error, setError]=useState(false);
    
    /**
     * Usa la variable cuando se encuentra en uso o cambia
     * Dos parámetros useEfect(()=>{algo}, [variable a evaluar])
     */
    useEffect(()=>{
        if(Object.keys(paciente).length>0){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setCorreo(paciente.correo);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente])

    const generarId=()=>{
        const random=Math.random().toString(36).substring(2); //Emulacion Hash
        const fecha=Date.now().toString(36); //Emulacion Hash

        return random+fecha;
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();

        //Validar Formulario
        if([nombre, propietario, correo, fecha, sintomas].includes("")){
            console.log("Hay campos vacios");
            setError(true);
            return;
        }

        setError(false);

        //Objeto Paciente
        const objetoPaciente={ //Las variables toman los datos obtenidos del formulario
            nombre,
            propietario,
            correo,
            fecha,
            sintomas
        }

        if(paciente.id){ //Si existe un id
            //Editando registro
            objetoPaciente.id=paciente.id //Asignando id a objeto Paciente
            const pacientesActualizados=pacientes.map((pacienteState) => pacienteState.id===
                paciente.id? objetoPaciente : pacienteState); //Recorro pacientes, identifica id iguales, edita la informacion y retorna obejetoPaciente que almacena los datos actualizados
                
                setPacientes(pacientesActualizados);
                
                setPaciente({}); //limpiamos State - Viene de App.jsx
        }else{
            //Nuevo registro
            objetoPaciente.id=generarId();
            setPacientes([...pacientes, objetoPaciente]); //Prop App.jsx, ...variable significa copia y genera nuevo arr
        }
        
        //Reiniciar el formulario
        setNombre("");
        setPropietario("");
        setCorreo("");
        setFecha("");
        setSintomas("");
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento 
            Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error&& <Error mensaje="Todos los campos son obligatorios"/>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre de la Mascota" 
                    value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre del Propietario"
                    value={propietario} onChange={(e)=> setPropietario(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Correo</label>
                    <input id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" placeholder="Correo Contacto Propietario"
                    value={correo} onChange={(e)=> setCorreo(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label>
                    <input id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date"
                    value={fecha} onChange={(e)=> setFecha(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Describe los sintomas"
                    value={sintomas} onChange={(e)=> setSintomas(e.target.value)}/>
                </div>
                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
                value={paciente.id? "Editar Paciente" : "Agregar Paciente"}/> {/*paciente.id? true: false - Si existe id */}
            </form>
        </div>
    )
}

export default Formulario;