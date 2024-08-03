import { useState } from 'react';
import Link from 'next/link';
import { FaUsers, FaUserInjured, FaUserMd, FaCalendarAlt, FaChartBar, FaTooth, FaChevronLeft, FaChevronRight, FaHome } from 'react-icons/fa';

const menuItems = [
    { name: 'Inicio', icon: <FaHome />, path: '/dashboard' },
    { name: 'Usuarios', icon: <FaUsers />, path: '/usuarios' },
    { name: 'Pacientes', icon: <FaUserInjured />, path: '/pacientes' },
    { name: 'Doctores', icon: <FaUserMd />, path: '/doctores' },
    { name: 'Citas', icon: <FaCalendarAlt />, path: '/citas' },
    { name: 'Reportes', icon: <FaChartBar />, path: '/reportes' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div 
            className={`bg-gray-100 text-gray-800 h-screen ${
                isCollapsed ? 'w-20' : 'w-64'
            } space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
        >
            <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center px-4`}>
                {!isCollapsed && (
                    <>
                        <FaTooth className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-semibold">Clínica Dental</span>
                    </>
                )}
                <button
                    onClick={toggleCollapse}
                    className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            </div>
            <nav>
                {menuItems.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">
                            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
                                {item.icon}
                                {!isCollapsed && <span>{item.name}</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </nav>
            {!isCollapsed && (
                <div className="px-4 mt-auto">
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Cerrar menú
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;