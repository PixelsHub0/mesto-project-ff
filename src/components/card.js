import { openImagePopup } from "../scripts";
import { deleteCardApi, putLikeCard, deleteLikeCard } from "./api";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (card, { deleteCardFunk, LikeActFunk, openImagePopupFunk }, userId) => {
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
    //проверяем, на постановку лайка пользователем
    if (isLikedByMe(card, userId)) {
        likeButton.classList.add('card__like-button_is-active')
    }
    likeButton.addEventListener('click', (evt) => likeButtonAct(evt, card, likeQuantity));
    //константа счетчика лайков на странице
    const likeQuantity = cardElement.querySelector('.like__quantity')
    likeQuantity.textContent = card.likes.length ? card.likes.length : 0;
    //обработчик клика по кнопке удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (card.owner._id === userId) {
        deleteButton.addEventListener('click', () => {
            deleteCardApi(card._id)
                .then(() => {
                deleteOneCard(cardElement)
            })
            console.log()
        })
    } else {
        deleteButton.remove();
    }
     // Добавляем обработчик клика на контейнер карточек
    imageCard.addEventListener('click', (event) => {
        const imageSrc = event.target.src; // Получаем src картинки
        const imageAlt = event.target.alt; // Получаем alt картинки
        const caption = event.target.alt; // получаем alt карточки 
        openImagePopup(imageSrc, imageAlt, caption); // Открываем модальное окно с картинкой
        });
    return cardElement;
}

// Проверяем, поставил ли текущий пользователь лайк
const isLikedByMe = (card, userId) => {
    return card.likes.some(like => like._id === userId)
}


// @todo: Функция удаления карточки
const deleteOneCard = (cardToDelete) => {
    cardToDelete.remove(); 
}

//функция лайка карточки
const likeButtonAct = (evt, card, likeQuantity) => {
    const cardId = card._id;
    if (evt.target.classList.contains('card__like-button_is-active')) {
        deleteLikeCard(cardId)
            .then((updateCard) => {
                likeQuantity.textContent = updateCard.likes.length;
                evt.target.classList.remove('card__like-button_is-active');
        })
    } else {
        putLikeCard(cardId)
            .then((updateCard) => {
                likeQuantity.textContent = updateCard.likes.length;
                evt.target.classList.add('card__like-button_is-active');
        })
    }
}
export { createCard, deleteOneCard, likeButtonAct };
    