import React, {useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';


const Proyecto = ({proyecto}) => {

    const proyectoContext = useContext(ProyectoContext);
    const {proyectoActual} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {obtenerTareas} = tareaContext;

    const onClickProyecto = (() => {
        proyectoActual(proyecto);
        obtenerTareas(proyecto)
    })

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={onClickProyecto}
            >
            {proyecto.nombre}
            </button>
        </li>
    );
}
 
export default Proyecto;