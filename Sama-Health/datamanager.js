/**
 * Sama Health - Central Data Manager
 * Handles state, persistence, and complex data operations.
 */
class DataManager {
    constructor() {
        this.STORAGE_KEY = 'samaHealth_v2_data';
        this.state = {
            hospitals: [],
            appointments: [],
            tickets: [],
            users: [],
            currentUser: JSON.parse(localStorage.getItem('samaHealth_currentUser')) || null,
            settings: {
                notifications: true,
                darkMode: false
            }
        };

        this.init();
    }

    async init() {
        this.loadState();
        if (this.state.hospitals.length === 0) {
            this.seedInitialData();
        }
        this.setupPersistence();
    }

    /**
     * PERSISTENCE LAYER
     */
    loadState() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }

    saveState() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
            if (this.state.currentUser) {
                localStorage.setItem('samaHealth_currentUser', JSON.stringify(this.state.currentUser));
            } else {
                localStorage.removeItem('samaHealth_currentUser');
            }
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    }

    setupPersistence() {
        // Auto-save on change (debounced conceptually)
        window.addEventListener('beforeunload', () => this.saveState());
        
        // Sync across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === this.STORAGE_KEY) this.loadState();
        });
    }

    /**
     * SEEDING
     */
    seedInitialData() {
        this.state.hospitals = [
            {
                id: 1,
                name: "Hôpital Principal de Dakar",
                address: "Avenue Nelson Mandela, Dakar",
                phone: "+221 33 839 50 50",
                services: ["Consultation Générale", "Urgences", "Radiologie", "Laboratoire"],
                description: "Établissement de référence offrant des soins multidisciplinaires de haute qualité.",
                waitingTime: 45,
                rating: 4.8,
                image: "images/hospitals/hopital1.jpg",
                coords: { lat: 14.6928, lng: -17.4467 },
                price: 5000
            },
            {
                id: 2,
                name: "CHU Fann",
                address: "Route des Almadies, Dakar",
                phone: "+221 33 869 10 10",
                services: ["Consultation Générale", "Pédiatrie", "Cardiologie", "Neurologie"],
                description: "Spécialisé dans les pathologies complexes et la recherche médicale.",
                waitingTime: 60,
                rating: 4.5,
                image: "images/hospitals/hopital2.jpg",
                coords: { lat: 14.7167, lng: -17.4667 },
                price: 7000
            },
            {
                id: 3,
                name: "Hôpital Aristide Le Dantec",
                address: "Avenue Pasteur, Dakar",
                phone: "+221 33 822 24 24",
                services: ["Chirurgie", "Maternité", "Urgences", "Oncologie"],
                description: "Le plus ancien hôpital du Sénégal, reconnu pour son expertise chirurgicale.",
                waitingTime: 30,
                rating: 4.2,
                image: "images/hospitals/hopital3.jpg",
                coords: { lat: 14.6769, lng: -17.4456 },
                price: 10000
            },
            {
                id: 4,
                name: "Centre de Santé Grand Yoff",
                address: "Grand Yoff, Dakar",
                phone: "+221 33 820 20 20",
                services: ["Consultation Générale", "Vaccination", "Pédiatrie"],
                description: "Soins de proximité accessibles à tous les citoyens.",
                waitingTime: 20,
                rating: 4.0,
                image: "images/hospitals/hopital4.jpg",
                coords: { lat: 14.7417, lng: -17.4589 },
                price: 3000
            }
        ];
        this.saveState();
    }

    /**
     * AUTHENTICATION
     */
    login(email, password) {
        const user = this.state.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.state.currentUser = { ...user };
            delete this.state.currentUser.password; // Security: don't keep password in active session
            this.saveState();
            return { success: true, user: this.state.currentUser };
        }
        return { success: false, message: "Email ou mot de passe incorrect." };
    }

    signup(userData) {
        if (this.state.users.some(u => u.email === userData.email)) {
            return { success: false, message: "Cet email est déjà utilisé." };
        }
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        this.state.users.push(newUser);
        this.saveState();
        return this.login(userData.email, userData.password);
    }

    logout() {
        this.state.currentUser = null;
        this.saveState();
        window.location.href = 'index.html';
    }

    /**
     * HOSPITAL OPERATIONS
     */
    getHospitals(filters = {}) {
        let results = [...this.state.hospitals];

        if (filters.search) {
            const query = filters.search.toLowerCase();
            results = results.filter(h => 
                h.name.toLowerCase().includes(query) || 
                h.services.some(s => s.toLowerCase().includes(query))
            );
        }

        if (filters.specialty && filters.specialty !== 'all') {
            results = results.filter(h => h.services.includes(filters.specialty));
        }

        if (filters.sortBy) {
            results.sort((a, b) => {
                if (filters.sortBy === 'waiting') return a.waitingTime - b.waitingTime;
                if (filters.sortBy === 'rating') return b.rating - a.rating;
                return 0;
            });
        }

        return results;
    }

    getHospitalById(id) {
        return this.state.hospitals.find(h => h.id === parseInt(id));
    }

    /**
     * APPOINTMENTS & TICKETS
     */
    createAppointment(data) {
        const appointment = {
            id: `APT-${Date.now()}`,
            userId: this.state.currentUser?.id,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            ...data
        };
        this.state.appointments.push(appointment);
        this.saveState();
        return appointment;
    }

    getUserAppointments() {
        if (!this.state.currentUser) return [];
        return this.state.appointments.filter(a => a.userId === this.state.currentUser.id);
    }

    createTicket(hospitalId, service) {
        const ticket = {
            id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
            hospitalId,
            service,
            userId: this.state.currentUser?.id,
            status: 'active',
            date: new Date().toISOString()
        };
        this.state.tickets.push(ticket);
        this.saveState();
        return ticket;
    }
}

// Global Singleton
window.dataManager = new DataManager();
