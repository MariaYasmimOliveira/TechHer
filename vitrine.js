const SHEETY_API_URL = 'https://api.sheety.co/757ea689c4e59beb0176a0913d8a0f3d/techHer/página1'; 
        const PROJECT_NAME = 'folha1'; 
        
        // Função para Buscar Dados da Planilha
        async function fetchPortfolios() {
            try {
                // Se a URL não estiver configurada, mostramos dados de exemplo
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
                { id: 1, name: "Exemplo: Maria", role: "Dev", bio: "Configure o Sheety para ver seus dados aqui!", tags: "Planilha, Google", portfolioUrl: "#" }
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

                            <div class="flex justify-center items-center gap-4 border-t pt-4 border-palePink">
                                ${item.linkedinUrl ? `<a href="${item.linkedinUrl}" target="_blank" class="text-blue-600"><i data-lucide="linkedin" class="w-5 h-5"></i></a>` : ''}
                                ${item.githubUrl ? `<a href="${item.githubUrl}" target="_blank" class="text-gray-800"><i data-lucide="github" class="w-5 h-5"></i></a>` : ''}
                                <a href="${item.portfolioUrl}" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm bg-sageGreen text-darkNavy hover:opacity-80 transition-all">
                                    <i data-lucide="external-link" class="w-4 h-4"></i> Ver
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                grid.innerHTML += card;
            });
            lucide.createIcons();
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
            body[PROJECT_NAME] = {
                name: document.getElementById('name').value,
                role: document.getElementById('role').value,
                bio: document.getElementById('bio').value,
                image: document.getElementById('image').value,
                portfolioUrl: document.getElementById('portfolioUrl').value,
                linkedinUrl: document.getElementById('linkedinUrl').value,
                githubUrl: document.getElementById('githubUrl').value,
                tags: document.getElementById('tags').value
            };

            try {
                if (SHEETY_API_URL.includes('SEU_ID_AQUI')) {
                    alert("Por favor, configure a URL da sua API Sheety no código!");
                } else {
                    await fetch(SHEETY_API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                    });
                    await fetchPortfolios();
                }
                toggleModal(false);
                this.reset();
            } catch (error) {
                alert("Erro ao salvar dados na planilha. Verifique sua conexão.");
            } finally {
                btn.disabled = false;
                btn.innerHTML = "Publicar Agora";
            }
        });

        window.onload = fetchPortfolios;