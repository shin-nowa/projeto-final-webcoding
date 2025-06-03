document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburgerMenu');
    const navigationLinks = document.getElementById('navigationLinks');

    if (hamburgerButton && navigationLinks) {
        hamburgerButton.addEventListener('click', () => {
            // Alterna a classe .active no menu de navegação
            navigationLinks.classList.toggle('active');

            // Atualiza o atributo aria-expanded para acessibilidade
            const isExpanded = navigationLinks.classList.contains('active');
            hamburgerButton.setAttribute('aria-expanded', String(isExpanded));

            // Opcional: Alterna o ícone do hamburger entre 'bars' e 'times' (X)
            const icon = hamburgerButton.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    hamburgerButton.setAttribute('aria-label', 'Fechar menu');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    hamburgerButton.setAttribute('aria-label', 'Abrir menu');
                }
            }
        });
    }
    // --- NOVO CÓDIGO PARA HABILITAR/DESABILITAR LINKS DE AUTENTICAÇÃO ---
    const navLoginLink = document.getElementById('navLogin');
    const navCadastroLink = document.getElementById('navCadastro');
    const navPerfilLink = document.getElementById('navPerfil');

    // Verifica o status de autenticação no localStorage
    const isAuthenticated = localStorage.getItem('autenticado') === 'true';

    if (isAuthenticated) {
        // Usuário está LOGADO: desabilitar Login e Cadastro, habilitar Perfil

        if (navLoginLink) {
            navLoginLink.classList.add('disabled-link');
            navLoginLink.removeAttribute('href'); // Remove a funcionalidade de link
            // Se o link de login estava ativo, remove a classe active também
            navLoginLink.classList.remove('active');
        }
        if (navCadastroLink) {
            navCadastroLink.classList.add('disabled-link');
            navCadastroLink.removeAttribute('href');
            navCadastroLink.classList.remove('active');
        }
        if (navPerfilLink) {
            navPerfilLink.classList.remove('disabled-link');
            // Garante que o href está presente se ele foi removido anteriormente
            if (!navPerfilLink.hasAttribute('href')) {
                navPerfilLink.setAttribute('href', './perfil.html');
            }
        }
    } else {
        // Usuário está DESLOGADO: habilitar Login e Cadastro, desabilitar Perfil

        if (navLoginLink) {
            navLoginLink.classList.remove('disabled-link');
            if (!navLoginLink.hasAttribute('href')) {
                navLoginLink.setAttribute('href', './login.html');
            }
        }
        if (navCadastroLink) {
            navCadastroLink.classList.remove('disabled-link');
            if (!navCadastroLink.hasAttribute('href')) {
                navCadastroLink.setAttribute('href', './cadastro.html');
            }
        }
        if (navPerfilLink) {
            navPerfilLink.classList.add('disabled-link');
            navPerfilLink.removeAttribute('href');
            navPerfilLink.classList.remove('active');
        }};
    })