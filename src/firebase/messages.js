import firebase from 'firebase/compat/app';
import { firebaseConfigCFPs, firebaseConfig } from './firebaseConfig';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { getCookie, limparCookies, setCookie, deleteCookie } from './cookies';
import Swal from 'sweetalert';

const firebaseCPFs = firebase.initializeApp(firebaseConfigCFPs, 'CPFs');
const dbCPFs = firebaseCPFs.firestore();

const firebaseMessages = firebase.initializeApp(firebaseConfig, 'Messages');
const database = firebaseMessages.database();

let date = new Date();
let tempoReal = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;

const createRoom = async (roomId) => {
    try {
        const roomRef = await database.ref(`anonymous/messages/${roomId}`);
        
        await roomRef.set({
            data: tempoReal,
        });

        return true;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const checkRoomExists = async (roomId) => {
    if (roomId.length < 6) {
        await Swal({
            title: 'Room ID less than 6 digits!',
            icon: 'warning',
        });
        return null;
    } 
    if (roomId.length > 6) {
        await Swal({
            title: 'Room ID greater than 6 digits!',
            icon: 'warning',
        });
        return null;
    }
    try {
        const roomRef = database.ref(`anonymous/messages/${roomId}`);

        const roomSnapshot = await roomRef.once('value');
        const roomData = roomSnapshot.val();
        
        return roomData !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const sendMessage = async (roomId, message) => {
    try {
        const messageRef = await database.ref(`anonymous/messages/${roomId}`);
        
        await messageRef.push({
            data: tempoReal,
            message: message,
        });

        return true;

    } catch (error) {
        console.log(error);
        return null;
    }
}


const getMessages = async (roomId) => {
    if (roomId.length !== 6) {
        await Swal({
            title: 'Room ID invalid!',
            icon: 'warning',
        });
        return false;
    }
    try {
        const messagesRef = database.ref(`anonymous/messages/${roomId}`);
        const messagesSnapshot = await messagesRef.once('value');
        const messagesData = messagesSnapshot.val();
        
        if (messagesData) {
            return messagesData;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}



export { database, createRoom, checkRoomExists, sendMessage, getMessages }