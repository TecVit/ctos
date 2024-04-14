import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Loading.css';
import swal from 'sweetalert';

// ICONES
import { IonIcon } from '@ionic/react';
import { wifiOutline } from 'ionicons/icons';
import { batteryFullOutline } from 'ionicons/icons';
import { cellularOutline } from 'ionicons/icons';

const Loading = () => {
  
    const navigate = useNavigate();
  
    useEffect(() => {
        const timeouts = [
            setTimeout(() => {
                navigate('/login');
            }, 10000)
        ];

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

  return (
    <main className="container-loading">
      
        <img src={require('../video/loading.gif')} />
      
    </main>
  );
};


export default Loading;