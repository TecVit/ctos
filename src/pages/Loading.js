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
  
    // Verifica o status da permissão
    navigator.permissions.query({ name: 'camera' })
        .then(function(permissionStatus) {
            if (permissionStatus.state === 'granted') {
                console.log('Permissão já concedida');
            } else {
                
                swal({
                    title: "Permissão de áudio e vídeo",
                    text: "Este site deseja acessar o seu áudio e vídeo. Você concede permissão?",
                    icon: "warning",
                    buttons: {
                        cancel: "Não",
                        confirm: "Sim",
                    },
                }).then( async (value) => {
                    if (value) {
                        try {
                            // O usuário concedeu permissão, solicita acesso ao áudio e vídeo
                            await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                                .then(function(stream) {
                                    console.log('Permissão concedida');
                                    window.location.reload();
                                })
                                .catch(function(error) {
                                    // O usuário negou a permissão ou ocorreu um erro
                                    console.error('Permissão negada ou erro:', error);
                                });    
                        } catch (error) {
                            navigate('/login');
                        }
                        
                    } else {
                        console.log('Permissão negada');
                        // O usuário negou a permissão
                    }
                });
            }
        })
        .catch(function(error) {
            console.error('Erro ao verificar permissão:', error);
        });
    


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
      
        <video autoPlay loop>
            <source src={require('../video/loading.mp4')} type="video/mp4" />
            {/* Adicione outras fontes de vídeo, se necessário, para compatibilidade com navegadores diferentes */}
            Seu navegador não suporta vídeo HTML5.
        </video>
      
    </main>
  );
};


export default Loading;