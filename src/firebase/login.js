import firebase from 'firebase/compat/app';
import { firebaseConfig, firebaseConfigCFPs } from './firebaseConfig';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getCookie, limparCookies, setCookie, deleteCookie } from './cookies';
import Swal from 'sweetalert';

const firebaseDefault = firebase.initializeApp(firebaseConfig, 'Default');
const db = firebaseDefault.firestore();
const auth = firebaseDefault.auth();

const firebaseCPFs = firebase.initializeApp(firebaseConfigCFPs, 'CPFs');
const dbCPFs = firebaseCPFs.firestore();

const logar = async (email, senha) => {
    try {
        const fazerLogin = await loginAuth(email, senha);
        if (fazerLogin) {
            setCookie('email', email);
            setCookie('senha', senha);
            window.location.href = "/software/";
        }
    } catch (error) {
        console.log(error);
    }
}

const loginAuth = async (email, senha) => {
    try {
        const userAuth = await auth.signInWithEmailAndPassword(email, senha);
        if (userAuth) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        const erro = error.code;
        if (erro === 'auth/invalid-email') {
            Swal({
                title: 'Email incorreto!',
                icon: 'error',
            });
        } else if (erro === 'auth/missing-password') {
            Swal({
                title: 'A senha não deve estar vazia!',
                icon: 'error',
            });
        } else if (erro === 'auth/invalid-credential') {
            Swal({
                title: 'Email ou Senha incorretos!',
                icon: 'error',
            });
        }
        return false;
    }
}

export { db, auth, dbCPFs, logar, loginAuth }