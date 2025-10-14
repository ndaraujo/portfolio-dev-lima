// Seleciona os elementos do DOM
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-list');

// Adiciona um "escutador" de evento de clique ao menu hambúrguer
hamburgerMenu.addEventListener('click', () => {
    // Alterna a classe 'active' no menu hambúrguer (para animar o "X")
    hamburgerMenu.classList.toggle('active');
    
    // Alterna a classe 'active' na lista de navegação (para mostrar/esconder o menu)
    navList.classList.toggle('active');
});

// ----- NOVO CÓDIGO PARA A ANIMAÇÃO DO SCROLLER -----

const scroller = document.querySelector('.scroller');

// Se o scroller existir na página, executa a função
if (scroller) {
    const scrollerInner = scroller.querySelector('.scroller__inner');
    const scrollerContent = Array.from(scrollerInner.children);

    // Duplica os itens para criar o efeito de loop infinito
    scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        // Adiciona um atributo para escondê-lo de leitores de tela
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerInner.appendChild(duplicatedItem);
    });
}

// ----- NOVA LÓGICA PARA O FORMULÁRIO E ALERTA PERSONALIZADO -----

// Seleciona os elementos do formulário e do alerta
const contactForm = document.querySelector('.contact-form');
const customAlert = document.getElementById('custom-alert');
const closeAlertBtn = document.querySelector('.close-alert-btn');

// Função que será chamada ao enviar o formulário
async function handleFormSubmit(event) {
    // 1. Previne o comportamento padrão do formulário (que é recarregar a página)
    event.preventDefault();

    // 2. Coleta os dados do formulário
    const formData = new FormData(contactForm);

    try {
        // 3. Envia os dados em segundo plano para o serviço (StaticForms)
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        // 4. Se o envio foi bem-sucedido...
        if (response.ok) {
            // Mostra o alerta personalizado
            customAlert.classList.add('active');
            // Limpa os campos do formulário
            contactForm.reset();
        } else {
            // Se o serviço retornar um erro, mostra um alerta padrão
            alert('Houve um erro no servidor. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        // Se houver um erro de rede, mostra um alerta padrão
        console.error('Erro de rede:', error);
        alert('Falha na conexão. Por favor, verifique sua internet e tente novamente.');
    }
}

// 5. Adiciona o "escutador" de evento ao formulário
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// 6. Função para fechar o alerta ao clicar no botão 'X'
if (closeAlertBtn) {
    closeAlertBtn.addEventListener('click', () => {
        customAlert.classList.remove('active');
    });
}

// 7. (Opcional) Função para fechar o alerta ao clicar fora da caixa
if (customAlert) {
    customAlert.addEventListener('click', (event) => {
        // Se o clique foi no fundo escuro (overlay) e não na caixa branca...
        if (event.target === customAlert) {
            customAlert.classList.remove('active');
        }
    });
}