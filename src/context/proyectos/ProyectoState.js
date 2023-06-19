import React, { useReducer } from 'react';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {v4 as uuid} from "uuid"; 

import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
} from "../../types";



const ProyectoState = props => {

    const proyectos = [
        {id: 1, nombre: 'Tienda virtual'},
        {id: 2, nombre: 'Meta Verso'},
        {id: 3, nombre: 'Diseño de sitio web'}
    ]

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyectoactual: null
    }

    //Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = (() => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    })

    const agregarProyecto = ((proyecto) => {
        proyecto.id = uuid();
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    })

    const mostrarError = (()=>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    })

    const proyectoActual = ((proyecto)=>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        })
    })

    const eliminarProyecto = ((proyecto)=>{
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyecto
        })
    })


    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyectoactual: state.proyectoactual,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;