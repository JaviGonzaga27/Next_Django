import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
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

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-2 flex items-center space-x-2 hover:shadow-lg transition duration-300">
    <div className="p-1.5 rounded-full bg-gray-100 text-lg">{icon}</div>
    <div>
      <p className="text-gray-600 text-xs font-medium">{title}</p>
      <p className="text-base font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const QuickAccessCard = ({ title, icon, description }) => (
  <div className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition duration-300">
    <div className="flex items-center space-x-2 mb-1">
      <div className="text-lg">{icon}</div>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);

const CalendarComponent = ({ events }) => {
  const handleDateClick = (arg) => {
    alert('Fecha seleccionada: ' + arg.dateStr);
  };

  const handleEventClick = (info) => {
    alert('Cita seleccionada: ' + info.event.title);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-2 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">Calendario de Citas</h2>
      </div>
      <div className="flex-1 p-1 min-h-0">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth'
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="100%"
        />
      </div>
    </div>
  );
};

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
                end: new Date(today.getTime() + 60 * 60 * 1000)
            },
            { 
                title: 'Revisión', 
                start: tomorrow,
                end: new Date(tomorrow.getTime() + 60 * 60 * 1000)
            }
        ]);
    }, [user, loading, router]);

    if (loading) return <div className="flex items-center justify-center h-screen">Cargando...</div>;
    if (!user) return null;

    return (
        <div className="h-screen flex bg-gray-50">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar user={user} logout={logout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-3 grid grid-cols-1 lg:grid-cols-3 gap-3 overflow-hidden">
                    <div className="lg:col-span-2 flex flex-col space-y-3 overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                            <button className="mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center text-sm">
                                <FaCalendarPlus className="mr-1" />
                                <span>Nueva Cita</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <StatCard icon={<FaCalendarDay className="text-blue-600" />} title="Citas Hoy" value="12" />
                            <StatCard icon={<FaUserClock className="text-green-600" />} title="Próxima Cita" value="14:30" />
                            <StatCard icon={<FaChartLine className="text-yellow-600" />} title="Citas Esta Semana" value="45" />
                            <StatCard icon={<FaExclamationTriangle className="text-red-600" />} title="Citas Pendientes" value="3" />
                        </div>

                        <div className="flex-1 min-h-0">
                            <CalendarComponent events={events} />
                        </div>
                    </div>

                    <div className="space-y-3 overflow-auto">
                        <QuickAccessCard
                            title="Buscar Paciente"
                            icon={<FaSearch className="text-blue-600" />}
                            description="Encuentra rápidamente la información de cualquier paciente."
                        />
                        <QuickAccessCard
                            title="Resumen de Tratamientos"
                            icon={<FaTooth className="text-green-600" />}
                            description="Ve un resumen de los tratamientos más comunes este mes."
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;