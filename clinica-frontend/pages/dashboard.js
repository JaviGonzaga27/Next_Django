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
} from 'react-icons/fa';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { getCitas, getEstadisticas } from '../services/citaService';

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition duration-300 border-l-4 ${color}`}>
    <div className={`p-3 rounded-full ${color.replace('border-', 'bg-')} bg-opacity-10 text-2xl`}>{icon}</div>
    <div>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{content}</div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [stats, setStats] = useState({
    citasHoy: 0,
    proximaCita: '',
    citasSemana: 0,
    citasPendientes: 0
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }

    const fetchData = async () => {
      try {
        const citas = await getCitas();
        const estadisticas = await getEstadisticas();

        const allEvents = citas.map(cita => {
          const startDate = new Date(cita.fecha);
          const endDate = new Date(new Date(cita.fecha).getTime() + cita.duracion * 60000);
          return {
            title: `${cita.paciente.nombre} ${cita.paciente.apellido}`,
            start: startDate,
            end: endDate,
            extendedProps: {
              id: cita.id,
              paciente: cita.paciente,
              doctor: cita.doctor,
              motivo: cita.motivo,
              fechaOriginal: cita.fecha
            }
          };
        });

        setEvents(allEvents);

        const today = new Date();
        const todayEventsFiltered = allEvents.filter(event =>
          event.start.toDateString() === today.toDateString()
        );
        setTodayEvents(todayEventsFiltered);

        setStats({
          citasHoy: estadisticas.citasHoy,
          proximaCita: estadisticas.proximaCita,
          citasSemana: estadisticas.citasSemana,
          citasPendientes: estadisticas.citasPendientes
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading, router]);

  const handleDateClick = (arg) => {
    setModalContent({
      title: 'Fecha Seleccionada',
      content: `Has seleccionado la fecha: ${arg.dateStr}`
    });
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const fechaOriginal = new Date(info.event.extendedProps.fechaOriginal);
    const fechaLocal = new Date(fechaOriginal.toLocaleString('en-US', { timeZone: 'UTC' }));

    setModalContent({
      title: 'Detalles de la Cita',
      content: (
        <div>
          <p><strong>Paciente:</strong> {info.event.extendedProps.paciente.nombre} {info.event.extendedProps.paciente.apellido}</p>
          <p><strong>Doctor:</strong> Dr. {info.event.extendedProps.doctor.usuario.first_name} {info.event.extendedProps.doctor.usuario.last_name}</p>
          <p><strong>Fecha:</strong> {fechaLocal.toLocaleString()}</p>
          <p><strong>Motivo:</strong> {info.event.extendedProps.motivo}</p>
        </div>
      )
    });
    setModalOpen(true);
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth'
    },
    buttonText: {
      today: 'Hoy',
      day: 'Día',
      week: 'Semana',
      month: 'Mes'
    },
    locale: esLocale,
    events: events,
    dateClick: handleDateClick,
    eventClick: handleEventClick,
    height: "95%",
    aspectRatio: 1.8,
    slotMinTime: "08:00:00",
    slotMaxTime: "20:00:00",
    allDaySlot: false,
    timeZone: 'America/New_York',
    slotDuration: "00:30:00",
    slotLabelInterval: "01:00",
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'short'
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    },
    dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true },
    nowIndicator: true,
    eventColor: "#4F46E5",
    eventTextColor: "#FFFFFF",
    eventBorderColor: "#4338CA",
    eventContent: (arg) => (
      <>
        <b>{arg.timeText}</b>
        <i>{arg.event.title}</i>
      </>
    )
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  if (!user) return null;

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} logout={logout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<FaCalendarDay />} title="Citas Hoy" value={stats.citasHoy} color="border-blue-500" />
            <StatCard icon={<FaUserClock />} title="Próxima Cita" value={stats.proximaCita} color="border-green-500" />
            <StatCard icon={<FaChartLine />} title="Citas Esta Semana" value={stats.citasSemana} color="border-yellow-500" />
            <StatCard icon={<FaExclamationTriangle />} title="Citas Pendientes" value={stats.citasPendientes} color="border-red-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ height: 'calc(100vh - 250px)' }}>
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Calendario de Citas</h2>
              <div style={{ height: 'calc(100% - 2rem)' }}>
                <FullCalendar {...calendarOptions} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Citas de Hoy</h2>
              <div style={{ height: 'calc(100% - 2rem)' }}>
                <FullCalendar
                  {...calendarOptions}
                  initialView="timeGridDay"
                  headerToolbar={false}
                  events={todayEvents}
                  aspectRatio={1.5}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
      />
    </div>
  );
};

export default Dashboard;