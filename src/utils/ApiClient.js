import { API_BASE_URL } from './ApiConfig';


export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('jwt_token');

    const headers = {
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 204) {
            return null;
        }

        let data = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            console.error(`API Error [${response.status}] on ${endpoint}:`, data);

            if (response.status === 401) {
                console.warn("Session expired or unauthorized. Redirecting to login...");
                localStorage.removeItem('jwt_token');
                
                const currentPath = window.location.pathname + window.location.search;
                if (currentPath !== '/login' && currentPath !== '/') {
                    localStorage.setItem('redirect_after_login', currentPath);
                }

                window.location.href = '/login';
                return;
            }

            const errorMsg = (typeof data === 'object' && data !== null && data.message) 
                ? data.message 
                : (typeof data === 'string' ? data : "Възникна грешка при заявката.");

            throw new Error(errorMsg);
        }

        return data;

    } catch (err) {
        console.error(`Fetch exception on ${endpoint}:`, err);
        throw err;
    }
};