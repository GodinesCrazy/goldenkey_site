// TeleMed Web Application - Sistema de Telemedicina Profesional

const { useState, useEffect, useRef } = React;

// Simulador de iconos para web
window.IconsHelper = {
  icons: {
    'search': '🔍',
    'brain': '🧠',
    'baby': '👶',
    'eye': '👁️',
    'heart': '❤️',
    'video': '📹',
    'phone': '📞',
    'more-vertical': '⋮',
    'file-text': '📄',
    'clipboard': '📋',
    'pill': '💊',
    'send': '▶️',
    'arrow-left': '←',
    'home': '🏠',
    'calendar': '📅',
    'user': '👤',
    'clock': '⏰',
    'dollar-sign': '💰',
    'shield-check': '🛡️',
    'users': '👥',
    'plus': '➕',
    'check-circle': '✅',
    'alert-circle': '⚠️',
    'star': '⭐'
  },
  get: function(iconName) {
    return this.icons[iconName] || '•';
  }
};

// Componente principal de la aplicación
function TeleMedApp() {
  const [currentView, setCurrentView] = React.useState('dashboard');
  const [userType, setUserType] = useState('patient');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [alert, setAlert] = useState(null);

  // Efecto para cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular usuario activo
      setUser({
        name: userType === 'patient' ? 'María González' : 'Dr. Andrés Reyes',
        email: userType === 'patient' ? 'maria@email.com' : 'dreyes@hospital.cl',
        id: userType === 'patient' ? '#MT-2025-001234' : '#MC-12845',
        role: userType
      });
      
      // Cargar citas simuladas
      setAppointments([
        {id: 1, patient: 'María González', doctor: 'Dr. Reyes', time: '15:20', status: 'urgent', complaint: 'Dolor torácico intermitente'},
        {id: 2, patient: 'Ignacio Silva', doctor: 'Dr. Reyes', time: '16:00', status: 'scheduled', complaint: 'Control post-operatorio'},
        {id: 3, patient: 'Claudia Torres', doctor: 'Dr. Reyes', time: '16:30', status: 'routine', complaint: 'Seguimiento hipertensión'}
      ]);
      
      setAlert({ type: 'success', message: '✅ TeleMed Sistema Hospitalario cargado' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Error cargando datos:', error);
      setAlert({ type: 'error', message: '❌ Error al cargar sistema hospitalario' });
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar entre vista paciente/doctor
  const switchUserType = (type) => {
    setUserType(type);
    loadInitialData();
  };
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  if (loading) {
    return (
      <div className="telemed-container">
        <div className="telemed-loading">
          <div className="telemed-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="telemed-container fade-in">
      {/* Header profesional hospitalario */}
      <div className="telemed-header medical-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="medical-icon">⚕️</div>
            <div className="brand-info">
              <h1>TeleMed Hospital</h1>
              <p>Sistema Hospitalario de Telemedicina</p>
            </div>
          </div>
        </div>
        <div className="header-center">
          <div className="status-indicators">
            <div className="status-item active">
              <span className="status-icon">🟢</span>
              <span>Sistema Activo</span>
            </div>
            <div className="status-item">
              <span className="status-icon">🔒</span>
              <span>Conexión Segura</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          {user && (
            <div className="user-info">
              <div className="user-avatar">
                {user.role === 'doctor' ? '👨‍⚕️' : '👤'}
              </div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-id">{user.id}</div>
              </div>
            </div>
          )}
          <div className="user-type-selector">
            <button 
              className={userType === 'patient' ? 'active' : ''}
              onClick={() => switchUserType('patient')}
            >
              Paciente
            </button>
            <button 
              className={userType === 'doctor' ? 'active' : ''}
              onClick={() => switchUserType('doctor')}
            >
              Doctor
            </button>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {alert && (
        <div className={`telemed-alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Navegación profesional hospitalaria */}
      <div className="telemed-nav medical-nav">
        <button 
          className={currentView === 'dashboard' ? 'active' : ''} 
          onClick={() => setCurrentView('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Panel Principal</span>
        </button>
        <button 
          className={currentView === 'appointments' ? 'active' : ''} 
          onClick={() => setCurrentView('appointments')}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-label">Agenda Médica</span>
        </button>
        <button 
          className={currentView === 'patients' ? 'active' : ''} 
          onClick={() => setCurrentView('patients')}
        >
          <span className="nav-icon">👥</span>
          <span className="nav-label">Historia Clínica</span>
        </button>
        <button 
          className={currentView === 'consultation' ? 'active' : ''} 
          onClick={() => setCurrentView('consultation')}
        >
          <span className="nav-icon">💬</span>
          <span className="nav-label">Teleconsulta</span>
        </button>
        <button 
          className={currentView === 'prescriptions' ? 'active' : ''} 
          onClick={() => setCurrentView('prescriptions')}
        >
          <span className="nav-icon">💊</span>
          <span className="nav-label">Recetario Digital</span>
        </button>
        <button 
          className={currentView === 'emergency' ? 'active' : ''} 
          onClick={() => setCurrentView('emergency')}
        >
          <span className="nav-icon">🚨</span>
          <span className="nav-label">Emergencias</span>
        </button>
      </div>

      {/* Contenido principal profesional */}
      {currentView === 'dashboard' && <MedicalDashboardView user={user} showAlert={showAlert} userType={userType} />}
      {currentView === 'appointments' && <MedicalAppointmentsView appointments={appointments} showAlert={showAlert} userType={userType} />}
      {currentView === 'patients' && <MedicalPatientsView showAlert={showAlert} userType={userType} />}
      {currentView === 'consultation' && <MedicalConsultationView showAlert={showAlert} userType={userType} />}
      {currentView === 'prescriptions' && <MedicalPrescriptionsView showAlert={showAlert} userType={userType} />}
      {currentView === 'emergency' && <MedicalEmergencyView showAlert={showAlert} userType={userType} />}
    </div>
  );
}

// Vista Dashboard Médico Profesional
function MedicalDashboardView({ user, showAlert, userType }) {
  const [metrics, setMetrics] = useState({
    pendingAppointments: 5,
    todayConsultations: 8,
    emergencyAlerts: 1,
    systemHealth: 98
  });

  return (
    <div className="fade-in">
      {/* Panel de métricas rápidas */}
      <div className="medical-metrics">
        <div className="metric-card urgent">
          <div className="metric-icon">🚨</div>
          <div className="metric-info">
            <div className="metric-value">{metrics.emergencyAlerts}</div>
            <div className="metric-label">Alertas Críticas</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📋</div>
          <div className="metric-info">
            <div className="metric-value">{metrics.pendingAppointments}</div>
            <div className="metric-label">Citas Pendientes</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">👩‍⚕️</div>
          <div className="metric-info">
            <div className="metric-value">{metrics.todayConsultations}</div>
            <div className="metric-label">Consultas Hoy</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">💚</div>
          <div className="metric-info">
            <div className="metric-value">{metrics.systemHealth}%</div>
            <div className="metric-label">Sistema</div>
          </div>
        </div>
      </div>

      {/* Citas próximas */}
      <div className="telemed-card">
        <h3>📋 Próximas Citas - Hoy</h3>
        <div className="medical-appointments-today">
          <div className="appointment-slot urgent">
            <div className="slot-time">15:20</div>
            <div className="slot-info">
              <div className="patient-name">María González</div>
              <div className="complaint">Dolor torácico intermitente</div>
              <div className="status-badge urgent">URGENTE</div>
            </div>
            <button className="slot-action" onClick={() => showAlert('success', '🚨 Iniciando consulta de emergencia')}>
              Atender Ahora
            </button>
          </div>
          <div className="appointment-slot scheduled">
            <div className="slot-time">16:00</div>
            <div className="slot-info">
              <div className="patient-name">Ignacio Silva</div>
              <div className="complaint">Control post-operatorio</div>
              <div className="status-badge scheduled">PROGRAMADA</div>
            </div>
            <button className="slot-action" onClick={() => showAlert('info', '📋 Preparando consulta programada')}>
              Preparar
            </button>
          </div>
          <div className="appointment-slot routine">
            <div className="slot-time">16:30</div>
            <div className="slot-info">
              <div className="patient-name">Claudia Torres</div>
              <div className="complaint">Seguimiento hipertensión</div>
              <div className="status-badge routine">RUTINA</div>
            </div>
            <button className="slot-action" onClick={() => showAlert('info', '📝 Revisando historial médico')}>
              Ver Historial
            </button>
          </div>
        </div>
      </div>

      {/* Panel de acceso rápido */}
      <div className="quick-actions">
        <button className="quick-action-btn emergency" onClick={() => showAlert('warning', '🚨 Protocolo de emergencia activado')}>
          <span className="action-icon">🚨</span>
          <span className="action-label">Emergencia</span>
        </button>
        <button className="quick-action-btn" onClick={() => showAlert('info', '💊 Abriendo recetario digital')}>
          <span className="action-icon">💊</span>
          <span className="action-label">Nueva Receta</span>
        </button>
        <button className="quick-action-btn" onClick={() => showAlert('info', '📞 Iniciando interconsulta')}>
          <span className="action-icon">📞</span>
          <span className="action-label">Interconsulta</span>
        </button>
        <button className="quick-action-btn" onClick={() => showAlert('info', '📋 Abriendo historia clínica')}>
          <span className="action-icon">📋</span>
          <span className="action-label">Historia Clínica</span>
        </button>
      </div>
    </div>
  );
}

// Vista de inicio antigua (mantenida para compatibilidad)
function HomeView({ showAlert }) {
  return (
    <div className="fade-in">
      <div className="telemed-features">
        <div className="feature-card">
          <div className="feature-icon">👩‍⚕️</div>
          <h3>Consultas Virtuales</h3>
          <p>Videollamadas HD con pacientes, historial médico integrado y prescripciones digitales.</p>
          <button className="telemed-btn primary" onClick={() => showAlert('info', 'Funcionalidad en desarrollo')}>
            Iniciar Consulta
          </button>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Gestión de Pacientes</h3>
          <p>Base de datos completa con historiales, alergias, medicamentos y seguimiento.</p>
          <button className="telemed-btn secondary" onClick={() => showAlert('info', 'Acceso disponible en la sección Pacientes')}>
            Ver Pacientes
          </button>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>IA Médica Asistente</h3>
          <p>Diagnóstico asistido por IA, sugerencias de tratamiento y análisis de síntomas.</p>
          <button className="telemed-btn primary" onClick={() => showAlert('success', '🤖 IA Médica activada')}>
            Activar IA
          </button>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💊</div>
          <h3>Recetas Digitales</h3>
          <p>Prescripciones electrónicas seguras con firma digital y envío directo a farmacias.</p>
          <button className="telemed-btn secondary" onClick={() => showAlert('info', 'Sistema de recetas configurado')}>
            Crear Receta
          </button>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Analytics Médicos</h3>
          <p>Reportes detallados, estadísticas de consultas y métricas de rendimiento.</p>
          <button className="telemed-btn primary" onClick={() => showAlert('info', 'Reportes disponibles en sección correspondiente')}>
            Ver Analytics
          </button>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Seguridad HIPAA</h3>
          <p>Encriptación end-to-end, cumplimiento regulatorio y auditoría completa.</p>
          <button className="telemed-btn secondary" onClick={() => showAlert('success', '🔒 Seguridad verificada y activa')}>
            Verificar Seguridad
          </button>
        </div>
      </div>

      <div className="telemed-card">
        <h3>🚀 Estado del Sistema</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <strong>🔥 Firebase:</strong> 
            <span style={{ color: 'var(--telemed-success)', marginLeft: '8px' }}>
              {window.TELEMED_OFFLINE_MODE ? 'Modo Demo' : 'Conectado'}
            </span>
          </div>
          <div>
            <strong>📡 Servidor:</strong> 
            <span style={{ color: 'var(--telemed-success)', marginLeft: '8px' }}>Operativo</span>
          </div>
          <div>
            <strong>🛡️ Seguridad:</strong> 
            <span style={{ color: 'var(--telemed-success)', marginLeft: '8px' }}>SSL Activo</span>
          </div>
          <div>
            <strong>⚡ Rendimiento:</strong> 
            <span style={{ color: 'var(--telemed-success)', marginLeft: '8px' }}>Óptimo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vista de Agenda Médica Profesional
function MedicalAppointmentsView({ appointments, showAlert, userType }) {
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    patientName: '',
    date: '',
    time: '',
    speciality: '',
    priority: 'routine',
    complaint: '',
    insuranceProvider: '',
    observations: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showAlert('success', '✅ Cita médica agendada en el sistema hospitalario');
    setNewAppointment({ 
      patientId: '', patientName: '', date: '', time: '', 
      speciality: '', priority: 'routine', complaint: '', 
      insuranceProvider: '', observations: '' 
    });
  };

  return (
    <div className="fade-in">
      {userType === 'doctor' && (
        <div className="telemed-card">
          <h3>📋 Agendar Nueva Cita Médica</h3>
          <form className="medical-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>ID del Paciente</label>
                <input 
                  type="text" 
                  value={newAppointment.patientId}
                  onChange={(e) => setNewAppointment({...newAppointment, patientId: e.target.value})}
                  placeholder="P-12345678"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Nombre Completo del Paciente</label>
                <input 
                  type="text" 
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                  placeholder="Nombre y apellidos del paciente"
                  required 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Fecha de Cita</label>
                <input 
                  type="date" 
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Horario</label>
                <input 
                  type="time" 
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  required 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Especialidad Médica</label>
                <select 
                  value={newAppointment.speciality}
                  onChange={(e) => setNewAppointment({...newAppointment, speciality: e.target.value})}
                  required
                >
                  <option value="">Seleccionar especialidad</option>
                  <option value="cardiologia">Cardiología</option>
                  <option value="neurologia">Neurología</option>
                  <option value="medicina-general">Medicina General</option>
                  <option value="pediatria">Pediatría</option>
                  <option value="ginecologia">Ginecología</option>
                  <option value="traumatologia">Traumatología</option>
                </select>
              </div>
              <div className="form-group">
                <label>Prioridad</label>
                <select 
                  value={newAppointment.priority}
                  onChange={(e) => setNewAppointment({...newAppointment, priority: e.target.value})}
                >
                  <option value="routine">Rutina</option>
                  <option value="scheduled">Programada</option>
                  <option value="urgent">Urgente</option>
                  <option value="emergency">Emergencia</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Motivo de Consulta</label>
              <textarea 
                value={newAppointment.complaint}
                onChange={(e) => setNewAppointment({...newAppointment, complaint: e.target.value})}
                placeholder="Descripción detallada del motivo de consulta médica..."
                rows="3"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Previsión/Seguro</label>
                <select 
                  value={newAppointment.insuranceProvider}
                  onChange={(e) => setNewAppointment({...newAppointment, insuranceProvider: e.target.value})}
                >
                  <option value="">Seleccionar previsión</option>
                  <option value="fonasa">FONASA</option>
                  <option value="isapre">ISAPRE</option>
                  <option value="particular">Particular</option>
                  <option value="seguro-publico">Seguro Público</option>
                </select>
              </div>
            </div>
            <button type="submit" className="telemed-btn primary medical">
              📋 Agendar Cita Médica
            </button>
          </form>
        </div>
      )}

      <div className="telemed-card">
        <h3>🗓️ Agenda Médica del Día</h3>
        <div className="medical-appointments">
          {appointments.length > 0 ? appointments.map(appointment => (
            <div key={appointment.id} className={`medical-appointment-card ${appointment.status}`}>
              <div className="appointment-header">
                <div className="appointment-time-section">
                  <div className="appointment-time">{appointment.time}</div>
                  <div className={`priority-indicator ${appointment.status}`}>
                    {appointment.status === 'urgent' && '🚨 URGENTE'}
                    {appointment.status === 'scheduled' && '📋 PROGRAMADA'}
                    {appointment.status === 'routine' && '✅ RUTINA'}
                  </div>
                </div>
                <div className="patient-section">
                  <div className="patient-name">{appointment.patient}</div>
                  <div className="doctor-assigned">{appointment.doctor}</div>
                </div>
              </div>
              <div className="medical-complaint">
                <strong>Motivo:</strong> {appointment.complaint}
              </div>
              <div className="appointment-actions">
                <button className="action-btn primary" onClick={() => showAlert('success', '🏥 Iniciando teleconsulta médica...')}>
                  📹 Iniciar Consulta
                </button>
                <button className="action-btn secondary" onClick={() => showAlert('info', '📋 Abriendo historia clínica...')}>
                  📋 Historia Clínica
                </button>
                <button className="action-btn tertiary" onClick={() => showAlert('info', '💊 Abriendo recetario...')}>
                  💊 Prescribir
                </button>
                {appointment.status === 'urgent' && (
                  <button className="action-btn emergency" onClick={() => showAlert('warning', '🚨 Activando protocolo de emergencia')}>
                    🚨 Protocolo Emergencia
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className="no-appointments">
              <div className="no-appointments-icon">🗓️</div>
              <p>No hay citas médicas programadas para hoy</p>
              <small>El sistema está listo para recibir nuevas citas</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Vista de citas antigua (mantenida para compatibilidad)
function AppointmentsView({ appointments, showAlert }) {
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showAlert('success', '✅ Cita agendada correctamente');
    setNewAppointment({ patientName: '', date: '', time: '', reason: '' });
  };

  return (
    <div className="fade-in">
      <div className="telemed-card">
        <h3>📅 Agendar Nueva Cita</h3>
        <form className="telemed-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Paciente</label>
            <input 
              type="text" 
              value={newAppointment.patientName}
              onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
              placeholder="Nombre del paciente"
              required 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Fecha</label>
              <input 
                type="date" 
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label>Hora</label>
              <input 
                type="time" 
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Motivo de consulta</label>
            <textarea 
              value={newAppointment.reason}
              onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
              placeholder="Describe el motivo de la consulta..."
              rows="3"
            />
          </div>
          <button type="submit" className="telemed-btn primary">
            📅 Agendar Cita
          </button>
        </form>
      </div>

      <div className="telemed-card">
        <h3>🗓️ Citas Programadas</h3>
        <div className="telemed-appointments">
          {appointments.length > 0 ? appointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div>
                  <div className="appointment-time">{appointment.time} - {appointment.date}</div>
                  <div><strong>{appointment.patientName}</strong></div>
                </div>
                <div className={`appointment-status ${appointment.status}`}>
                  {appointment.status === 'scheduled' && '⏰ Programada'}
                  {appointment.status === 'completed' && '✅ Completada'}
                  {appointment.status === 'cancelled' && '❌ Cancelada'}
                </div>
              </div>
              <p>{appointment.reason}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button className="telemed-btn primary" onClick={() => showAlert('info', '💬 Abriendo consulta virtual...')}>
                  Iniciar Consulta
                </button>
                <button className="telemed-btn secondary" onClick={() => showAlert('info', '📝 Abriendo historial...')}>
                  Ver Historial
                </button>
              </div>
            </div>
          )) : (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
              📅 No hay citas programadas
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Vista de Historia Clínica Profesional
function MedicalPatientsView({ showAlert, userType }) {
  const [patients] = useState([
    { 
      id: 1, 
      name: 'María González', 
      rut: '12.345.678-9',
      email: 'maria@email.com', 
      phone: '+56912345678', 
      lastVisit: '2024-01-15',
      condition: 'Hipertensión arterial',
      risk: 'medio',
      insurance: 'FONASA A'
    },
    { 
      id: 2, 
      name: 'Ignacio Silva', 
      rut: '98.765.432-1',
      email: 'ignacio@email.com', 
      phone: '+56987654321', 
      lastVisit: '2024-01-10',
      condition: 'Post-operatorio',
      risk: 'alto',
      insurance: 'ISAPRE'
    },
    { 
      id: 3, 
      name: 'Claudia Torres', 
      rut: '11.222.333-4',
      email: 'claudia@email.com', 
      phone: '+56911223344', 
      lastVisit: '2024-01-08',
      condition: 'Control rutinario',
      risk: 'bajo',
      insurance: 'Particular'
    }
  ]);

  return (
    <div className="fade-in">
      {userType === 'doctor' && (
        <div className="telemed-card">
          <h3>👥 Gestión de Historia Clínica</h3>
          <div className="patient-actions">
            <button className="telemed-btn primary" onClick={() => showAlert('info', '➕ Formulario de nuevo paciente iniciado')}>
              ➕ Nuevo Paciente
            </button>
            <button className="telemed-btn secondary" onClick={() => showAlert('info', '🔍 Sistema de búsqueda activado')}>
              🔍 Búsqueda Avanzada
            </button>
            <button className="telemed-btn tertiary" onClick={() => showAlert('info', '📊 Generando reporte médico...')}>
              📊 Reportes Médicos
            </button>
          </div>
        </div>
      )}

      <div className="telemed-card">
        <h3>📋 Registro de Pacientes</h3>
        <div className="medical-patients-grid">
          {patients.map(patient => (
            <div key={patient.id} className={`patient-card risk-${patient.risk}`}>
              <div className="patient-header">
                <div className="patient-info">
                  <div className="patient-name">{patient.name}</div>
                  <div className="patient-rut">RUT: {patient.rut}</div>
                  <div className="patient-insurance">Previsión: {patient.insurance}</div>
                </div>
                <div className={`risk-indicator ${patient.risk}`}>
                  {patient.risk === 'alto' && '🔴 ALTO RIESGO'}
                  {patient.risk === 'medio' && '🟡 RIESGO MEDIO'}
                  {patient.risk === 'bajo' && '🟢 BAJO RIESGO'}
                </div>
              </div>
              <div className="patient-details">
                <p><strong>Condición:</strong> {patient.condition}</p>
                <p><strong>Última visita:</strong> {patient.lastVisit}</p>
                <p><strong>Contacto:</strong> {patient.phone}</p>
              </div>
              <div className="patient-actions">
                <button className="action-btn primary" onClick={() => showAlert('info', `📋 Abriendo historia clínica de ${patient.name}`)}>
                  📋 Historia Clínica
                </button>
                <button className="action-btn secondary" onClick={() => showAlert('info', `📅 Agendando cita para ${patient.name}`)}>
                  📅 Agendar Cita
                </button>
                <button className="action-btn tertiary" onClick={() => showAlert('info', `💊 Abriendo recetario de ${patient.name}`)}>
                  💊 Prescripciones
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Vista de pacientes antigua (mantenida para compatibilidad)
function PatientsView({ showAlert }) {
  const [patients] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', phone: '+1234567890', lastVisit: '2024-01-15' },
    { id: 2, name: 'María González', email: 'maria@email.com', phone: '+0987654321', lastVisit: '2024-01-10' }
  ]);

  return (
    <div className="fade-in">
      <div className="telemed-card">
        <h3>👥 Gestión de Pacientes</h3>
        <button className="telemed-btn primary" onClick={() => showAlert('info', '➕ Formulario de nuevo paciente en desarrollo')}>
          ➕ Agregar Paciente
        </button>
      </div>

      <div className="telemed-card">
        <h3>📋 Lista de Pacientes</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Nombre</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Teléfono</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Última Visita</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px' }}>{patient.name}</td>
                  <td style={{ padding: '12px' }}>{patient.email}</td>
                  <td style={{ padding: '12px' }}>{patient.phone}</td>
                  <td style={{ padding: '12px' }}>{patient.lastVisit}</td>
                  <td style={{ padding: '12px' }}>
                    <button className="telemed-btn secondary" style={{ marginRight: '8px' }} onClick={() => showAlert('info', '📋 Abriendo historial médico...')}>
                      Ver Historial
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Vista de Teleconsulta Médica Profesional
function MedicalConsultationView({ showAlert, userType }) {
  const [activeCall, setActiveCall] = useState(false);
  const [currentPatient] = useState({
    name: 'María González',
    age: 45,
    rut: '12.345.678-9',
    insurance: 'FONASA A',
    complaint: 'Dolor torácico intermitente',
    vitalSigns: {
      heartRate: '85 bpm',
      bloodPressure: '130/80 mmHg',
      temperature: '36.5°C',
      oxygen: '98%'
    }
  });

  return (
    <div className="fade-in">
      <div className="telemed-card">
        <h3>💬 Sistema de Teleconsulta Médica</h3>
        {!activeCall ? (
          <div className="consultation-setup">
            <div className="patient-selection">
              <h4>📋 Información del Paciente</h4>
              <div className="patient-info-card">
                <div className="info-row">
                  <strong>Paciente:</strong> {currentPatient.name}
                </div>
                <div className="info-row">
                  <strong>Edad:</strong> {currentPatient.age} años
                </div>
                <div className="info-row">
                  <strong>RUT:</strong> {currentPatient.rut}
                </div>
                <div className="info-row">
                  <strong>Previsión:</strong> {currentPatient.insurance}
                </div>
                <div className="info-row">
                  <strong>Motivo:</strong> {currentPatient.complaint}
                </div>
              </div>
            </div>
            
            <div className="pre-consultation-checks">
              <h4>✅ Verificaciones Pre-Consulta</h4>
              <div className="check-item">
                <span className="check-icon">🔒</span>
                <span>Conexión encriptada verificada</span>
              </div>
              <div className="check-item">
                <span className="check-icon">📋</span>
                <span>Historia clínica disponible</span>
              </div>
              <div className="check-item">
                <span className="check-icon">💊</span>
                <span>Sistema de prescripciones activo</span>
              </div>
              <div className="check-item">
                <span className="check-icon">🏥</span>
                <span>Protocolo de emergencia listo</span>
              </div>
            </div>

            <button className="telemed-btn primary large" onClick={() => { 
              setActiveCall(true); 
              showAlert('success', '📹 Teleconsulta médica iniciada con encriptación E2E'); 
            }}>
              📹 Iniciar Teleconsulta Segura
            </button>
          </div>
        ) : (
          <div className="active-consultation">
            <div className="consultation-header">
              <div className="patient-info">
                <strong>📹 Teleconsulta: {currentPatient.name}</strong>
                <span className="consultation-timer">⏱️ 00:15:30</span>
              </div>
              <div className="consultation-controls">
                <button className="control-btn" onClick={() => showAlert('info', '🔇 Micrófono silenciado')}>
                  🎤
                </button>
                <button className="control-btn" onClick={() => showAlert('info', '📹 Cámara desactivada')}>
                  📹
                </button>
                <button className="control-btn emergency" onClick={() => showAlert('warning', '🚨 Protocolo de emergencia activado')}>
                  🚨
                </button>
                <button className="control-btn danger" onClick={() => { 
                  setActiveCall(false); 
                  showAlert('info', '📴 Teleconsulta finalizada - Informe generado'); 
                }}>
                  ❌ Finalizar
                </button>
              </div>
            </div>

            <div className="consultation-content">
              <div className="video-section">
                <div className="video-placeholder">
                  <div className="video-icon">📹</div>
                  <p>Videollamada HD Activa</p>
                  <p><small>Conexión encriptada E2E</small></p>
                </div>
              </div>

              <div className="consultation-sidebar">
                <div className="vital-signs">
                  <h4>📊 Signos Vitales</h4>
                  <div className="vital-item">
                    <span>❤️ Frecuencia cardíaca:</span>
                    <span>{currentPatient.vitalSigns.heartRate}</span>
                  </div>
                  <div className="vital-item">
                    <span>🩸 Presión arterial:</span>
                    <span>{currentPatient.vitalSigns.bloodPressure}</span>
                  </div>
                  <div className="vital-item">
                    <span>🌡️ Temperatura:</span>
                    <span>{currentPatient.vitalSigns.temperature}</span>
                  </div>
                  <div className="vital-item">
                    <span>💨 Oxígeno:</span>
                    <span>{currentPatient.vitalSigns.oxygen}</span>
                  </div>
                </div>

                <div className="consultation-notes">
                  <h4>📝 Notas de Consulta</h4>
                  <textarea placeholder="Escribir observaciones médicas durante la consulta..."></textarea>
                </div>

                <div className="quick-actions">
                  <button className="quick-btn" onClick={() => showAlert('info', '💊 Abriendo recetario digital')}>
                    💊 Prescribir
                  </button>
                  <button className="quick-btn" onClick={() => showAlert('info', '📋 Solicitando exámenes')}>
                    📋 Exámenes
                  </button>
                  <button className="quick-btn" onClick={() => showAlert('info', '👨‍⚕️ Solicitando interconsulta')}>
                    👨‍⚕️ Interconsulta
                  </button>
                </div>
              </div>
            </div>

            <div className="consultation-chat">
              <div className="chat-messages">
                <div className="message doctor">
                  <strong>Dr. Reyes:</strong> Buenos días María, ¿cómo se siente hoy?
                </div>
                <div className="message patient">
                  <strong>María:</strong> Doctor, el dolor en el pecho ha disminuido desde ayer.
                </div>
              </div>
              <div className="chat-input">
                <input placeholder="Escribir mensaje en chat médico seguro..." />
                <button className="send-btn" onClick={() => showAlert('info', '💬 Mensaje enviado en canal seguro')}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Vista de Recetario Digital Profesional
function MedicalPrescriptionsView({ showAlert, userType }) {
  const [prescriptions] = useState([
    {
      id: 'RX-2025-001',
      patient: 'María González',
      date: '2025-01-15',
      medications: [
        { drug: 'Enalapril 10mg', dosage: '1 comp cada 12 hrs', duration: '30 días' },
        { drug: 'Metformina 850mg', dosage: '1 comp con desayuno y cena', duration: '30 días' }
      ],
      status: 'active'
    },
    {
      id: 'RX-2025-002',
      patient: 'Ignacio Silva',
      date: '2025-01-14',
      medications: [
        { drug: 'Ibuprofeno 600mg', dosage: '1 comp cada 8 hrs', duration: '7 días' }
      ],
      status: 'dispensed'
    }
  ]);

  return (
    <div className="fade-in">
      <div className="telemed-card">
        <h3>💊 Recetario Digital Profesional</h3>
        <div className="prescription-actions">
          <button className="telemed-btn primary" onClick={() => showAlert('info', '📝 Abriendo formulario de nueva receta')}>
            📝 Nueva Receta
          </button>
          <button className="telemed-btn secondary" onClick={() => showAlert('info', '🔍 Sistema de búsqueda de medicamentos activo')}>
            🔍 Buscar Medicamentos
          </button>
          <button className="telemed-btn tertiary" onClick={() => showAlert('info', '📊 Generando reporte de prescripciones')}>
            📊 Reporte Prescripciones
          </button>
        </div>
      </div>

      <div className="telemed-card">
        <h3>📋 Recetas Digitales Activas</h3>
        <div className="prescriptions-list">
          {prescriptions.map(prescription => (
            <div key={prescription.id} className={`prescription-card ${prescription.status}`}>
              <div className="prescription-header">
                <div className="prescription-id">📝 {prescription.id}</div>
                <div className={`prescription-status ${prescription.status}`}>
                  {prescription.status === 'active' && '✅ ACTIVA'}
                  {prescription.status === 'dispensed' && '💊 DISPENSADA'}
                </div>
              </div>
              <div className="prescription-info">
                <p><strong>Paciente:</strong> {prescription.patient}</p>
                <p><strong>Fecha:</strong> {prescription.date}</p>
              </div>
              <div className="medications-list">
                <h4>💊 Medicamentos Prescritos:</h4>
                {prescription.medications.map((med, index) => (
                  <div key={index} className="medication-item">
                    <div className="med-name">{med.drug}</div>
                    <div className="med-details">
                      <span>📋 {med.dosage}</span>
                      <span>⏱️ {med.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="prescription-actions">
                <button className="action-btn primary" onClick={() => showAlert('info', `📄 Imprimiendo receta ${prescription.id}`)}>
                  📄 Imprimir
                </button>
                <button className="action-btn secondary" onClick={() => showAlert('info', `📧 Enviando receta digital ${prescription.id}`)}>
                  📧 Enviar Digital
                </button>
                <button className="action-btn tertiary" onClick={() => showAlert('info', `📝 Modificando receta ${prescription.id}`)}>
                  📝 Modificar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Vista de Emergencias Médicas
function MedicalEmergencyView({ showAlert, userType }) {
  const [emergencyProtocols] = useState([
    { code: 'CODE-BLUE', name: 'Paro Cardiorespiratorio', color: 'blue' },
    { code: 'CODE-RED', name: 'Emergencia Cardiovascular', color: 'red' },
    { code: 'CODE-STROKE', name: 'Accidente Cerebrovascular', color: 'orange' },
    { code: 'CODE-TRAUMA', name: 'Trauma Mayor', color: 'yellow' }
  ]);

  return (
    <div className="fade-in">
      <div className="emergency-header">
        <h2>🚨 SISTEMA DE EMERGENCIAS MÉDICAS</h2>
        <div className="emergency-status">
          <span className="status-indicator active">🟢 SISTEMA ACTIVO</span>
          <span className="emergency-time">⏰ {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="emergency-protocols">
        <h3>📋 Protocolos de Emergencia</h3>
        <div className="protocols-grid">
          {emergencyProtocols.map(protocol => (
            <button 
              key={protocol.code}
              className={`protocol-btn ${protocol.color}`}
              onClick={() => showAlert('warning', `🚨 Protocolo ${protocol.code} activado - Equipo de emergencia notificado`)}
            >
              <div className="protocol-code">{protocol.code}</div>
              <div className="protocol-name">{protocol.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="emergency-contacts">
        <h3>📞 Contactos de Emergencia</h3>
        <div className="contacts-grid">
          <div className="contact-card">
            <div className="contact-icon">🚑</div>
            <div className="contact-info">
              <div className="contact-name">SAMU</div>
              <div className="contact-number">131</div>
            </div>
            <button className="contact-btn" onClick={() => showAlert('info', '📞 Marcando SAMU 131...')}>
              📞 Llamar
            </button>
          </div>
          <div className="contact-card">
            <div className="contact-icon">🚒</div>
            <div className="contact-info">
              <div className="contact-name">Bomberos</div>
              <div className="contact-number">132</div>
            </div>
            <button className="contact-btn" onClick={() => showAlert('info', '📞 Marcando Bomberos 132...')}>
              📞 Llamar
            </button>
          </div>
          <div className="contact-card">
            <div className="contact-icon">👮</div>
            <div className="contact-info">
              <div className="contact-name">Carabineros</div>
              <div className="contact-number">133</div>
            </div>
            <button className="contact-btn" onClick={() => showAlert('info', '📞 Marcando Carabineros 133...')}>
              📞 Llamar
            </button>
          </div>
        </div>
      </div>

      <div className="emergency-procedures">
        <h3>📋 Procedimientos de Emergencia Activos</h3>
        <div className="procedure-alert urgent">
          <div className="alert-header">
            <span className="alert-icon">🚨</span>
            <span className="alert-title">ALERTA CRÍTICA</span>
            <span className="alert-time">15:20</span>
          </div>
          <div className="alert-content">
            <p><strong>Paciente:</strong> María González</p>
            <p><strong>Síntomas:</strong> Dolor torácico intenso, dificultad respiratoria</p>
            <p><strong>Protocolo:</strong> CODE-RED activado</p>
          </div>
          <div className="alert-actions">
            <button className="emergency-btn primary" onClick={() => showAlert('success', '🚑 Ambulancia despachada - ETA: 8 minutos')}>
              🚑 Despachar Ambulancia
            </button>
            <button className="emergency-btn secondary" onClick={() => showAlert('info', '📞 Contactando especialista...')}>
              📞 Contactar Cardiólogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vista de consulta antigua (mantenida para compatibilidad)
function ConsultationView({ showAlert }) {
  const [activeCall, setActiveCall] = useState(false);

  return (
    <div className="fade-in">
      <div className="telemed-card">
        <h3>💬 Consulta Virtual</h3>
        {!activeCall ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Selecciona un paciente para iniciar una videoconsulta</p>
            <button className="telemed-btn primary" onClick={() => { setActiveCall(true); showAlert('success', '📹 Videollamada iniciada'); }}>
              📹 Iniciar Videollamada Demo
            </button>
          </div>
        ) : (
          <div>
            <div className="telemed-chat">
              <div className="chat-header">
                <strong>📹 Consulta con Juan Pérez</strong>
                <button className="telemed-btn danger" onClick={() => { setActiveCall(false); showAlert('info', '📴 Videollamada finalizada'); }}>
                  Finalizar
                </button>
              </div>
              <div className="chat-messages" style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📹</div>
                  <p>Videollamada activa - Modo Demo</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>En producción aquí aparecería el video en tiempo real</p>
                </div>
              </div>
              <div className="chat-input">
                <input placeholder="Escribir mensaje..." />
                <button className="telemed-btn primary">Enviar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Vista de reportes
function ReportsView({ showAlert }) {
  return (
    <div className="fade-in">
      <div className="telemed-card">
        <h3>📊 Analytics Médicos</h3>
        <div className="telemed-features">
          <div className="feature-card">
            <h4>📈 Consultas del Mes</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--telemed-primary)' }}>156</div>
            <p>↑ 12% vs mes anterior</p>
          </div>
          <div className="feature-card">
            <h4>👥 Pacientes Activos</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--telemed-secondary)' }}>89</div>
            <p>↑ 8% vs mes anterior</p>
          </div>
          <div className="feature-card">
            <h4>⭐ Satisfacción</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--telemed-warning)' }}>4.8</div>
            <p>Promedio de calificaciones</p>
          </div>
        </div>
      </div>

      <div className="telemed-card">
        <h3>📋 Reportes Disponibles</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          <button className="telemed-btn secondary" onClick={() => showAlert('info', '📄 Generando reporte de consultas...')}>
            📄 Reporte de Consultas Mensuales
          </button>
          <button className="telemed-btn secondary" onClick={() => showAlert('info', '💰 Generando reporte financiero...')}>
            💰 Reporte Financiero
          </button>
          <button className="telemed-btn secondary" onClick={() => showAlert('info', '🏥 Generando reporte de rendimiento...')}>
            🏥 Reporte de Rendimiento
          </button>
        </div>
      </div>
    </div>
  );
}

// Renderizar la aplicación
ReactDOM.render(<TeleMedApp />, document.getElementById('telemed-app'));

console.log('🏥 TeleMed Web App inicializada correctamente');