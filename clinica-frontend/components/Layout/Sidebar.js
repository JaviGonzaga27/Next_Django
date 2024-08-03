import Link from 'next/link';
import { FaUsers, FaUserInjured, FaUserMd, FaCalendarAlt, FaChartBar, FaTooth } from 'react-icons/fa';

const menuItems = [
    { name: 'Usuarios', icon: <FaUsers />, path: '/usuarios' },
    { name: 'Pacientes', icon: <FaUserInjured />, path: '/pacientes' },
    { name: 'Doctores', icon: <FaUserMd />, path: '/doctores' },
    { name: 'Citas', icon: <FaCalendarAlt />, path: '/citas' },
    { name: 'Reportes', icon: <FaChartBar />, path: '/reportes' },
];

const Sidebar = ({ isOpen }) => {
    return (
        <div className={`bg-indigo-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
            <div className="flex items-center space-x-2 px-4">
                <FaTooth className="h-8 w-8" />
                <span className="text-2xl font-extrabold">Clínica Dental</span>
            </div>
            <nav>
                {menuItems.map((item, index) => (
                    <Link href={item.path} key={index} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
                        <div className="flex items-center space-x-2">
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;