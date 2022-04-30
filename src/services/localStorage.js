const INITIAL_STORAGE = [];

const setStorage = (data = INITIAL_STORAGE) => {
  localStorage.setItem('ranking', JSON.stringify(data));
};

export const getStore = (key) => JSON.parse(localStorage.getItem(key));

export const addNewUser = (userData) => {
  if (getStore('ranking') === null) {
    setStorage();
  }

  const users = getStore('ranking');
  users.push(userData);
  setStorage(users);
};

export const getUser = (email) => {
  const users = getStore('ranking');
  if (users.length > 0) {
    const findUser = users.find((user) => user.email === email);
    return findUser;
  }
  return undefined;
};

export const updateUserScore = (token, score) => {
  const users = getStore('ranking');
  setStorage(users.map((user) => {
    if (user.token === token) {
      user.score += score;
    }
    return user;
  }));
};