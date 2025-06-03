// Inicializa um array vazio para armazenar objetos de usuário.
let usuarios = [];

// Adiciona um ouvinte de evento que dispara quando a página inteira (incluindo estilos, imagens) terminou de carregar.
// 'window' representa a janela do navegador; 'load' é o evento.
// () => {} é uma arrow function contendo o código a ser executado quando o evento ocorrer.
window.addEventListener('load', () => {
    // Remove qualquer status de autenticação existente quando a página de cadastro carrega.
    // Isso garante que um usuário não seja considerado logado nesta página.
    localStorage.removeItem('autenticado');
    localStorage.removeItem('usuarioAutenticado');
}); // Garante que o usuário deixe de estar autenticado quando entrar na página de cadastro.

// Verifica se existem dados de usuários armazenados no localStorage.
if (localStorage.getItem('usuarios')) {
    // Se existirem dados, recupera-os. O localStorage armazena dados como strings.
    // 'JSON.parse()' converte a string JSON de volta para um array/objeto JavaScript.
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    // Itera sobre os usuários carregados (atualmente, este loop tem apenas um console.log comentado).
    usuarios.forEach(element => {
        // console.log(element) // Isso imprimiria cada objeto de usuário no console.
    });
}

// Adiciona um ouvinte de evento ao formulário de cadastro (elemento com ID 'formularioCadastro') para o evento 'submit'.
document.querySelector('#formularioCadastro').addEventListener('submit', function(event) {
    // 'event.preventDefault()' impede o comportamento padrão de submissão do formulário,
    // que normalmente causaria uma recarga da página. Queremos tratar a submissão com JavaScript.
    event.preventDefault();
    // Chama a função 'cadastrar' para processar o registro.
    cadastrar();
});

// Adiciona um ouvinte de evento ao campo de entrada do CPF (ID 'cpf') que dispara a cada 'input' (mudança no valor).
// O comentário original já explica bem esta parte:
// listener de input
// this refere ao elemento que ativa o evento,
// this.value pega o texto que está no campo no momento
// o replace serve para tudo que não seja [0-9] seja substituido por vazio '' // o g é a flag global
// o slice corta o string para 11 caracteres apenas. garantido o limite de caractere
document.querySelector('#cpf').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 11);
});

// Adiciona ouvintes de evento 'input' a vários campos para validação em tempo real.
// Estes chamam funções de filtro específicas quando o usuário digita nesses campos.
document.querySelector('#login').addEventListener('input', filtroLogin);
document.querySelector('#senha').addEventListener('input', filtroSenha);
document.querySelector('#cpf').addEventListener('input', filtroCpf); // CPF também tem o formatador acima.
document.querySelector('#email').addEventListener('input', filtroEmail);

// Função para validar o campo de login em tempo real.
function filtroLogin() {
    const campo = document.querySelector('#login'); // O campo de input do login.
    const span = document.querySelector('#erroLogin'); // O elemento span para exibir erros de login.
    const valor = campo.value.trim(); // Obtém o valor do campo e usa 'trim()' (remove espaços em branco das extremidades).

    // Se o campo estiver vazio após o trim, limpa qualquer mensagem de erro e sai.
    if (!valor) {
        span.textContent = '';
        return;
    }

    // O método 'find' itera sobre o array 'usuarios'.
    // Ele retorna o primeiro elemento 'u' para o qual a condição (u.login === valor) é verdadeira.
    // Se nenhum usuário for encontrado, retorna 'undefined'. Isso verifica se o login já existe.
    const existe = usuarios.find(u => u.login === valor);
    if (existe) {
        span.textContent = 'Esse login já está em uso.'; //
    } else {
        span.textContent = ''; // Limpa o erro se o login estiver disponível.
    }
}

// Função para validar o campo de senha em tempo real.
function filtroSenha() {
    const campo = document.querySelector('#senha'); //
    const span = document.querySelector('#erroSenha'); //
    const valor = campo.value; // Sem trim aqui, pois espaços podem ser intencionais em uma senha.

    if (valor.length < 6) {
        span.textContent = 'A senha deve ter pelo menos 6 caracteres.'; //
    } else {
        span.textContent = ''; //
    }
}

// Função para validar o campo de email em tempo real.
function filtroEmail() {
    const campo = document.querySelector('#email'); //
    const span = document.querySelector('#erroEmail'); //
    const valor = campo.value.trim(); //

    if (!valor) {
        span.textContent = ''; //
        return;
    }

    // Verifica se o email existe (usando 'find', explicado em filtroLogin).
    const existe = usuarios.find(u => u.email === valor);
    if (existe) {
        span.textContent = 'Esse e-mail já está em uso.'; //
    } else {
        span.textContent = ''; //
    }
    // O método 'includes()' verifica se uma string contém outra string especificada.
    // Verificação básica do formato do email (deve conter '@' e '.').
    if (!valor.includes('@') || !valor.includes('.')) {
        span.textContent = 'Insira um email válido.'; //
        return;
    }
}

