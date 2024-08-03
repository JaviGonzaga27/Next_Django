import { FaBars } from 'react-icons/fa';

const Navbar = ({ user, logout, toggleSidebar }) => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
                            <FaBars className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-700 mr-4">Bienvenido, {user.username}</span>
                        <button
                            onClick={logout}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;