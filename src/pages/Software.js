import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Software.css';
import { auth, dbCPFs, logar } from '../firebase/login';
import swal from 'sweetalert';
import { getCookie, setCookie, deleteCookie, limparCookies } from '../firebase/cookies';
import { searchCPF } from '../firebase/cpfs';
import { database, checkRoomExists, createRoom, getMessages, sendMessage } from '../firebase/messages';

// ICONES
import { FaRegFolderOpen } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { BiMessageDetail } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { IoBatteryFullSharp } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";



const Software = () => {
  
    const navigate = useNavigate();
    
    const emailLocal = getCookie('email');
    const senhaLocal = getCookie('senha');
            
    if (emailLocal && senhaLocal) {
        auth.onAuthStateChanged( async function(user) {
            if (user) {
                const email = await user.email;
                if (emailLocal !== email) {
                    await localStorage.clear();
                    await limparCookies();
                    window.location.href = "/login/";
                }
            }
        });
    }

    
    // CPFS
    const [CPF, setCPF] = useState('');
    const [dados, setDados] = useState({});
    
    const handleSearchCPF = async () => {
        const dadosColetados = await searchCPF(CPF);
        setDados(dadosColetados);
    }

    const handleSetCpf = (valor) => {
        try {
            const cpf = valor.replace(/\D/g, '');
            console.log(cpf)
            if (valor.length === 0) {
                setCPF('');
                return;
            } else if (/^\d+$/.test(cpf)) {
                setCPF(cpf);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // MESSAGES
    const [roomId, setRoomId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    
    const handleSetRoomId = (valor) => {
        try {
            const id = valor.replace(/\D/g, '');
            if (valor.length === 0) {
                setRoomId('');
                return;
            } else if (/^\d+$/.test(id)) {
                setRoomId(id);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSendMessage = async () => {
        try {
            const envio = await sendMessage(roomId, message);
            if (envio) {
                setMessage('');
                const messagesGet = await getMessages(String(roomId));
                setMessages(messagesGet);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleEnterRoom = async () => {
        const existe = await checkRoomExists(String(roomId));
        if (existe) {
            const messagesGet = await getMessages(String(roomId));
            setMdMessages(true);
            setMessages(messagesGet);
        } else if (!existe && existe !== null){
            const create = await createRoom(String(roomId));
            if (create) {
                const messagesGet = await getMessages(String(roomId));
                setMessages(messagesGet);
                setMdMessages(true);
            }
        }
    }

    // MODAL
    const [mdApps, setMdApps] = useState(true);
    const [mdCPFs, setMdCPFs] = useState(false);
    const [mdRoom, setMdRoom] = useState(false);
    const [mdMessages, setMdMessages] = useState(false);
    
    const handleMdCPFs = () => {
        setMdApps(false);
        setMdCPFs(true);
        setMdRoom(false);
    }

    const handleMdMessages = () => {
        setMdApps(false);
        setMdCPFs(false);
        setMdRoom(true);
    }

    const handleMdVoltar = () => {
        setMdApps(true);
        setMdCPFs(false);
        setMdRoom(false);
    }

    useEffect(() => {
        
        if (roomId && Object.entries(messages).length !== 0) {
            const messagesRef = database.ref(`anonymous/messages/${roomId}`);
            
            // Adicionando um "ouvinte" para as alterações no banco de dados
            const messagesListener = messagesRef.on('value', (snapshot) => {
                const messagesData = snapshot.val();
                
                if (messagesData) {
                    setMessages(messagesData);
                } else {
                    setMessages([]);
                }
            });
    
            return () => messagesRef.off('value', messagesListener);
        }

    }, []);    
    
    

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

                        <div onClick={handleMdMessages} className='app'>
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

                {mdRoom && (
                    <>
                        {mdMessages ? (
                            <article className='messages'>
                                <h1>
                                    Messages Anonymoys <br />
                                    Room ID: {roomId}
                                </h1>
                                {Object.values(messages).length > 1 ? (
                                    Object.entries(messages).map(([key, value]) => {
                                        if (typeof value === 'object' && value !== null) {
                                            const { data, message } = value;
                                            return (
                                                <div className='message' key={key}>
                                                    <p><strong>anonymous:</strong> {message}</p>
                                                    <a>{data}</a>
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <h2>Not found message</h2>
                                )}
                                <div className='input-message'>
                                    <input onChange={(e) => setMessage(e.target.value)} value={message} className='input-principal' type='text' placeholder='Message'/>
                                    <IoIosSend className='icon' onClick={handleSendMessage} />
                                </div>
                            </article>
                        ) : (
                            <article className='searches'>
                                <h1>Enter a Room</h1>
                                <input value={roomId} maxLength={6} onChange={(e) => handleSetRoomId(e.target.value)} className='input-principal' type='text' placeholder='Room ID' />
                                <div className='wd-100 flex row'>
                                    <button className='btn-principal mr-auto' onClick={handleEnterRoom}> Enter </button>
                                    <button className='btn-voltar ml-auto' onClick={handleMdVoltar}> Voltar </button>
                                </div>
                            </article>
                        )}
                    </>
                )}

            </section>
            
        </main>
    );
};


export default Software;