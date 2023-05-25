export const saveUser = (login, password) => {
  localStorage.setItem(login, JSON.stringify(password));
};

export const getUser = (login) => {
  if (localStorage.getItem(login)) {
    return JSON.parse(localStorage.getItem(login));
  }
};

export const hasUser = (login) => {
  if (localStorage.getItem(login)) {
    return true;
  }
  return false;
};

export const removeUser = (login) => {
  if (localStorage.getItem(login)) {
    localStorage.removeItem(login);
  }
};
