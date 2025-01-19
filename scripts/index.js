// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки
const createCard = (card, deleteCardFunk) => {
    //клонируем карточку
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    //наполняем карточку содержимым
        // Настройка изображения
    const imageCard = cardElement.querySelector('.card__image');
    imageCard.src = card.link;
    imageCard.alt = card.alt;
        // Настройка заголовка
    cardElement.querySelector('.card__title').textContent = card.name;
    //обработчик клика по кнопке удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteOneCard(cardElement));
    return cardElement;
}



// @todo: Функция удаления карточки
const deleteOneCard = (cardToDelete) => {
    cardToDelete.remove(); 
}

//вставка карточки на страницу 
const renderCard = (cardElement, cardContainer) => {
    cardContainer.append(cardElement);
}


// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const createdCart = createCard(card, deleteOneCard);
    renderCard(createdCart, cardContainer);
});





