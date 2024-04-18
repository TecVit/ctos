import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { auth, logar } from '../firebase/login';
import swal from 'sweetalert';
import { getCookie, setCookie, deleteCookie } from '../firebase/cookies';

// ICONES
import { IonIcon } from '@ionic/react';
import * as IoniconsIcons from 'ionicons/icons';

const Login = () => {
  
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const [cadastrar, setCadastrar] = useState(false);

    // INPUTS
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const emailLocal = getCookie('email');
    const senhaLocal = getCookie('senha');
            
    if (emailLocal && senhaLocal) {
        auth.onAuthStateChanged( async function(user) {
            if (user) {
                const email = await user.email;
                if (emailLocal === email) {
                    window.location.href = "/software/";
                }
            }
        });
    }

    return (
        <main className="container-login">
            
            {login && (
                <div className='content-login'>
                    <img src={require('../img/dedsec.jpg')} alt='DedSec' />
                    <h1>Access Granted: Enter the Software CTOS</h1>
                    <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='E-mail' />
                    <input onChange={(e) => setSenha(e.target.value)} type='password' placeholder='Password' />
                    <button onClick={() => logar(email, senha)}>Entrar</button>
                </div>
            )}
            
        </main>
    );
};


export default Login;