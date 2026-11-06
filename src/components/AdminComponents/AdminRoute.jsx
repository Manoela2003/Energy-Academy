import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
    const token = localStorage.getItem('jwt_token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        if (decodedPayload.role === 'ROLE_ADMIN' || decodedPayload.role === 'ADMIN') {
            return children;
        }
    } catch (e) {
        localStorage.removeItem('jwt_token');
    }

    return <Navigate to="/" replace />;
}

export default AdminRoute;