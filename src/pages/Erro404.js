import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/404.css';
import swal from 'sweetalert';

// ICONES
import { IonIcon } from '@ionic/react';
import { wifiOutline } from 'ionicons/icons';
import { batteryFullOutline } from 'ionicons/icons';
import { cellularOutline } from 'ionicons/icons';

const Loading = () => {

  return (
    <main className="container-erro404">
      
        <img src={require('../img/404.png')} />
      
    </main>
  );
};


export default Loading;