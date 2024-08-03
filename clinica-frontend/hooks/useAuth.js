import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                fetchUserDetails(decoded.user_id);
            } catch (error) {
                console.error('Error decoding token', error);
                localStorage.removeItem('accessToken');
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await api.get(`/usuarios/${userId}/`);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user details', error);
            localStorage.removeItem('accessToken');
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await api.post('/token/', { username, password });
            localStorage.setItem('accessToken', response.data.access);
            const decoded = jwtDecode(response.data.access);
            await fetchUserDetails(decoded.user_id);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error de login', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        router.push('/login');
    };

    return { user, loading, login, logout };
};

export default useAuth;