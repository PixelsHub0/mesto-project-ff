const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
    authorization: '0a003746-7124-40a2-8fde-a7ec50cbfa87',
    'Content-Type': 'application/json'
  }
}

//функция проверки запроса от сервера
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

//функция получения информации пользователя от сервера
const getMyInformation = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};
//функция получения массива карт с сервера
const getCardsApi = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};

const promises = [getMyInformation(), getCardsApi()] 

//функция, отправляющая новые данные пользователя на сервер 
const editProfileApi = (name, description) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${description}`
    })
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};

//функция, добавляющая новую карточку на сервер
const additionNewCardApi = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};

//функция удаления карточки
const deleteCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};

//функция постановки лайка на карточку
const putLikeCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};

//функция снятия лайка с карточки
const deleteLikeCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};


//функция изменения аватара
const changeAvatarApi = (newProfileAvatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: newProfileAvatar,
    })
  })
    .then((responce) => {
      return checkResponse(responce);
    });
};

export {editProfileApi, additionNewCardApi, promises, deleteCardApi, putLikeCard, deleteLikeCard, changeAvatarApi };