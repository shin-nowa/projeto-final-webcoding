// dados fakes para simular um usuário já logado
// const mockUserData = {
//     nome: "Maria Julia",
//     cpf: "123.456.789-00",
//     dataNascimento: "2005-04-25",
//     email: "julia.maria@gmail.com"
// };

// isso aqui é a parte que puxa do localStorage
let usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
let usuariosJSON = JSON.parse(localStorage.getItem('usuarios')) || [];
let result = usuariosJSON.find(u => u.cpf === usuarioAutenticado);

if(result){
    console.log('Usuario encontrado:', result); // só pra mostrar qual usuario tá logado
}

// seleção e cache dos elementos do DOM que serão manipulados, evitando múltiplas buscas
const form = document.getElementById('profileForm');
const btnEdit = document.getElementById('btnEdit');
const btnSave = document.getElementById('btnSave');
const feedbackMessage = document.getElementById('feedbackMessage');
const displayName = document.getElementById('displayName');
const displayEmail = document.getElementById('displayEmail');
const btnPasswordEdit = document.getElementById('btnPasswordEdit');
const passwordFields = document.getElementById('passwordFields');
const btnSavePassword = document.getElementById('btnSavePassword');

// função para carregar os dados do usuário
function loadUserData() {
    if (!result) {
        showFeedback('Usuário não encontrado. Por favor, faça login novamente.', 'error');
        return;
    }
    
    // atualiza os elementos de exibição principais
    displayName.textContent = result.login;
    displayEmail.textContent = result.email;
    
    // preenche todos os campos do formulário
    document.getElementById('nome').value = result.login;
    document.getElementById('cpf').value = result.cpf;
    document.getElementById('dataRegistro').value = formatarData(result.dataRegistro);
    document.getElementById('email').value = result.email;
}

// função para habilitar a edição dos campos 
function enableEditing() {
    // mostra o formulário com animação
    form.classList.add('active');
    
    // habilita todos os campos exceto CPF
    const inputs = form.getElementsByTagName('input');
    for (let input of inputs) {
        if (input.id !== 'cpf') { // CPF não deve ser editável
            input.disabled = false;
        }
    }
    
    // alterna a visibilidade dos botões
    btnEdit.style.display = 'none';
    btnSave.style.display = 'flex';
}

// função para desabilitar a edição dos campos
function disableEditing() {
    // oculta o formulário com animação
    form.classList.remove('active');
    
    // desabilita todos os campos
    const inputs = form.getElementsByTagName('input');
    for (let input of inputs) {
        input.disabled = true;
    }
    
    // alterna a visibilidade dos botões
    btnEdit.style.display = 'flex';
    btnSave.style.display = 'none';
}

// função para validar os dados do formulário, retorna true se todos os campos estiverem válidos
function validateForm() {
    // obtém os valores dos campos, removendo espaços extras
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const dataRegistro = document.getElementById('dataRegistro').value;
    
    // validação do nome (mínimo 3 caracteres)
    if (nome.length < 3) {
        showFeedback('O nome deve ter pelo menos 3 caracteres', 'error');
        return false;
    }
    
    // validação de email (sempre contém @ e .)
    if (!email.includes('@') || !email.includes('.')) {
        showFeedback('Por favor, insira um email válido', 'error');
        return false;
    }
    
    // validação da data de registro (não pode estar vazia)
    if (!dataRegistro) {
        showFeedback('Por favor, insira uma data de registro', 'error');
        return false;
    }
    
    return true;
}

// Função utilitária para formatar data de AAAA-MM-DD para DD/MM/AAAA ou aceitar DD/MM/AAAA
function formatarData(data) {
    if (!data) return '';
    // Se já estiver no formato DD/MM/AAAA, retorna só a parte da data
    if (/^\d{2}\/\d{2}\/\d{4}/.test(data)) {
        return data.split(',')[0]; // remove a hora se existir
    }
    // Se estiver no formato ISO (AAAA-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}/.test(data)) {
        const [ano, mes, dia] = data.split('T')[0].split('-');
        return `${dia}/${mes}/${ano}`;
    }
    return data;
}

// Função para converter DD/MM/AAAA para AAAA-MM-DD
function paraISO(dataBR) {
    if (!dataBR) return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(dataBR)) return dataBR; // já está em ISO
    const [dia, mes, ano] = dataBR.split('/');
    return `${ano}-${mes}-${dia}`;
}

// função para salvar os dados do usuário
function saveUserData() {
    // só prossegue se a validação passar
    if (!validateForm()) return;
    
    // cria objeto com os dados atuais do formulário
    const userData = {
        login: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        dataRegistro: paraISO(document.getElementById('dataRegistro').value),
        email: document.getElementById('email').value
    };
    
    // tenta salvar no localStorage
    try {
        // Atualiza o usuário na lista de usuários
        const index = usuariosJSON.findIndex(u => u.cpf === usuarioAutenticado);
        if (index !== -1) {
            usuariosJSON[index] = { ...usuariosJSON[index], ...userData };
            localStorage.setItem('usuarios', JSON.stringify(usuariosJSON));
            
            // Atualiza o usuário atual
            result = usuariosJSON[index];
            
            // atualiza os displays principais
            displayName.textContent = userData.login;
            displayEmail.textContent = userData.email;
            
            showFeedback('Dados salvos com sucesso!', 'success');
            disableEditing();
        } else {
            showFeedback('Erro ao atualizar os dados', 'error');
        }
    } catch (error) {
        showFeedback('Erro ao salvar os dados', 'error');
        console.error('Erro ao salvar no localStorage:', error);
    }
}

// função para exibir mensagens de feedback ao usuário
// mostra a mensagem por 3 segundos e depois remove
function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback-message ${type}`;
    
    // remove a mensagem após 3 segundos
    setTimeout(() => {
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';
    }, 3000);
}

// configuração dos event listeners
btnEdit.addEventListener('click', enableEditing);
btnSave.addEventListener('click', saveUserData);

btnPasswordEdit.addEventListener('click', () => {
    passwordFields.style.display = passwordFields.style.display === 'none' ? 'block' : 'none';
});

btnSavePassword.addEventListener('click', () => {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        showFeedback('Preencha todos os campos de senha.', 'error');
        return;
    }
    if (newPassword.length < 6) {
        showFeedback('A nova senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }
    if (newPassword !== confirmPassword) {
        showFeedback('A confirmação da senha não confere.', 'error');
        return;
    }
    if (currentPassword !== result.senha) {
        showFeedback('Senha atual incorreta.', 'error');
        return;
    }
    // Atualiza a senha no localStorage
    const index = usuariosJSON.findIndex(u => u.cpf === usuarioAutenticado);
    if (index !== -1) {
        usuariosJSON[index].senha = newPassword;
        localStorage.setItem('usuarios', JSON.stringify(usuariosJSON));
        result = usuariosJSON[index];
        showFeedback('Senha alterada com sucesso!', 'success');
        passwordFields.style.display = 'none';
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    } else {
        showFeedback('Erro ao atualizar a senha.', 'error');
    }
});

// inicialização, ou seja, carrega os dados quando a página é carregada
document.addEventListener('DOMContentLoaded', loadUserData);