const SHEETY_API_URL = 'https://api.sheety.co/757ea689c4e59beb0176a0913d8a0f3d/techHer/pagina1'; 
const PROJECT_NAME = 'pagina1'; 
        
// Função para Buscar Dados da Planilha
async function fetchPortfolios() {
    try {
        if (SHEETY_API_URL.includes('SEU_ID_AQUI')) {
            console.warn("Atenção: Configure a URL do Sheety para salvar dados reais.");
            return showMockData();
        }

        const response = await fetch(SHEETY_API_URL);
        const data = await response.json();
        
        renderCards(data[PROJECT_NAME] || []);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        showMockData();
    } finally {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('portfolio-grid').classList.remove('hidden');
    }
}

// Dados de Exemplo (caso a API falhe ou não esteja configurada)
function showMockData() {
    const mock = [
        { id: 1, name: "Exemplo: Maria", role: "Dev", bio: "Configure o Sheety para ver seus dados aqui!", tags: "Planilha, Google", portfoliourl: "#" }
    ];
    renderCards(mock);
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('portfolio-grid').classList.remove('hidden');
}

// Função para Renderizar Cards
function renderCards(list) {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';

    list.forEach(item => {
        const tagsList = typeof item.tags === 'string' ? item.tags.split(',') : (item.tags || []);
        const tagsHtml = tagsList.map(tag => `
            <span class="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded" style="background-color: #C7B7C8; color: #612D53;">
                ${tag.trim()}
            </span>
        `).join('');

        const card = `
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-mutedLavender">
                <div class="h-20 bg-deepPlum"></div>
                <div class="px-6 pb-6 -mt-10 text-center">
                    <img 
                        src="${item.image || 'https://ui-avatars.com/api/?name=' + item.name + '&background=9EC7C5&color=fff'}" 
                        class="w-20 h-20 rounded-full mx-auto border-4 border-white object-cover shadow-md mb-3 bg-white"
                        onerror="this.src='https://ui-avatars.com/api/?name=${item.name}&background=9EC7C5&color=fff'"
                    >
                    <h3 class="text-xl font-bold text-darkNavy">${item.name}</h3>
                    <p class="text-xs font-semibold mb-3 px-3 py-1 rounded-full inline-block bg-palePink text-berryPink uppercase tracking-tight">
                        ${item.role}
                    </p>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2 italic">"${item.bio}"</p>
                    
                    <div class="flex flex-wrap justify-center gap-1 mb-6">
                        ${tagsHtml}
                    </div>

                    <div class="flex justify-center items-center gap-5 border-t pt-4 border-palePink">
                        ${item.linkedinurl ? `
                            <a href="${item.linkedinurl}" target="_blank" class="hover:scale-110 transition-transform" title="LinkedIn">
                                <svg class="w-6 h-6 fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        ` : ''}
                        
                        ${item.githuburl ? `
                            <a href="${item.githuburl}" target="_blank" class="hover:scale-110 transition-transform" title="GitHub">
                                <svg class="w-6 h-6 fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                </svg>
                            </a>
                        ` : ''}
                        
                        <a href="${item.portfoliourl || item.portfiliourl || '#'}" target="_blank" class="flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm bg-sageGreen text-slate-900 hover:opacity-80 transition-all">
                            <svg class="w-4 h-4 fill-none stroke-slate-900 stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                            </svg>
                            Ver
                        </a>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function toggleModal(show) {
    document.getElementById('modal').classList.toggle('hidden', !show);
}

document.getElementById('portfolio-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    btn.disabled = true;
    btn.innerHTML = "A publicar...";

    const body = {};
    body["pagina1"] = {
        name: document.getElementById('name').value,
        role: document.getElementById('role').value,
        bio: document.getElementById('bio').value,
        image: document.getElementById('image').value,
        portfoliourl: document.getElementById('portfolioUrl').value,
        linkedinurl: document.getElementById('linkedinUrl').value,
        githuburl: document.getElementById('githubUrl').value,
        tags: document.getElementById('tags').value
    };

    try {
        if (SHEETY_API_URL.includes('SEU_ID_AQUI')) {
            alert("Por favor, configure a URL da sua API Sheety no código!");
        } else {
            const response = await fetch(SHEETY_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                throw new Error("Erro na resposta do Sheety");
            }

            await fetchPortfolios();
        }
        toggleModal(false);
        this.reset();
    } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro ao salvar dados na planilha. Verifique sua conexão ou cabeçalhos.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = "Publicar Agora";
    }
});

window.onload = fetchPortfolios;