// Основной JavaScript файл TIREKCARE

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMobileMenu();
    initChat();
    initAuthForms();
    initVideoFilters();
    initFAQ();
    initAnimations();
});

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Чат поддержки
function initChat() {
    const chatBtn = document.getElementById('chat-btn');
    const chatModal = document.getElementById('chat-modal');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatBtn && chatModal) {
        chatBtn.addEventListener('click', function() {
            chatModal.classList.remove('hidden');
        });
        
        closeChat.addEventListener('click', function() {
            chatModal.classList.add('hidden');
        });
        
        // Отправка сообщения
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Добавление сообщения пользователя
                const userMessage = document.createElement('div');
                userMessage.className = 'bg-accent bg-opacity-20 p-3 rounded-lg mb-3 ml-8';
                userMessage.innerHTML = `<p class="text-sm">${message}</p>`;
                chatMessages.appendChild(userMessage);
                
                // Очистка поля ввода
                chatInput.value = '';
                
                // Прокрутка вниз
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Имитация ответа (в реальном приложении будет обращение к серверу)
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'bg-gray-100 p-3 rounded-lg mb-3';
                    botMessage.innerHTML = '<p class="text-sm">Спасибо за ваше сообщение! Наш специалист ответит вам в ближайшее время. 😊</p>';
                    chatMessages.appendChild(botMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        sendMessage.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
        
        // Закрытие модального окна при клике вне его
        chatModal.addEventListener('click', function(e) {
            if (e.target === chatModal) {
                chatModal.classList.add('hidden');
            }
        });
    }
}

// Формы авторизации
function initAuthForms() {
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerLink = document.getElementById('register-link');
    
    if (showRegister && registerForm && loginForm) {
        showRegister.addEventListener('click', function() {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            registerLink.classList.remove('hidden');
        });
    }
    
    if (showLogin && registerForm && loginForm) {
        showLogin.addEventListener('click', function() {
            registerForm.classList.add('hidden');
            registerLink.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }
    
    // Обработка форм
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Имитация входа
            showNotification('Успешный вход! Перенаправление...', 'success');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Имитация регистрации
            showNotification('Регистрация успешна! Добро пожаловать!', 'success');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
    }
}

// Фильтры видео
function initVideoFilters() {
    const ageFilter = document.getElementById('age-filter');
    const categoryFilter = document.getElementById('category-filter');
    const durationFilter = document.getElementById('duration-filter');
    const resetFilters = document.getElementById('reset-filters');
    const videoCards = document.querySelectorAll('.video-card');
    
    function filterVideos() {
        const ageValue = ageFilter?.value || '';
        const categoryValue = categoryFilter?.value || '';
        const durationValue = durationFilter?.value || '';
        
        videoCards.forEach(card => {
            const cardAge = card.dataset.age;
            const cardCategory = card.dataset.category;
            const cardDuration = card.dataset.duration;
            
            const ageMatch = !ageValue || cardAge === ageValue;
            const categoryMatch = !categoryValue || cardCategory === categoryValue;
            const durationMatch = !durationValue || cardDuration === durationValue;
            
            if (ageMatch && categoryMatch && durationMatch) {
                card.style.display = 'block';
                anime({
                    targets: card,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if (ageFilter) ageFilter.addEventListener('change', filterVideos);
    if (categoryFilter) categoryFilter.addEventListener('change', filterVideos);
    if (durationFilter) durationFilter.addEventListener('change', filterVideos);
    
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (ageFilter) ageFilter.value = '';
            if (categoryFilter) categoryFilter.value = '';
            if (durationFilter) durationFilter.value = '';
            filterVideos();
        });
    }
    
    // Клик по видео карточкам
    videoCards.forEach(card => {
        const playBtn = card.querySelector('button');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showNotification('Видео скоро будет доступно!', 'info');
            });
        }
    });
}

// FAQ аккордеон
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('svg');
            
            // Закрыть все другие ответы
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('svg');
                    otherAnswer.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Переключить текущий ответ
            answer.classList.toggle('hidden');
            const isHidden = answer.classList.contains('hidden');
            icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
            
            if (!isHidden) {
                anime({
                    targets: answer,
                    opacity: [0, 1],
                    height: [0, 'auto'],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
}

// Анимации
function initAnimations() {
    // Анимация карточек специалистов
    const specialistCards = document.querySelectorAll('.specialist-card');
    if (specialistCards.length > 0) {
        anime({
            targets: specialistCards,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuad'
        });
    }
    
    // Анимация отзывов
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length > 0) {
        anime({
            targets: reviewCards,
            opacity: [0, 1],
            translateX: [50, 0],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
    
    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Наблюдение за элементами
    document.querySelectorAll('.card-shadow').forEach(el => {
        observer.observe(el);
    });
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${
                type === 'success' ? '✅' :
                type === 'error' ? '❌' :
                'ℹ️'
            }</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Удаление через 3 секунды
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                notification.remove();
            }
        });
    }, 3000);
}

// Выход из системы
function initLogout() {
    const logoutBtns = document.querySelectorAll('#logout-btn, #logout-btn-mobile');
    logoutBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showNotification('Вы вышли из системы', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            });
        }
    });
}

// Инициализация выхода
document.addEventListener('DOMContentLoaded', initLogout);

// Добавление CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
`;
document.head.appendChild(style);