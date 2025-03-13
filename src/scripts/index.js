// Импорты модулей
import '../pages/index.css';
import { createCard, deleteOneCard, likeButtonAct } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import {
    additionNewCardApi,
    editProfileApi,
    promises,
    changeAvatarApi
} from '../components/api.js';
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
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
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

//константы , связанные с функцией добавления новой карточки 
const popUpFormNewCard = document.querySelector('.popup__form_new-card');
const inputPlaceName = popUpFormNewCard.querySelector('.popup__input_type_card-name');
const inputLinkImage = popUpFormNewCard.querySelector('.popup__input_type_url');

//константы, связанные с изменением аватара
const popupFormAvatarEdit = popupAvatarEdit.querySelector('.popup__form');
const editLogoButton = document.querySelector('.edit-logo_button');
const inputTypeUrl = popupFormAvatarEdit.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');

//конфиг для валидации
 const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
 };

//работа с api
    //получение информации о пльзователе с сервера,и вывод карточки на страницу
Promise.all(promises)
    .then(([userData, cards]) => {
        const userId = userData._id;
        profileImage.style = `background-image: url('${userData.avatar}')`;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        insertCards(cards, userId);
    })
    .catch((err) => {
        console.log(err)
    })
// Вставка карточки на страницу 
const renderCard = (cardElement, cardContainer) => {
    cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу
const insertCards = (cards, userId) => { 
    cards.forEach((card) => {
        const createdCart = createCard(card, {
            deleteCardFunk: deleteOneCard, 
            LikeActFunk: likeButtonAct, 
            openImagePopupFunk: openImagePopup
        }, userId);
        renderCard(createdCart, cardContainer);
    }) 
};

enableValidation(formValidationConfig);

//вставка в инпуты данных пользователя, при открытии попапа редактирования профиля
const editProfileInputValue = () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

// Установка слушателей на кнопки модальных окон
profileEditButton.addEventListener('click', () => {
    clearValidation(formEditProfile, formValidationConfig);
    editProfileInputValue();
    openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
    clearValidation(popUpFormNewCard, formValidationConfig);
    openModal(popupTypeNewCard);
    popUpFormNewCard.reset();
});

editLogoButton.addEventListener('click', () => {
    clearValidation(popupFormAvatarEdit, formValidationConfig);
    openModal(popupAvatarEdit);
    popupFormAvatarEdit.reset();
})

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

const renderLoading = (isLoading, formElement) => {
    const buttonSave = formElement.querySelector('.popup__button')
    if (isLoading) {
        buttonSave.textContent = 'Создать...';
    } else {
        buttonSave.textContent = 'Создать';
    }
}

//функция редакирования аватара
const editAvatarSubmit = (evt) => {
    evt.preventDefault();
    renderLoading(true, popupFormAvatarEdit);
    changeAvatarApi(inputTypeUrl.value)
        .then((data) => {
            profileImage.style = `background-image: url('${data.avatar}')`
            closeModal(popupAvatarEdit);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(false, popupFormAvatarEdit);
        })
}

//установка слушателя на событие 'submit' изменения аватара
popupFormAvatarEdit.addEventListener('submit', editAvatarSubmit)

//функция редактирования профиля 
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    renderLoading(true, formEditProfile);
    editProfileApi(nameInput.value, jobInput.value)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(popupTypeEdit);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(false, formEditProfile);
        })
}

//обработчик клика на кнопку сохранения изменений профиля 
formEditProfile.addEventListener('submit', handleProfileFormSubmit); 

//функция добавление карточки на страницу с помощью модального онка 
const addNewCard = (evt) => {
    evt.preventDefault();
    renderLoading(true, popUpFormNewCard);
    additionNewCardApi(inputPlaceName.value, inputLinkImage.value)
        .then((cardData) => {
            const newCard = createCard(cardData, {
                deleteCardFunk: deleteOneCard, 
                LikeActFunk: likeButtonAct, 
                openImagePopupFunk: openImagePopup
            }, cardData.owner._id);
            cardContainer.prepend(newCard);
            closeModal(popupTypeNewCard);
            popUpFormNewCard.reset();
            
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(false, popUpFormNewCard);
    })
}
//обрабочик события submit, при добавления карточки на страницу 
popUpFormNewCard.addEventListener('submit', (evt) => addNewCard(evt));

    







