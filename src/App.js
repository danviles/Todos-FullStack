import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/auth/AuthState';
import ProyectoState from './context/proyectos/ProyectoState'
import TareaState from './context/tareas/TareaState';
import RutaPrivada from './components/rutas/RutaPrivada';

import tokenAuth from './config/tokenAuth';

//revisar si tenemos un token

const token = localStorage.getItem('token');

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
              {/* <Provider store={store}> */}
              {/* <Header /> */}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route path="/proyectos" element={<RutaPrivada />} >
                  <Route index element={<Proyectos />} />
                </Route>
              </Routes>
              {/* </Provider> */}
            </BrowserRouter >
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