// Função para validar o campo CPF em tempo real.
function filtroCpf() {
    const campo = document.querySelector('#cpf'); //
    const span = document.querySelector('#erroCpf'); //
    const valor = campo.value.trim(); // O CPF já é formatado para ser apenas dígitos.

    if (!valor) {
        span.textContent = ''; //
        return;
    } else if (valor.length !== 11) { // Verifica se o comprimento do CPF não é exatamente 11. // A condição original `valor.length != 11 || valor.length < 11` é redundante, `valor.length != 11` cobre ambos.
        span.textContent = "O CPF deve possuir 11 caracteres."; //
        return;
    }
    // Verifica se o CPF existe (usando 'find', explicado em filtroLogin).
    const existe = usuarios.find(u => u.cpf === valor);
    if (existe) {
        span.textContent = 'Esse CPF já está cadastrado.'; //
    } else {
        span.textContent = ''; //
    }
}

// Função para limpar todas as mensagens de erro.
function limparErros() {
    // 'document.querySelectorAll('.erro')' seleciona todos os elementos HTML que têm a classe 'erro'.
    // Retorna uma NodeList, e 'forEach' é usado para iterar sobre cada elemento (span) nessa lista.
    document.querySelectorAll('.erro').forEach(span => span.textContent = ''); // Define o conteúdo de texto de cada span de erro como vazio.
}

// Função principal para tratar o cadastro de usuário.
function cadastrar() {
    limparErros(); // Limpa quaisquer mensagens de erro pré-existentes.

    // Obtém os valores dos campos do formulário.
    let salvaLogin = document.querySelector('#login').value;
    // Verifica se o login já existe (usando 'find', que já foi explicado).
    let verificarLogin = usuarios.find(u => u.login === salvaLogin);

    let salvaSenha = document.querySelector('#senha').value; //
    let verificarSenha = salvaSenha.length; // Obtém o comprimento da senha para validação.

    let salvaCpf = document.querySelector('#cpf').value; //
    // Verifica se o CPF já existe.
    let verificarCpf = usuarios.find(u => u.cpf === salvaCpf);

    let salvaEmail = document.querySelector('#email').value; //
    let salvaConfirmacao = document.querySelector('#confirmarEmail').value; //
    // Verifica se o email já existe.
    let verificarEmail = usuarios.find(u => u.email === salvaEmail);

    // let salvaNome = document.querySelector('#nome').value; // Campo nome está comentado.

    // --- VALIDAÇÕES ---
    // Verifica se o email e sua confirmação coincidem.
    if (salvaConfirmacao !== salvaEmail) {
        document.querySelector('#erroConfirmacao').textContent = 'O E-mail de confirmação é diferente do original'; //
        return; // Para a função se não coincidirem.
    }

    // Valida o comprimento e a unicidade do login.
    if (salvaLogin.length < 3) {
        document.querySelector('#erroLogin').textContent = "O login deve conter pelo menos 3 caracteres."; //
        return;
    } else if (verificarLogin) { // Se 'verificarLogin' encontrou um usuário, significa que o login existe.
        document.querySelector('#erroLogin').textContent = "Esse login já está em uso."; //
        return;
    }

    // Valida o comprimento da senha.
    if (verificarSenha < 6) {
        document.querySelector('#erroSenha').textContent = 'A senha deve possuir pelo menos 6 caracteres.'; //
        return;
    }

    // Valida a unicidade e o comprimento do CPF.
    if (verificarCpf) { // Se 'verificarCpf' encontrou um usuário, o CPF existe.
        document.querySelector('#erroCpf').textContent = "Este CPF já está cadastrado."; //
        return;
    }
    // A condição original `salvaCpf.length != 11 || salvaCpf.length < 11` é redundante.
    if (salvaCpf.length !== 11) { // Mesmo que o filtro em tempo real exista, verifica novamente no envio.
        document.querySelector('#erroCpf').textContent = 'O CPF deve possuir 11 caracteres.'; //
        return;
    }

    // Valida a unicidade e o formato do email.
    if (verificarEmail) { // Se 'verificarEmail' encontrou um usuário, o email existe.
        document.querySelector('#erroEmail').textContent = "Esse e-mail está em uso"; //
        return;
    }
    if (!salvaEmail.includes('@') || !salvaEmail.includes('.')) { // Verificação básica do formato do email.
        document.querySelector('#erroEmail').textContent = "Insira um email válido."; //
        return;
    }

    // Se todas as validações passarem:
    // Cria um timestamp para quando o registro ocorreu.
    // 'new Date()' cria um novo objeto de data com a data e hora atuais.
    // '.toLocaleString('pt-BR')' formata esta data/hora em uma string baseada nas convenções do português brasileiro.
    const timestamp = new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: "numeric"
    });

    // Cria um novo objeto de usuário.
    let usuario = {
        login: salvaLogin, //
        senha: salvaSenha, // Armazenar senhas em texto plano é um risco de segurança para aplicações reais! Considere usar hash.
        cpf: salvaCpf, //
        email: salvaEmail, //
        dataRegistro: timestamp, // Data e hora do registro.
        // nome: salvaNome, // Propriedade nome está comentada.
    };

    // Adiciona o novo objeto de usuário ao array 'usuarios'.
    usuarios.push(usuario);
    alert('usuario cadastrado'); //

    // Armazena o array 'usuarios' atualizado no localStorage.
    // 'JSON.stringify()' converte o array JavaScript 'usuarios' (com o novo usuário) em um formato de string JSON,
    // porque o localStorage só pode armazenar strings.
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    // console.log(usuarios); // Opcional: registra a lista atual de usuários no console.
}