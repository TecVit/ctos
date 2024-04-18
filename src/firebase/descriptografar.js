
const descriptografarDados = async () => {
    try {
        
        // Cria um elemento temporário
        const tempElement = await document.querySelector('.dados');
        
        // Seleciona os inputs com classes específicas
        const inputs = tempElement.querySelectorAll('input');

        // Itera sobre os inputs e verifica se contêm as classes desejadas
        inputs.forEach((input) => {
            // Verifica se o input possui alguma das classes desejadas
            if (input.classList.contains('responsavel') || 
                input.classList.contains('aluno') ||
                input.classList.contains('endereco') ||
                input.classList.contains('latitude') ||
                input.classList.contains('longitude')) {
                console.log("Input com classe:", input);
            }
        });

        // Remove o elemento temporário do DOM
        //tempElement.remove();

    } catch (error) {
        console.log(error);
        return false;
    }
}


export { descriptografarDados }