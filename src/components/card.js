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
    imageCard.alt = card.name;
        // Настройка заголовка
    cardElement.querySelector('.card__title').textContent = card.name;
    //Настройка обработчика клика по кнопке лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    //проверяем, на постановку лайка пользователем
    if (isLikedByMe(card, userId)) {
        likeButton.classList.add('card__like-button_is-active')
    }
    likeButton.addEventListener('click', (evt) => LikeActFunk(evt, card, likeQuantity));
    //константа счетчика лайков на странице
    const likeQuantity = cardElement.querySelector('.like__quantity')
    likeQuantity.textContent = card.likes.length ? card.likes.length : 0;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (card.owner._id === userId) {
        //обработчик клика по кнопке удаления
        deleteButton.addEventListener('click', () => {
            deleteCardFunk(card, cardElement)
        })
    } else {
        deleteButton.remove();
    }
     // Добавляем обработчик клика на изображение
    imageCard.addEventListener('click', () => {
        openImagePopupFunk(card.link, card.name, card.name); // Открываем модальное окно с картинкой
        });
    return cardElement;
}

// Проверяем, поставил ли текущий пользователь лайк
const isLikedByMe = (card, userId) => {
    return card.likes.some(like => like._id === userId)
}

// @todo: Функция удаления карточки
const deleteOneCard = (card, cardElement) => {
    deleteCardApi(card._id)
        .then(() => {
        cardElement.remove()
        })
        .catch((err) => {
        console.log(err)
    })
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
            .catch((err) => {
            console.log(err)
        })
    } else {
        putLikeCard(cardId)
            .then((updateCard) => {
                likeQuantity.textContent = updateCard.likes.length;
                evt.target.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
            console.log(err)
        })
    }
}
export { createCard, deleteOneCard, likeButtonAct };
    