let usuarios = []

window.addEventListener('load', () => { // window representa a janela do navegador, load é o evento de carregar a página, e () =>{} é uma arrow function, td que esta nela sera executado quando o evento acontecer.
    localStorage.removeItem('autenticado');
    localStorage.removeItem('usuarioAutenticado');
}); // Garante que o usuario deixe de estar autenticado quando entrar na página de cadastro.

if(localStorage.getItem('usuarios')){
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
    usuarios.forEach(element => {
        // console.log(element)
    });
}

//event listener para a tecla enter

document.querySelector('#formularioCadastro').addEventListener('submit', function(event){
    event.preventDefault();
    cadastrar();
});

// event listener para corrigir o cpf para 11 caracteres, mesmo que o preenchimento haja pontos e traços
document.querySelector('#cpf').addEventListener('input', function () { //listener de input 
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 11);; 
    // this refere ao elemento que ativa o evento, 
    // this.value pega o texto que está no campo no momento
    //o replace serve para tudo que não seja [0-9] seja substituido por vazio '' // o g é a flag global
    // o slice corta o string para 11 caracteres apenas. garantido o limite de caractere
});

//verificações com keyup

document.querySelector('#login').addEventListener('input', filtroLogin);
document.querySelector('#senha').addEventListener('input', filtroSenha);
document.querySelector('#cpf').addEventListener('input', filtroCpf);
document.querySelector('#email').addEventListener('input', filtroEmail);

function filtroLogin(){
    const campo = document.querySelector('#login')
    const span = document.querySelector('#erroLogin')
    const valor = campo.value.trim()

    if (!valor){
        span.textContent = ''
        return
    }

    const existe = usuarios.find(u => u.login === valor)
    if(existe){
        span.textContent = 'Esse login já está em uso.'
    }else{
        span.textContent = '' 
    }
}
function filtroSenha(){
    const campo = document.querySelector('#senha')
    const span = document.querySelector('#erroSenha')
    const valor = campo.value

    if(valor.length < 6){
        span.textContent = 'A senha deve ter pelo menos 6 caracteres.'
    }else{
        span.textContent = ''
    }
}
function filtroEmail(){
    const campo = document.querySelector('#email')
    const span = document.querySelector('#erroEmail')
    const valor = campo.value.trim()

    if (!valor){
        span.textContent = ''
        return
    }

    const existe = usuarios.find(u => u.email === valor) // verificar se o email existe
    if(existe){
        span.textContent = 'Esse e-mail já está em uso.'
    }else{
        span.textContent = '' 
    }
    if(!valor.includes('@') || !valor.includes('.')){
        span.textContent = 'Insira um email válido.'
        return
    }
}
function filtroCpf(){
    const campo = document.querySelector('#cpf')
    const span = document.querySelector('#erroCpf')
    const valor = campo.value.trim()

    if (!valor){
        span.textContent = ''
        return
    }else if(valor.length != 11 || valor.length < 11){
        span.textContent = "O CPF deve possuir 11 caracteres."
        return
    }
    const existe = usuarios.find(u => u.cpf === valor)
    if(existe){
        span.textContent = 'Esse CPF já está cadastrado.'
    }else{
        span.textContent = '' 
    }
}

function limparErros(){
    document.querySelectorAll('.erro').forEach(span => span.textContent = '')
}

function cadastrar(){
    limparErros()

    let salvaLogin = document.querySelector('#login').value
    let verificarLogin = usuarios.find(u=>u.login === salvaLogin)

    let salvaSenha = document.querySelector('#senha').value
    let verificarSenha = salvaSenha.length

    let salvaCpf = document.querySelector('#cpf').value
    let verificarCpf = usuarios.find(u=>u.cpf === salvaCpf)

    let salvaEmail = document.querySelector('#email').value
    let salvaConfirmacao = document.querySelector('#confirmarEmail').value
    let verificarEmail = usuarios.find(u=>u.email === salvaEmail)

    // let salvaNome = document.querySelector('#nome').value

    if(salvaConfirmacao != salvaEmail){
       document.querySelector('#erroConfirmacao').textContent = 'O E-mail de confirmação é diferente do original'
       return;
    }

    if(salvaLogin.length < 3){
        document.querySelector('#erroLogin').textContent = "O login deve conter pelo menos 3 caracteres."
        return
    }else if(verificarLogin){
        document.querySelector('#erroLogin').textContent = "Esse login já está em uso."
        return
    }
    if(verificarSenha < 6){
        document.querySelector('#erroSenha').textContent = 'A senha deve possuir pelo menos 6 caracteres.'
        return
    }
    if(verificarCpf){
        document.querySelector('#erroCpf').textContent = "Este CPF já está cadastrado."
        return
    }
    if(salvaCpf.length != 11 || salvaCpf.length < 11){
        document.querySelector('#erroCpf').textContent = 'O CPF deve possuir 11 caracteres.'
        return
    }

    if(verificarEmail){
        document.querySelector('#erroEmail').textContent = "Esse e-mail está em uso"
        // alert('Email já está em uso.');
        return;
    }

    if(!salvaEmail.includes('@') || !salvaEmail.includes('.')){
        document.querySelector('#erroEmail').textContent = "Insira um email válido."
        return
    }
    
    const timestamp = new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: "numeric"
    }); //cria a timestamp e converte ela para o sistema de lingua brasileira

    // console.log(filtroLogin)
    let usuario = {
        login: salvaLogin,
        senha: salvaSenha,
        cpf: salvaCpf,
        email: salvaEmail,
        dataRegistro: timestamp,
        // nome: salvaNome,
    }
    usuarios.push(usuario)
    alert('usuario cadastrado')
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    // console.log(usuarios)
}