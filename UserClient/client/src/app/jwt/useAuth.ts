import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    username: string;
    role: string;
    exp: number;
    // Add other properties if needed
    email?: string; // Make optional if not always present
    phoneNumber?: string; // Make optional if not always present
    password?: string; // Make optional if not always present
}

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                // Check if token is expired
                if (decoded.exp * 1000 > Date.now()) {
                    setDecodedToken(decoded);
                    setIsAuthenticated(true);
                } else {
                    setDecodedToken(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setDecodedToken(null);
                setIsAuthenticated(false);
            }
        } else {
            setDecodedToken(null);
            setIsAuthenticated(false);
        }
    }, []);

    return { isAuthenticated, decodedToken };
};