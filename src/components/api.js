const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
    authorization: '0a003746-7124-40a2-8fde-a7ec50cbfa87',
    'Content-Type': 'application/json'
  }
}

//функция получения информации пользователя от сервера
const getMyInformation = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
    console.log(err)
  })
}

//функция получения массива карт с сервера
const getCardsApi = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
  .then((data) => {
      if (data.ok) {
        return data.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
    console.log(err)
  })
}

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
    if (responce.ok) {
      return responce.json();
    }
    return Promise.reject(`Ошибка: ${responce.status}`)
  })
    .catch((err) => {
    console.log(err)
  })
}

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
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка: ${responce.status}`)
    })
    .catch((err) => {
    console.log(err)
  })
}

//функция удаления карточки
const deleteCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка: ${responce.status}`)
    })
    .catch((err) => {
    console.log(err)
  })
}

//функция постановки лайка на карточку
const putLikeCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка: ${responce.status}`)
    })
    .catch((err) => {
    console.log(err)
  })
}

//функция снятия лайка с карточки
const deleteLikeCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers
  })
  .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка: ${responce.status}`)
    })
    .catch((err) => {
    console.log(err)
  })
}


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
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка: ${responce.status}`)
    })
    .catch((err) => {
    console.log(err)
  })
}

export { getMyInformation, getCardsApi, editProfileApi, additionNewCardApi, promises, deleteCardApi, putLikeCard, deleteLikeCard, changeAvatarApi };