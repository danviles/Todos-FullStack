import React, {useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = (props) => {

    const navigate = useNavigate();

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {autenticado, mensaje, iniciarSesion} = authContext;

    //password o usuario no exista
    useEffect(() => {
         if (autenticado) {
             navigate('/proyectos');
         }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        
    }, [mensaje, autenticado, navigate])

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const {email, password} = usuario;

    const onChangeInputUsuario = ((e)=>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    })
 
    const onSubmitUsuario = ((e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        //Pasar al action
        iniciarSesion({email, password});

    });

    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1 data-testid="titulo">Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmitUsuario}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Ingresa un Email" 
                        value={email}
                        onChange={onChangeInputUsuario}
                        >
                        </input>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Ingresa tu contraseña" 
                        value={password}
                        onChange={onChangeInputUsuario}
                        >
                        </input>
                    </div>
                    <div className="campo-form">
                        <input 
                        type="submit" 
                        className="btn btn-primario btn-block" 
                        value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Registrate aqui
                </Link>
            </div>
        </div>
    );
}
 
export default Login;