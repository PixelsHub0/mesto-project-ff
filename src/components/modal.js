//функция открытия модального окна 
const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', handleEscClose);
}

// Функция коллбек для обработчика клика по escape
const handleEscClose = (event) => {
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.popup_is-opened');
        if (openModal) closeModal(openModal);
    }
}

export { openModal, closeModal };



