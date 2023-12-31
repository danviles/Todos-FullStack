import React, { useReducer } from 'react';
import TareaContext from './TareaContext'
import TareaReducer from './TareaReducer';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_SELECCIONADA,
    ACTUALIZAR_TAREA 
} from "../../types";



const TareaState = props => {



    const initialState = {
        tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            {id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 7, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            {id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 10, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 11, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            {id: 12, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 13, nombre: 'Elegir Hosting', estado: true, proyectoId: 3},
        ],
        tareasactual: null,
        errortarea: false,
        tareaseleccionada: null
    }

    //Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Serie de funciones para el CRUD
    const obtenerTareas = ((proyecto)=> {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyecto
        })
    })

    const agregarTarea = ((tarea)=> {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    })

    const validarTarea = (()=> {
        dispatch({
            type: VALIDAR_TAREA
        })
    })

    const eliminarTarea = ((tarea)=> {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tarea
        })
    })

    const cambiarEstadoTarea = ((tarea)=>{
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    })

    const actualizarTarea = ((tarea) => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    })

    const seleccionarTarea = ((tarea) => {
        dispatch({
            type: TAREA_SELECCIONADA,
            payload: tarea
        })
    })

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasactual: state.tareasactual,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                validarTarea,
                agregarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                actualizarTarea,
                seleccionarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;