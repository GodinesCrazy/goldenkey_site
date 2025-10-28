// Configuración de Firebase para la versión web
const firebaseConfig = {
  // Configuración para desarrollo/testing
  apiKey: "demo-api-key",
  authDomain: "demo-telemed.firebaseapp.com",
  projectId: "demo-telemed",
  storageBucket: "demo-telemed.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Inicializar Firebase
let app, auth, firestore, storage;

try {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  firestore = firebase.firestore();
  storage = firebase.storage();
  
  // Configurar emuladores para desarrollo local
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('🔥 Conectando a Firebase Emulators...');
    
    // Emulators (ajustar puertos según configuración local)
    auth.useEmulator('http://localhost:9199');
    firestore.useEmulator('localhost', 8180);
    storage.useEmulator('localhost', 9299);
  }
  
  console.log('✅ Firebase inicializado correctamente');
} catch (error) {
  console.warn('⚠️ Firebase no disponible, usando modo offline:', error.message);
  
  // Modo offline/demo
  window.TELEMED_OFFLINE_MODE = true;
}

// Funciones auxiliares de Firebase
window.FirebaseHelpers = {
  // Autenticación
  async signInWithEmail(email, password) {
    if (window.TELEMED_OFFLINE_MODE) {
      return { user: { uid: 'demo-user', email: email } };
    }
    return await auth.signInWithEmailAndPassword(email, password);
  },
  
  async signUpWithEmail(email, password) {
    if (window.TELEMED_OFFLINE_MODE) {
      return { user: { uid: 'demo-user-' + Date.now(), email: email } };
    }
    return await auth.createUserWithEmailAndPassword(email, password);
  },
  
  async signOut() {
    if (window.TELEMED_OFFLINE_MODE) return;
    return await auth.signOut();
  },
  
  getCurrentUser() {
    if (window.TELEMED_OFFLINE_MODE) {
      return { uid: 'demo-user', email: 'demo@telemed.com' };
    }
    return auth.currentUser;
  },
  
  // Firestore
  async saveDocument(collection, doc, data) {
    if (window.TELEMED_OFFLINE_MODE) {
      console.log('💾 Guardando en modo demo:', collection, doc, data);
      return;
    }
    return await firestore.collection(collection).doc(doc).set(data);
  },
  
  async getDocument(collection, doc) {
    if (window.TELEMED_OFFLINE_MODE) {
      // Datos demo
      const demoData = {
        'users/demo-user': {
          name: 'Dr. Demo',
          email: 'demo@telemed.com',
          role: 'doctor',
          specialty: 'Medicina General'
        }
      };
      return { exists: true, data: () => demoData[`${collection}/${doc}`] };
    }
    return await firestore.collection(collection).doc(doc).get();
  },
  
  async getCollection(collection, query = null) {
    if (window.TELEMED_OFFLINE_MODE) {
      // Datos demo
      const demoCollections = {
        appointments: [
          {
            id: 'apt1',
            patientName: 'Juan Pérez',
            date: new Date().toISOString().split('T')[0],
            time: '10:00',
            status: 'scheduled',
            reason: 'Consulta general'
          },
          {
            id: 'apt2',
            patientName: 'María González',
            date: new Date().toISOString().split('T')[0],
            time: '11:30',
            status: 'completed',
            reason: 'Control rutinario'
          }
        ],
        patients: [
          {
            id: 'pat1',
            name: 'Juan Pérez',
            email: 'juan@email.com',
            phone: '+1234567890',
            birthDate: '1990-01-01'
          }
        ]
      };
      
      return {
        docs: (demoCollections[collection] || []).map(item => ({
          id: item.id,
          data: () => item
        }))
      };
    }
    
    let ref = firestore.collection(collection);
    if (query) {
      // Aplicar filtros de query si se proporcionan
      query.forEach(([field, operator, value]) => {
        ref = ref.where(field, operator, value);
      });
    }
    return await ref.get();
  }
};

console.log('🔧 Firebase configurado para TeleMed Web');