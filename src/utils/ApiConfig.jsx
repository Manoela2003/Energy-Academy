const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }
    return 'https://energy-academy-be.onrender.com';
};

export const API_BASE_URL = getBaseUrl();