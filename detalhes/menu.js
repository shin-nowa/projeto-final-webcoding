// Aguarda o documento HTML ser completamente carregado e analisado antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {
    // Obtém o elemento do botão do menu hamburger pelo seu ID.
    const hamburgerButton = document.getElementById('hamburgerMenu');
    // Obtém o contêiner dos links de navegação pelo seu ID.
    const navigationLinks = document.getElementById('navigationLinks');

    // Verifica se tanto o botão hamburger quanto o contêiner dos links de navegação existem no DOM.
    if (hamburgerButton && navigationLinks) {
        // Adiciona um ouvinte de evento ao botão hamburger que é acionado no clique.
        hamburgerButton.addEventListener('click', () => {
            // Alterna a classe 'active' no contêiner dos links de navegação.
            // Esta classe é tipicamente usada no CSS para mostrar ou esconder o menu.
            navigationLinks.classList.toggle('active');

            // Atualiza o atributo 'aria-expanded' para acessibilidade.
            // Ele informa aos leitores de tela se o menu está atualmente expandido ou recolhido.
            const isExpanded = navigationLinks.classList.contains('active');
            hamburgerButton.setAttribute('aria-expanded', String(isExpanded));

            // Opcional: Alterna o ícone do hamburger entre 'bars' (menu) e 'times' (fechar - X).
            // Isso assume que você está usando ícones do Font Awesome (tag <i> com classes fa-bars/fa-times).
            const icon = hamburgerButton.querySelector('i'); // Encontra o elemento <i> dentro do botão.
            if (icon) {
                if (isExpanded) {
                    // Se o menu está expandido, muda o ícone para 'times' (X) e atualiza o aria-label.
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    hamburgerButton.setAttribute('aria-label', 'Fechar menu');
                } else {
                    // Se o menu está recolhido, muda o ícone de volta para 'bars' e atualiza o aria-label.
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    hamburgerButton.setAttribute('aria-label', 'Abrir menu');
                }
            }
        });
    }
    // --- NOVO CÓDIGO PARA HABILITAR/DESABILITAR LINKS DE AUTENTICAÇÃO ---
    // Obtém referências para os links de navegação de Login, Cadastro e Perfil.
    const navLoginLink = document.getElementById('navLogin');
    const navCadastroLink = document.getElementById('navCadastro');
    const navPerfilLink = document.getElementById('navPerfil');

    // Verifica o status de autenticação no localStorage.
    // 'localStorage' permite que aplicações web armazenem dados localmente no navegador do usuário.
    // Está verificando se um item 'autenticado' está definido como 'true'.
    const isAuthenticated = localStorage.getItem('autenticado') === 'true';

    if (isAuthenticated) {
        // Usuário está LOGADO: desabilitar Login e Cadastro, habilitar Perfil.

        if (navLoginLink) {
            // Adiciona a classe 'disabled-link' (presumivelmente para estilizá-lo como desabilitado).
            navLoginLink.classList.add('disabled-link');
            // Remove o atributo 'href' para impedir a navegação.
            navLoginLink.removeAttribute('href');
            // Se o link de login estava marcado como ativo, remove essa classe também.
            navLoginLink.classList.remove('active');
        }
        if (navCadastroLink) {
            navCadastroLink.classList.add('disabled-link'); //
            navCadastroLink.removeAttribute('href'); //
            navCadastroLink.classList.remove('active'); //
        }
        if (navPerfilLink) {
            // Remove a classe 'disabled-link' para habilitá-lo.
            navPerfilLink.classList.remove('disabled-link');
            // Garante que o atributo 'href' esteja presente se foi removido anteriormente.
            if (!navPerfilLink.hasAttribute('href')) {
                navPerfilLink.setAttribute('href', './perfil.html');
            }
        }
    } else {
        // Usuário está DESLOGADO: habilitar Login e Cadastro, desabilitar Perfil.

        if (navLoginLink) {
            navLoginLink.classList.remove('disabled-link'); //
            // Garante que o atributo 'href' esteja presente.
            if (!navLoginLink.hasAttribute('href')) {
                navLoginLink.setAttribute('href', './login.html');
            }
        }
        if (navCadastroLink) {
            navCadastroLink.classList.remove('disabled-link'); //
            if (!navCadastroLink.hasAttribute('href')) {
                navCadastroLink.setAttribute('href', './cadastro.html');
            }
        }
        if (navPerfilLink) {
            navPerfilLink.classList.add('disabled-link'); //
            navPerfilLink.removeAttribute('href'); //
            navPerfilLink.classList.remove('active'); //
        }
    }
});