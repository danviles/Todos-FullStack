import React, {useContext, useEffect} from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const LsitadoProyectos = () => {

    const proyectoContext = useContext(ProyectoContext);
    const {proyectos, obtenerProyectos} = proyectoContext;

    useEffect(() => {
        obtenerProyectos()
    }, [])

    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
            {proyectos.map(proyecto => (

                <CSSTransition
                    key={proyecto.id}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Proyecto proyecto={proyecto} />
                </CSSTransition>
            ))}
            </TransitionGroup>
                
        </ul>
    );
}
 
export default LsitadoProyectos;