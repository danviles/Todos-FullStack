import React, {useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/auth/AuthContext';


const NuevaCuenta = (props) => {

    const navigate = useNavigate();

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {autenticado, mensaje, registrarUsuario} = authContext;

    // en caso de que el usuario se haya registrado o sea un registro duplicado
    useEffect(() => {
        if (autenticado) {
            navigate('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        
    }, [mensaje, autenticado, navigate])

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const {nombre, email, password, confirmar} = usuario;

    const onChangeInputNuevoUsuario = ((e)=>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    })

    const onSubmitNuevoUsuario = ((e) => {
        e.preventDefault();

        // Validar campos vacios
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        // Password minimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('Password debe ser de al menos de 6 caracteres', 'alerta-error');
            return;
        }
        // Password sea iguala a confirmar Password
        if (password !== confirmar) {
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }

        // Pasar al action
        registrarUsuario({nombre, email, password});

    });

    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={onSubmitNuevoUsuario}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Ingresa tu nombre de usuario" 
                        value={nombre}
                        onChange={onChangeInputNuevoUsuario}
                        >
                        </input>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Ingresa un Email" 
                        value={email}
                        onChange={onChangeInputNuevoUsuario}
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
                        onChange={onChangeInputNuevoUsuario}
                        >
                        </input>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                        type="password" 
                        id="confirmar" 
                        name="confirmar" 
                        placeholder="Repite tu contraseña" 
                        value={confirmar}
                        onChange={onChangeInputNuevoUsuario}
                        >
                        </input>
                    </div>
                    <div className="campo-form">
                        <input 
                        type="submit" 
                        className="btn btn-primario btn-block" 
                        value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a iniciar sesion
                </Link>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;