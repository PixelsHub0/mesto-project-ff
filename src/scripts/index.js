// Импорты модулей
import '../pages/index.css';
import avatar from '../images/avatar.jpg';
import { initialCards } from './cards.js';
import { createCard, deleteOneCard, likeButtonAct } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
// Константы, связанные с модальными окнами
    // Константы кнопок модальных окон
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
    // Константы модальных окон
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

//компоненты мадального окна с картинкой 
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

//константы , связанные с функцией изменения профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description'); 
const formEditProfile = document.querySelector('.popup__form_edit');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const popupButton = formEditProfile.querySelector('.popup__button');

//константы , связанные с функцией добавления новой карточки 
const popUpFormNewCard = document.querySelector('.popup__form_new-card');
const inputPlaceName = popUpFormNewCard.querySelector('.popup__input_type_card-name');
const inputLinkImage = popUpFormNewCard.querySelector('.popup__input_type_url');

// Вставка карточки на страницу 
const renderCard = (cardElement, cardContainer) => {
    cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const createdCart = createCard(card, { deleteOneCard, likeButtonAct, openImagePopup });
    renderCard(createdCart, cardContainer);
});

// Установка слушателей на кнопки модальных окон
profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

// Функция коллбек для обработчика клика по overlay
const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
        closeModal(event.currentTarget);
    }
}

// Функция коллбек для обработчика клика по кнопке закрытия
const handleButtonClose = (popup) => {
    closeModal(popup);
}

// Обработчики закрытия карточки по overlay и крестику
popups.forEach(popup => {
    popup.addEventListener('click', handleOverlayClose);
});

popupCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        handleButtonClose(popup);
    });
});

// Функция для открытия модального окна с картинкой
const openImagePopup = (imageSrc, imageAlt, caption) => {
    popupImage.src = imageSrc; 
    popupImage.alt = imageAlt;
    popupCaption.textContent = caption;
    openModal(popupTypeImage); 
};

//вставка в инпуты данных пользователя, при открытии попапа редактирования профиля
const editProfileInputValue = () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

//обработчик события при клике на кнопку редактирования профиля
profileEditButton.addEventListener('click', editProfileInputValue);

//функция редактирования профиля 
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value
    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    closeModal(popupTypeEdit);
}
//обработчик клика на кнопку сохранения изменений профиля 
formEditProfile.addEventListener('submit', handleProfileFormSubmit); 

//функция добавление карточки на страницу с помощью модального онка 
const addNewCard = (evt) => {
    evt.preventDefault();
    const cardName = inputPlaceName.value;
    const cardLink = inputLinkImage.value;
    const newCardObj = {
        name: cardName,
        link: cardLink,
        alt: cardName
    };
    const newCard = createCard(newCardObj, deleteOneCard, likeButtonAct, openImagePopup);
    cardContainer.prepend(newCard);
    closeModal(popupTypeNewCard);
    popUpFormNewCard.reset();
}
    //обрабочик события submit, при добавления карточки на страницу 
popUpFormNewCard.addEventListener('submit', (evt) => addNewCard(evt));

export { openImagePopup };







