// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(card, deleteCardFunk) {
    //клонируем карточку
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    //наполняем карточку содержимым
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.alt;
    cardElement.querySelector('.card__title').textContent = card.name;
    //обработчик клика по кнопке удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteOneCard(deleteButton));
    return cardElement;
}



// @todo: Функция удаления карточки
function deleteOneCard(deleteButton) {
    const cardItem = deleteButton.closest('.places__item');
    cardItem.remove();
}

//вставка карточки на страницу 
function renderCard(cardElement, cardContainer) {
    cardContainer.append(cardElement);
}


// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const createdCart = createCard(card, deleteOneCard);
    renderCard(createdCart, cardContainer);
});





