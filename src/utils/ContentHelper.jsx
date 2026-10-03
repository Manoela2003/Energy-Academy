export const getText = (backendContent, key, defaultText) => {
    return backendContent && backendContent[key] !== undefined ? backendContent[key] : defaultText;
};