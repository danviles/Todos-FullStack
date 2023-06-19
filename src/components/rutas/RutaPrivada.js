import React, { Component, useContext, useEffect} from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import Proyectos from '../proyectos/Proyectos';
import Login from '../auth/Login';
import { Outlet } from 'react-router-dom';

const RutaPrivada = ({ children }) => {
    
    const authContext = useContext(AuthContext);
    const {autenticado, cargando} = authContext;
    //const navigate = Navigate();
    return (
        autenticado && cargando ? <Outlet/> : <Navigate to="/" />
    );
}


export default RutaPrivada;


  