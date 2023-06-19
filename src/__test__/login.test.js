import React from 'react';
import App from '../App';
import Login from '../components/auth/Login';

import Navigate from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from "react-router-dom";
import AlertaState from '../context/alertas/AlertaState';
import AuthState from '../context/auth/AuthState';
import ProyectoState from '../context/proyectos/ProyectoState'
import TareaState from '../context/tareas/TareaState';

//jest.mock('../components/auth/Login');

it('Login test', () => {

  //PageLogin.mockImplementation(()=><div>PageHeaderMock</div>);

  render(
  

         <AlertaState>
           <AuthState>
             <BrowserRouter>
              <Login />
             </BrowserRouter>
           </AuthState>
         </AlertaState>
  
  
  );

  expect(screen.getByTestId('titulo').textContent).toBe('Iniciar Sesión');

});