import {useState, useEffect} from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  const [pacientes, setPacientes]=useState(JSON.parse(localStorage.getItem('pacientes')) ?? []); //Aqui guardamos los pacientes -- ?? (es nulo o indefinido) retorne []
  const [paciente, setPaciente]=useState({}); //Aqui guardamos el objetoPaciente

  //useEffect(()=>{ //Si el arreglo está vacío
    //const obtenerLS=()=>{//Recuperar lo que hay en localStorage
      //const pacientesLS=JSON.parse(localStorage.getItem('pacientes')) ?? []; //llave pacientes - convertir el string en un arreglo con JSON.parse
      //setPacientes(pacientesLS); //Actualizo el state
   // }

    //obtenerLS(); //Llamamos a la funcion de arriba
  //}, []);

  useEffect(()=>{ //Sincronizar con localstorage
    localStorage.setItem('pacientes', JSON.stringify(pacientes)); //Añadiendo al localStorage con setItem(llave, dato convertido a string) siempre que pacientes cambie;
  }, [pacientes]);

  const eliminarPaciente=(id)=>{
    const pacientesActualizados=pacientes.filter((paciente)=>paciente.id!==id); //Filtramos del arreglo los id del arreglo pacientes diferentes al que ingresa por parametro y obtenemos el dato que deseamos eliminar
    setPacientes(pacientesActualizados); //Actualizamos el arreglo pacientes
  }
  /**
   * Props
   * <Componente
   * variable1={variable1}
   * estaActivo{false}/>
   * Si un State pasa por distintos componentes, ubicarlo en el archivo principal
   * Tambien se pueden pasar funciones
   * Para usar las variables, se le pone al componente como param. "props"
   * o también, el nombre de la variable a usar
   */
  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 flex md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
         pacientes={pacientes}
         setPaciente={setPaciente}
         eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
