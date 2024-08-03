import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/navbar';
import {
    FaCalendarDay,
    FaUserClock,
    FaChartLine,
    FaExclamationTriangle,
    FaCalendarPlus,
    FaSearch,
    FaTooth
} from 'react-icons/fa';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Dashboard = () => {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        // Simular carga de eventos
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
    
        setEvents([
            { 
                title: 'Limpieza dental', 
                start: today, 
                end: new Date(today.getTime() + 60 * 60 * 1000) // Añade 1 hora
            },
            { 
                title: 'Revisión', 
                start: tomorrow,
                end: new Date(tomorrow.getTime() + 60 * 60 * 1000) // Añade 1 hora
            }
        ]);
    }, [user, loading, router]);

    if (loading) return <div className="flex items-center justify-center h-screen">Cargando...</div>;
    if (!user) return null;

    const handleDateClick = (arg) => {
        alert('Fecha seleccionada: ' + arg.dateStr);
    };

    const handleEventClick = (info) => {
        alert('Cita seleccionada: ' + info.event.title);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar user={user} logout={logout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="py-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                                <button className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-150 ease-in-out">
                                    <FaCalendarPlus className="mr-2" />
                                    <span>Nueva Cita</span>
                                </button>
                            </div>

                            {/* Estadísticas rápidas */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard icon={<FaCalendarDay className="text-blue-500" />} title="Citas Hoy" value="12" />
                                <StatCard icon={<FaUserClock className="text-green-500" />} title="Próxima Cita" value="14:30" />
                                <StatCard icon={<FaChartLine className="text-yellow-500" />} title="Citas Esta Semana" value="45" />
                                <StatCard icon={<FaExclamationTriangle className="text-red-500" />} title="Citas Pendientes" value="3" />
                            </div>

                            {/* FullCalendar */}
                            <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Calendario de Citas</h2>
                                </div>
                                <div className="p-4">
                                    <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="timeGridWeek"
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        events={events}
                                        dateClick={handleDateClick}
                                        eventClick={handleEventClick}
                                        height="auto"
                                    />
                                </div>
                            </div>

                            {/* Accesos rápidos */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <QuickAccessCard
                                    title="Buscar Paciente"
                                    icon={<FaSearch className="text-blue-500" />}
                                    description="Encuentra rápidamente la información de cualquier paciente."
                                />
                                <QuickAccessCard
                                    title="Resumen de Tratamientos"
                                    icon={<FaTooth className="text-green-500" />}
                                    description="Ve un resumen de los tratamientos más comunes este mes."
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-gray-100 text-3xl">{icon}</div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

const QuickAccessCard = ({ title, icon, description }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300">
        <div className="flex items-center space-x-4 mb-4">
            <div className="text-3xl">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default Dashboard;