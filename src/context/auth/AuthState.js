import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'
//import {v4 as uuid} from "uuid"; 

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";



const AuthState = props => {



    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(AuthReducer, initialState)


    const registrarUsuario = (async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            // console.log(respuesta);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            // obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            //console.log(error.response.data.msg);
            dispatch({
                type: REGISTRO_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    categoria: 'alerta-error'
                }
            })
        }
    });

    const usuarioAutenticado = (async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta)
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    })

    const iniciarSesion = (async (datos) => {
        console.log(datos);
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            //console.log(respuesta)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    categoria: 'alerta-error'
                }
            })
        }
    })

    const cerrarSesion = (async (datos) => {
        dispatch({
            type: CERRAR_SESION
        })
    })

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;