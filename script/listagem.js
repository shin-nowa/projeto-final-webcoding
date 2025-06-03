let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const userListElement = document.querySelector("#user-list tbody");
const formEdicao = document.querySelector("#form-edicao");
const editLoginInput = document.querySelector("#edit-login");
const editCpfInput = document.querySelector("#edit-cpf");
const editSenhaInput = document.querySelector("#edit-senha");
const editEmailInput = document.querySelector("#edit-email");
const editDataRegistroInput = document.querySelector("#edit-data-registro");
const salvarEdicaoButton = document.querySelector("#salvar-edicao");
const cancelarEdicaoButton = document.querySelector("#cancelar-edicao");
const searchInput = document.getElementById('search-input');

let indiceEdicao = -1;

function renderizarTabela(listaDeUsuarios) {
    userListElement.innerHTML = '';
    listaDeUsuarios.forEach((usuario, indice) => {
        const tr = document.createElement('tr');
        ['login', 'cpf', 'senha', 'email', 'dataRegistro'].forEach(campo => {
            const td = document.createElement('td');
            td.textContent = usuario[campo];
            tr.appendChild(td);
        });

        const tdAcoes = document.createElement('td');
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.addEventListener('click', () => editarUsuario(indice));
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', () => excluirUsuario(indice));
        tdAcoes.appendChild(botaoEditar);
        tdAcoes.appendChild(botaoExcluir);
        tr.appendChild(tdAcoes);

        userListElement.appendChild(tr);
    });
}

function renderizarLista() {
    renderizarTabela(usuarios);
}

function editarUsuario(indice) {
    indiceEdicao = indice;
    const usuarioParaEditar = usuarios[indice];

    editLoginInput.value = usuarioParaEditar.login;
    editCpfInput.value = usuarioParaEditar.cpf;
    editSenhaInput.value = usuarioParaEditar.senha;
    editEmailInput.value = usuarioParaEditar.email;
    editDataRegistroInput.value = usuarioParaEditar.dataRegistro;

    formEdicao.style.display = 'block';
}

function excluirUsuario(indice) {
    usuarios.splice(indice, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    renderizarLista();
}

salvarEdicaoButton.addEventListener('click', () => {
    if (indiceEdicao !== -1) {
        usuarios[indiceEdicao] = {
            login: editLoginInput.value,
            cpf: editCpfInput.value,
            senha: editSenhaInput.value,
            email: editEmailInput.value,
            dataRegistro: editDataRegistroInput.value,
        };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderizarLista();
        formEdicao.style.display = 'none';
        indiceEdicao = -1;
    }
});

cancelarEdicaoButton.addEventListener('click', () => {
    formEdicao.style.display = 'none';
    indiceEdicao = -1;
});

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const filtro = event.target.value.toLowerCase();
        const usuariosFiltrados = usuarios.filter(usuario =>
            usuario.login.toLowerCase().includes(filtro) || usuario.cpf.includes(filtro)
        );
        renderizarTabela(usuariosFiltrados);
    });
} else {
    console.error("Elemento com ID 'search-input' não encontrado no DOM.");
}

renderizarLista();