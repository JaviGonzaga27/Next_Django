import { useState } from 'react';
import { FaBars, FaBell, FaCog } from 'react-icons/fa';

const Navbar = ({ user, logout, toggleSidebar }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="bg-gray-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 md:hidden">
                            <FaBars className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                            <FaBell className="h-5 w-5" />
                        </button>
                        <span className="text-gray-600 text-sm">{user?.username}</span>
                        <div className="relative">
                            <button 
                                onClick={() => setShowMenu(!showMenu)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <FaCog className="h-5 w-5" />
                            </button>
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configuraciones</a>
                                    <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cerrar sesión</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;