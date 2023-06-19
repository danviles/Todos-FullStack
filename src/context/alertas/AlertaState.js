import React, { useReducer } from 'react';
import AlertaContext from './AlertaContext';
import AlertaReducer from './AlertaReducer';
//import {v4 as uuid} from "uuid"; 

import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from "../../types";



const AlertaState = props => {

   

    const initialState = {
        aleta: null
    }

    //Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(AlertaReducer, initialState)


    const mostrarAlerta = ((msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    })

    return (
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    )
}

export default AlertaState;