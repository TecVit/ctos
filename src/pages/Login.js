import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import swal from 'sweetalert';

// ICONES
import { IonIcon } from '@ionic/react';
import * as IoniconsIcons from 'ionicons/icons';

const Loading = () => {
  
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const [cadastrar, setCadastrar] = useState(false);
  
    return (
        <main className="container-login">
            
            {login && (
                <div className='content-login'>
                    <img src={require('../img/dedsec.jpg')} alt='DedSec' />
                    <h1>Access Granted: Enter the Software CTOS</h1>
                    <input type='text' placeholder='E-mail' />
                    <input type='password' placeholder='Password' />
                    <button>Entrar</button>
                </div>
            )}
            
        </main>
    );
};


export default Loading;