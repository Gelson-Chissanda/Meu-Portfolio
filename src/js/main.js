class ProjectCardManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.projects = [];
    }
    
    setProjects(projects) {
        this.projects = projects;
        this.render();
    }

    createCard(project) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div>
                <span class="title">${project.title}</span>
            </div>
            <div class="links">
                <a href="${project.repoUrl}" target="_blank">
                    Ver repositório
                    <ion-icon name="logo-github"></ion-icon>
                </a>
                <a href="${project.webUrl}" target="_blank">
                    Web
                    <ion-icon name="globe-outline"></ion-icon>
                </a>
            </div>
        `;
        return card;
    }

    render() {
        if (!this.container) return;
        this.container.innerHTML = '';
        this.projects.forEach(project => {
            const card = this.createCard(project);
            this.container.appendChild(card);
        });
    }
}

// Modal logic
const overlay = document.querySelector('.overlay');
const projectModal = document.querySelector('#project-modal');
const closeModalBtn = document.querySelector('#close-modal');

function openProjectModal(project) {
    if (overlay) overlay.classList.remove('hidden');
    if (projectModal) {
        projectModal.classList.remove('hidden');
        // Atualiza o conteúdo do modal conforme o projeto clicado
        const title = projectModal.querySelector('.project-title');
        const desc = projectModal.querySelector('.modal-body p');
        const thumbnail = projectModal.querySelector("#thumbnail img");
        const repoLink = projectModal.querySelector('.modal-footer .links a');
        const webLink = projectModal.querySelector('.modal-footer .links a + a');
        if (title) title.textContent = project.title;
        if (desc) desc.textContent = project.description || '';
        if (thumbnail) thumbnail.setAttribute('src', project.thumbnail);
        if (repoLink) repoLink.setAttribute('href', project.repoUrl);
        if (webLink) webLink.setAttribute('href', project.webUrl);
    }
}

function closeProjectModal() {
    if (overlay) overlay.classList.add('hidden');
    if (projectModal) {
        projectModal.classList.add('hidden');
    }
}

// Attach click event to each card after rendering
function attachCardEvents() {
    const cards = document.querySelectorAll('.card-list .card');
    cards.forEach((card, idx) => {
        card.addEventListener('click', () => openProjectModal(manager.projects[idx]));
    });
}

// Re-attach events after rendering cards
const manager = new ProjectCardManager('.card-list');
const originalRender = manager.render.bind(manager);
manager.render = function() {
    originalRender();
    attachCardEvents();
};

manager.setProjects([
    {
        title: 'eBay best price tracker',
        repoUrl: '#',
        webUrl: '#',
        thumbnail: "https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg",
        description: 'Um projeto que visa ajudar os usuários a encontrar o melhor preço de produtos no eBay. O projeto utiliza Python para fazer scraping de dados do site e apresentar as informações de forma clara e concisa.'
    },
    {
        title: "Pidiri online shop",
        repoUrl:"#",
        webUrl: "https://pidiri.online",
        thumbnail: "https://theacsi.org/wp-content/uploads/2022/01/acsi-supermarket-industry-scaled.jpg",
        description: "Um supermercado online com uma variedade de produtos essenciais."
    },
    {
        title: "Reactjs Movie App",
        repoUrl:"https://github.com/ImaCod3r/reactjs-movie-app",
        webUrl: "https://reactjs-movie-app-omega.vercel.app",
        thumbnail: "https://github.com/ImaCod3r/reactjs-movie-app/raw/main/public/readme/hero.png",
        description: "Uma webApp que oferece um catalogo de filmes, com classificação, e sistema de busca."
    },
    {
        title: "Dudu Whatsapp Bot",
        repoUrl:"https://github.com/ImaCod3r/Dudu-whatsapp-bot",
        webUrl: "#",
        thumbnail: "https://connect.lime-technologies.com/wp-content/uploads/2025/03/whatsapp-bots-whatsapp-bots.png",
        description: "O Dudu é um bot do whatsapp que permite reconhecer música através de mensagens de aúdio - entregando o título e a capa da música. Ele também oferece a opção de baixar a música diretamente no whatsapp."
    },
]);

if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
if (overlay) overlay.addEventListener('click', closeProjectModal);

// Theme switch logic
const switchThemeBtn = document.getElementById('switch-theme');
const body = document.body;

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || getSystemTheme();
    if (theme === 'light') {
        body.classList.add('light-theme');
        switchThemeBtn.innerHTML = '<ion-icon name="moon"></ion-icon>';
    } else {
        body.classList.remove('light-theme');
        switchThemeBtn.innerHTML = '<ion-icon name="sunny"></ion-icon>';
    }
}

function switchTheme() {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        switchThemeBtn.innerHTML = '<ion-icon name="sunny"></ion-icon>';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        switchThemeBtn.innerHTML = '<ion-icon name="moon"></ion-icon>';
        localStorage.setItem('theme', 'light');
    }
}


loadTheme();
switchThemeBtn.addEventListener('click', switchTheme);