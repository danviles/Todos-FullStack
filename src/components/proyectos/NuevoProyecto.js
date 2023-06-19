import React, { useState, useContext } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    const proyectoContext = useContext(ProyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectoContext;

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    const onChangeInputProyecto = ((e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    })

    const onSubmitProyecto = ((e) => {
        e.preventDefault();
        // Validar el proyecto.
        if (nombre === '') {
            mostrarError();
            return
        }
        // agregar al state ??
        agregarProyecto(proyecto);

        // Mandar al action.

        // Reiniciar formulario.
        setProyecto({
            nombre: ''
        });
    });

    const onClickNuevoProyecto = (() => {
        mostrarFormulario();
    });

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickNuevoProyecto}
            >
                Nuevo Proyecto
            </button>
            {
                formulario
                    ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre del proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeInputProyecto}
                            />
                            <input
                                type="submit"
                                className="btn btn-block btn-primario"
                                value="Agregar Proyecto"
                            />

                        </form>
                    )
                    : null
            }

            {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}

        </>
    );
}

export default NuevoProyecto;