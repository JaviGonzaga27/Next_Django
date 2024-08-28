import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../contexts/AppContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = memo(({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout, loading } = useAppContext();

    const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-2xl font-semibold text-gray-600">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar user={user} logout={logout} toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    {children}
                </main>
            </div>
        </div>
    );
});

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

Layout.displayName = 'Layout';

export default Layout;