import React, {useEffect, useContext} from 'react'
import AuthContext from '../../context/auth/AuthContext';



const Barra = () => {

    const autContext = useContext(AuthContext);
    const {usuario, usuarioAutenticado, cerrarSesion} = autContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
        <nav className="nav-principal">
            <button className="btn btn-black cerrar-sesion" onClick={() => cerrarSesion()}>Cerrar sesion</button>
        </nav>
        </header>
    );
}
 
export default Barra;