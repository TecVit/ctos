import firebase from 'firebase/compat/app';
import { firebaseConfigCFPs } from './firebaseConfig';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getCookie, limparCookies, setCookie, deleteCookie } from './cookies';
import Swal from 'sweetalert';

const firebaseCPFs = firebase.initializeApp(firebaseConfigCFPs, 'CPFs');
const dbCPFs = firebaseCPFs.firestore();


function restringirDado(dado) {
    
    if (typeof dado !== 'string') {
        console.log('Por favor, forneça uma string como entrada.');
        return;
    } if (dado.length === 1) {
        return 'x';
    }

    const caracteresAMostrar = Math.ceil(dado.length / 2);

    if (dado.length <= caracteresAMostrar) {
        return dado;
    }

    let restrita = dado.substring(0, caracteresAMostrar);

    for (let i = caracteresAMostrar; i < dado.length; i++) {
        if (dado[i] === ' ') {
            restrita += ' ';
        } else if (dado[i] === '/') {
            restrita += '/';
        } else {
            restrita += 'x';
        }
    }

    return restrita;
}

const searchCPF = async (cpf) => {
    if (!cpf) {
        await Swal({
            title: 'Enter a CPF!',
            icon: 'warning',
        });
        return false;
    }
    if (cpf.length < 11) {
        await Swal({
            title: 'CPF less than 11 digits!',
            icon: 'warning',
        });
        return false;
    } 
    if (cpf.length > 11) {
        await Swal({
            title: 'CPF greater than 11 digits!',
            icon: 'warning',
        });
        return false;
    }
    try {
        const docCpf = await dbCPFs.collection('cpfs').doc(cpf);
        const docCpfExists = await docCpf.get();
        if (docCpfExists.exists) {
/*
            // PEGAR TODOS OS DADOS
            const dados = docCpfExists.data();
            Object.keys(dados).forEach((key) => {
                // Adicionar o campo e seu valor ao objeto de dados
                dadosObj[key] = dados[key];
            });*/

            const dadosObj = {};
            const val = docCpfExists.data();
            
            // COLETAR SOMENTE O PERMITIDO
            dadosObj['NomeResponsavel'] = restringirDado(val.NomeResponsavel);
            dadosObj['CpfResponsavel'] = restringirDado(val.CpfResponsavel);
            dadosObj['RgResponsavel'] = restringirDado(val.RgResponsavel);
            dadosObj['DigRgResponsavel'] = restringirDado(val.DigRgResponsavel);
            dadosObj['DataNascimento'] = restringirDado(val.DataNascimento);

            return dadosObj;

        } else {
            await Swal({
                title: 'CPF not registered in the database!',
                icon: 'error',
            });
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { searchCPF }
