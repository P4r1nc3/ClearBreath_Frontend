const storeTokenInLocalStorage = (token) => {
    localStorage.setItem("token", token);
};

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
};

export { storeTokenInLocalStorage, getTokenFromLocalStorage, removeTokenFromLocalStorage };
