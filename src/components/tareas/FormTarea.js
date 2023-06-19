import React, {useState, useContext, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import {v4 as uuid} from "uuid"; 


const FormTarea = () => {

    const [tarea, setTarea] = useState({
        nombre: ''
    })

    const {nombre} = tarea;

    const proyectoContext = useContext(ProyectoContext);
    const {proyectoactual} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea} = tareaContext;

    useEffect(() => {
        if (tareaseleccionada) {o
            setTarea(tareaseleccionada)
        } else {
            setTarea({nombre: ''})
        }
    }, [tareaseleccionada])

    if (!proyectoactual) {
        return null
    }

    const [proyecto] = proyectoactual;

    const onChangeInputTarea = ((e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    })

    const onSubmitNuevaTarea = ((e) => {
        e.preventDefault();
        
        // validar campo vacio
        if (nombre.trim() === '') {
            //mostrar error
            validarTarea();
            return null;
        }

        if (!tareaseleccionada) {

            // Agregar tarea
            tarea.proyectoId = proyecto.id;
            tarea.estado = false;
            tarea.id = uuid()
            agregarTarea(tarea);

        } else {
            console.log(tarea);
            actualizarTarea(tarea)
        }


        obtenerTareas(proyecto);

        // Limpiar campo
        setTarea({nombre: ''});
    })

    return ( 
        <div className="formulario">
            <form onSubmit={onSubmitNuevaTarea}>
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeInputTarea}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-block btn-submit"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null} 
        </div>
    );
}
 
export default FormTarea;