import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Software.css';
import { auth, dbCPFs, logar } from '../firebase/login';
import swal from 'sweetalert';
import { getCookie, setCookie, deleteCookie } from '../firebase/cookies';
import { searchCPF } from '../firebase/cpfs';

// ICONES
import { FaRegFolderOpen } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { BiMessageDetail } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { IoBatteryFullSharp } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs";



const Software = () => {
  
    const navigate = useNavigate();
    
    const emailLocal = getCookie('email');
    const senhaLocal = getCookie('senha');
         
    // MODAL
    const [mdApps, setMdApps] = useState(true);
    const [mdCPFs, setMdCPFs] = useState(false);
    const [CPF, setCPF] = useState('');
    const [dados, setDados] = useState({});
    
    const handleMdCPFs = () => {
        setMdApps(false);
        setMdCPFs(true);
    }

    const handleSearchCPF = async () => {
        const dadosColetados = await searchCPF(CPF);
        setDados(dadosColetados);
    }
    

    const handleMdVoltar = () => {
        setMdApps(true);
        setMdCPFs(false);
    }
    
    const handleSetCpf = (cpf) => {
        try {
            if (/^\d+$/.test(cpf)) {
                setCPF(cpf);
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    

    return (
        <main className="container-software">
            
            <section className='content-software'>

                {mdApps && (
                    <article className='apps'>
                        <div onClick={handleMdCPFs} className='app'>
                            <IoIosSearch className='icon' />
                            <p>Searches</p>
                        </div>

                        <div className='app'>
                            <FaRegFolderOpen className='icon' />
                            <p>Files Public</p>
                        </div>

                        <div className='app'>
                            <BiMessageDetail className='icon' />
                            <p>Messages</p>
                        </div>
                    </article>
                )}

                {mdCPFs && (
                    <article className='searches'>
                        <h1>Search Data By CPF</h1>
                        <input value={CPF} maxLength={11} onChange={(e) => handleSetCpf(e.target.value)} className='input-principal' type='text' placeholder='CPF' />
                        <div className='wd-100 flex row'>
                            <button className='btn-principal mr-auto' onClick={handleSearchCPF}> Search </button>
                            <button className='btn-voltar ml-auto' onClick={handleMdVoltar}> Voltar </button>
                        </div>
                        {Object.keys(dados).length > 0 && (
                            <div className="dados">
                                <div className='top'>
                                    <h1>Signal Low</h1>
                                    <FaWifi className='icon' />
                                    <IoBatteryFullSharp className='icon' />
                                </div>
                                <div className='title'>
                                    <p><strong>Nome:</strong> <br /> {dados['NomeResponsavel']}</p>
                                    <a>Access Granted <br /> ********</a>
                                </div>
                                <div className='image'>
                                    <BsFillPersonVcardFill className='icon' />
                                </div>
                                <div className='description'>
                                    <p><strong>CPF:</strong> {dados['CpfResponsavel']}</p>
                                    <p><strong>RG:</strong> {dados['RgResponsavel']} - {dados['DigRgResponsavel']} </p>
                                    <p><strong>Data de Nascimento:</strong> {dados['DataNascimento']}</p>
                                </div>
                                <div className='bottom'>
                                    <img src={require('../img/favicon-removebg.png')} alt='ctOS' />
                                </div>
                            </div>
                        )}
                    </article>
                )}

            </section>
            
        </main>
    );
};


export default Software;