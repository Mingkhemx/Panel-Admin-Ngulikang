import { useState, useEffect } from 'react';

// ==============================|| AUTH HOOKS ||============================== //

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Also check synchronously for initial render to prevent flash
    const token = localStorage.getItem('token');
    return { isLoggedIn: !!token };
};
