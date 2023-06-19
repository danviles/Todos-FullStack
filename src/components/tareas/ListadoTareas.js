import React, { useContext, useEffect } from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {

    const proyectoContext = useContext(ProyectoContext);
    const { proyectoactual, eliminarProyecto } = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const { tareasactual, obtenerTareas } = tareaContext;

    // useEffect(() => {
    //     if (!proyectoactual) {
    //         return
    //     }
    //     obtenerTareas(proyectoactual[0])
    // }, [tareasactual])

    if (!proyectoactual) {
        return <h2>Selecciona un proyecto</h2>
    }

    const [proyecto] = proyectoactual;

    return (
        <>
            <h2>Proyecto: {proyecto.nombre}</h2>
            <ul className="listado-tareas">
                {tareasactual.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {tareasactual.map((tarea) => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea key={tarea.id} tarea={tarea} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyecto)}
            >
                Eliminar Proyecto &times;
            </button>
        </>
    );
}

export default ListadoTareas;