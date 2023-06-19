import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/TareaContext';
import ProyectoContext from '../../context/proyectos/ProyectoContext';



const Tarea = ({tarea}) => {

    const proyectoContext = useContext(ProyectoContext);
    const {proyectoactual} = proyectoContext;

    const [proyecto] = proyectoactual;


    const tareaContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas, cambiarEstadoTarea, seleccionarTarea} = tareaContext;

    const onClickEliminar = (() => {
        eliminarTarea(tarea);
        obtenerTareas(proyecto);
    })

    const cambiarEstado = (() => {
        tarea.estado = !tarea.estado;
        cambiarEstadoTarea(tarea);
    })

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ?   (
                        <button
                            type="button"
                            className="completo"
                            onClick={cambiarEstado}
                        >
                        Completo
                        </button>
                    )
                :   (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={cambiarEstado}
                    >
                    Incompleto
                    </button>
                    )
                }
            </div> 
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={onClickEliminar}
                >
                Eliminar
                </button>
            </div>
        </li>
    );
}
 
export default Tarea;