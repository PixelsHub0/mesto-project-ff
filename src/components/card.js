import { openImagePopup } from "../scripts";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (card, { deleteCardFunk, LikeActFunk, openImagePopupFunk }) => {
    //клонируем карточку
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    //наполняем карточку содержимым
        // Настройка изображения
    const imageCard = cardElement.querySelector('.card__image');
    imageCard.src = card.link;
    imageCard.alt = card.alt;
        // Настройка заголовка
    cardElement.querySelector('.card__title').textContent = card.name;
    //Настройка обработчика клика по кнопке лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (evt) => likeButtonAct(evt));
    //обработчик клика по кнопке удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteOneCard(cardElement));
     // Добавляем обработчик клика на контейнер карточек
    imageCard.addEventListener('click', (event) => {
        const imageSrc = event.target.src; // Получаем src картинки
        const imageAlt = event.target.alt; // Получаем alt картинки
        const caption = event.target.alt; // получаем alt карточки 
        openImagePopup(imageSrc, imageAlt, caption); // Открываем модальное окно с картинкой
        });
    return cardElement;
}

// @todo: Функция удаления карточки
const deleteOneCard = (cardToDelete) => {
    cardToDelete.remove(); 
}

//функция лайка карточки
const likeButtonAct = (evt) => {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}
export { createCard, deleteOneCard, likeButtonAct };
    
