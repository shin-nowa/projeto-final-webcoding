let usuarios = []

if(localStorage.getItem('usuarios')){
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}
let inputLogin = document.querySelector('#login'); // cria uma variavel para os inputs, é usado no eventlistener
let inputSenha = document.querySelector('#senha');

[inputSenha, inputLogin].forEach(input => {
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        logar();
    }});});

localStorage.removeItem('autenticado');
localStorage.removeItem('usuarioAutenticado');

function logar(){
    let login = document.querySelector('#login').value
    let senha = document.querySelector('#senha').value
    let filtro = usuarios.filter((element)=>{
        return element.login === login && element.senha == senha;
    })
    if(login === '' || senha === ''){
        document.querySelector('#erroSenha').textContent = "Não pode estar vazio"
        return
    }
    let filtroLogin = usuarios.find(u => u.login === login && u.senha === senha)
    if(filtroLogin){
        localStorage.setItem('autenticado', 'true'); // marca como verdadeiro a autenticação do usuario.
        localStorage.setItem('usuarioAutenticado', filtroLogin.cpf); // marca o login do usuario autenticado
        document.querySelector('#erroSenha').textContent = "Usuário autenticado, redirecionando..."
        document.querySelector('#erroSenha').style.color = '#65f55b'
        setInterval(()=>{
        location.href = '../home.html'
        }, 2000)
        // window.location.href = 'perfil.html';
    }else{
        document.querySelector('#erroSenha').textContent = "Usuário ou senha incorretos."
    }
    console.log(filtro.length)
    if(filtro.length > 0){
        // alert('usuário autenticado')
    }else{
        // alert('usuário ou senha incorretos')
    }

// if (localStorage.getItem('autenticado') !== 'true') {
//   document.getElementById('perfil').disabled = true;
// }
}