// hospitals-loader.js - Gestion du chargement des hôpitaux

class HospitalsLoader {
    constructor() {
        this.hospitals = JSON.parse(localStorage.getItem('hospitals')) || this.getDefaultHospitals();
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.currentFilter = null;
        this.currentSearch = '';
    }

    getDefaultHospitals() {
        return [
            {
                id: 1,
                name: "Hôpital Principal de Dakar",
                address: "Avenue Nelson Mandela, Dakar",
                phone: "+221 33 839 50 50",
                services: ["Consultation Générale", "Urgences", "Radiologie", "Laboratoire"],
                description: "Hôpital public principal de Dakar offrant une large gamme de services médicaux.",
                location: { lat: 14.6928, lng: -17.4467 },
                waitingTime: 45,
                rating: 4.2,
                image: "images/hospitals/hopital1.jpg",
                openingHours: {
                    monday: "08:00 - 18:00",
                    tuesday: "08:00 - 18:00",
                    wednesday: "08:00 - 18:00",
                    thursday: "08:00 - 18:00",
                    friday: "08:00 - 17:00",
                    saturday: "09:00 - 13:00",
                    sunday: "Urgences uniquement"
                }
            },
            {
                id: 2,
                name: "Centre Hospitalier Universitaire de Fann",
                address: "Route des Almadies, Dakar",
                phone: "+221 33 869 10 10",
                services: ["Consultation Générale", "Pédiatrie", "Cardiologie", "Ophtalmologie", "Dermatologie"],
                description: "Centre hospitalier universitaire spécialisé dans la recherche et les soins avancés.",
                location: { lat: 14.7167, lng: -17.4667 },
                waitingTime: 60,
                rating: 4.5,
                image: "images/hospitals/hopital2.jpg",
                openingHours: {
                    monday: "07:30 - 19:00",
                    tuesday: "07:30 - 19:00",
                    wednesday: "07:30 - 19:00",
                    thursday: "07:30 - 19:00",
                    friday: "07:30 - 18:00",
                    saturday: "08:00 - 14:00",
                    sunday: "Urgences uniquement"
                }
            },
            {
                id: 3,
                name: "Hôpital Aristide Le Dantec",
                address: "Avenue Pasteur, Dakar",
                phone: "+221 33 822 24 24",
                services: ["Urgences", "Chirurgie", "Maternité", "Pharmacie", "Consultation Générale"],
                description: "Hôpital de référence pour la chirurgie et la maternité à Dakar.",
                location: { lat: 14.6769, lng: -17.4456 },
                waitingTime: 30,
                rating: 4.0,
                image: "images/hospitals/hopital3.jpg",
                openingHours: {
                    monday: "24/7",
                    tuesday: "24/7",
                    wednesday: "24/7",
                    thursday: "24/7",
                    friday: "24/7",
                    saturday: "24/7",
                    sunday: "24/7"
                }
            },
            {
                id: 4,
                name: "Centre de Santé de Grand Yoff",
                address: "Grand Yoff, Dakar",
                phone: "+221 33 820 20 20",
                services: ["Consultation Générale", "Vaccination", "Planning Familial", "Pédiatrie"],
                description: "Centre de santé de proximité offrant des services médicaux de base.",
                location: { lat: 14.7417, lng: -17.4589 },
                waitingTime: 20,
                rating: 3.8,
                image: "images/hospitals/hopital4.jpg",
                openingHours: {
                    monday: "08:00 - 17:00",
                    tuesday: "08:00 - 17:00",
                    wednesday: "08:00 - 17:00",
                    thursday: "08:00 - 17:00",
                    friday: "08:00 - 16:00",
                    saturday: "08:00 - 12:00",
                    sunday: "Fermé"
                }
            },
            {
                id: 5,
                name: "Hôpital Régional de Thiès",
                address: "Thiès, Sénégal",
                phone: "+221 33 951 10 10",
                services: ["Consultation Générale", "Urgences", "Radiologie", "Laboratoire", "Chirurgie"],
                description: "Hôpital régional desservant la région de Thiès et ses environs.",
                location: { lat: 14.7900, lng: -16.9256 },
                waitingTime: 40,
                rating: 4.1,
                image: "images/hospitals/hopital5.jpg",
                openingHours: {
                    monday: "07:00 - 20:00",
                    tuesday: "07:00 - 20:00",
                    wednesday: "07:00 - 20:00",
                    thursday: "07:00 - 20:00",
                    friday: "07:00 - 19:00",
                    saturday: "08:00 - 16:00",
                    sunday: "Urgences uniquement"
                }
            },
            {
                id: 6,
                name: "Centre Médical de Mermoz",
                address: "Mermoz, Dakar",
                phone: "+221 33 860 60 60",
                services: ["Consultation Générale", "Dentiste", "Pédiatrie", "Gynécologie", "Analyse Médicale"],
                description: "Centre médical moderne offrant des consultations spécialisées.",
                location: { lat: 14.7083, lng: -17.4697 },
                waitingTime: 25,
                rating: 4.3,
                image: "images/hospitals/hopital6.jpg",
                openingHours: {
                    monday: "08:00 - 19:00",
                    tuesday: "08:00 - 19:00",
                    wednesday: "08:00 - 19:00",
                    thursday: "08:00 - 19:00",
                    friday: "08:00 - 18:00",
                    saturday: "09:00 - 15:00",
                    sunday: "Fermé"
                }
            },
            {
                id: 7,
                name: "Hôpital de l'Enfant de Diamniadio",
                address: "Diamniadio, Dakar",
                phone: "+221 33 855 55 55",
                services: ["Pédiatrie", "Urgences Pédiatriques", "Vaccination", "Nutrition"],
                description: "Hôpital spécialisé dans les soins aux enfants et adolescents.",
                location: { lat: 14.7139, lng: -17.4450 },
                waitingTime: 35,
                rating: 4.6,
                image: "images/hospitals/hopital7.jpg",
                openingHours: {
                    monday: "24/7",
                    tuesday: "24/7",
                    wednesday: "24/7",
                    thursday: "24/7",
                    friday: "24/7",
                    saturday: "24/7",
                    sunday: "24/7"
                }
            },
            {
                id: 8,
                name: "Centre Hospitalier de Pikine",
                address: "Pikine, Dakar",
                phone: "+221 33 834 40 40",
                services: ["Consultation Générale", "Urgences", "Maternité", "Radiologie"],
                description: "Centre hospitalier de district desservant la banlieue de Dakar.",
                location: { lat: 14.7500, lng: -17.4000 },
                waitingTime: 50,
                rating: 3.9,
                image: "images/hospitals/hopital8.jpg",
                openingHours: {
                    monday: "08:00 - 20:00",
                    tuesday: "08:00 - 20:00",
                    wednesday: "08:00 - 20:00",
                    thursday: "08:00 - 20:00",
                    friday: "08:00 - 19:00",
                    saturday: "09:00 - 17:00",
                    sunday: "Urgences uniquement"
                }
            },
            {
                id: 9,
                name: "Polyclinique de la Madeleine",
                address: "Plateau, Dakar",
                phone: "+221 33 821 21 21",
                services: ["Consultation Générale", "Dentiste", "Ophtalmologie", "Dermatologie", "Kinésithérapie"],
                description: "Polyclinique privée conventionnée offrant des consultations spécialisées.",
                location: { lat: 14.6681, lng: -17.4303 },
                waitingTime: 15,
                rating: 4.4,
                image: "images/hospitals/hopital9.jpg",
                openingHours: {
                    monday: "07:30 - 19:30",
                    tuesday: "07:30 - 19:30",
                    wednesday: "07:30 - 19:30",
                    thursday: "07:30 - 19:30",
                    friday: "07:30 - 18:30",
                    saturday: "08:00 - 16:00",
                    sunday: "Fermé"
                }
            },
            {
                id: 10,
                name: "Hôpital Militaire de Ouakam",
                address: "Ouakam, Dakar",
                phone: "+221 33 860 30 30",
                services: ["Consultation Générale", "Urgences", "Chirurgie", "Imagerie Médicale"],
                description: "Hôpital militaire ouvert au public pour certaines consultations.",
                location: { lat: 14.7222, lng: -17.4806 },
                waitingTime: 40,
                rating: 4.2,
                image: "images/hospitals/hopital10.jpg",
                openingHours: {
                    monday: "08:00 - 18:00",
                    tuesday: "08:00 - 18:00",
                    wednesday: "08:00 - 18:00",
                    thursday: "08:00 - 18:00",
                    friday: "08:00 - 17:00",
                    saturday: "09:00 - 13:00",
                    sunday: "Urgences uniquement"
                }
            }
        ];
    }

    // Charger les hôpitaux avec filtrage et pagination
    loadHospitals(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let filteredHospitals = [...this.hospitals];

        // Appliquer la recherche
        if (this.currentSearch) {
            const searchTerm = this.currentSearch.toLowerCase();
            filteredHospitals = filteredHospitals.filter(hospital =>
                hospital.name.toLowerCase().includes(searchTerm) ||
                hospital.address.toLowerCase().includes(searchTerm) ||
                hospital.services.some(service =>
                    service.toLowerCase().includes(searchTerm)
                ) ||
                hospital.description.toLowerCase().includes(searchTerm)
            );
        }

        // Appliquer le filtre par service
        if (this.currentFilter) {
            filteredHospitals = filteredHospitals.filter(hospital =>
                hospital.services.includes(this.currentFilter)
            );
        }

        // Appliquer le tri
        if (options.sortBy) {
            switch (options.sortBy) {
                case 'name':
                    filteredHospitals.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'waitingTime':
                    filteredHospitals.sort((a, b) => a.waitingTime - b.waitingTime);
                    break;
                case 'rating':
                    filteredHospitals.sort((a, b) => b.rating - a.rating);
                    break;
            }
        }

        // Pagination
        const totalPages = Math.ceil(filteredHospitals.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const hospitalsToDisplay = filteredHospitals.slice(startIndex, endIndex);

        // Afficher les hôpitaux
        this.renderHospitals(container, hospitalsToDisplay);

        // Afficher la pagination si nécessaire
        if (totalPages > 1) {
            this.renderPagination(containerId, totalPages);
        }

        // Mettre à jour les compteurs
        this.updateCounters(filteredHospitals.length);
    }

    // Rendre les cartes d'hôpitaux
    renderHospitals(container, hospitals) {
        container.innerHTML = '';

        if (hospitals.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-hospital" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h3>Aucun hôpital trouvé</h3>
                    <p>Aucun établissement ne correspond à votre recherche.</p>
                </div>
            `;
            return;
        }

        hospitals.forEach(hospital => {
            const card = this.createHospitalCard(hospital);
            container.appendChild(card);
        });
    }

    // Créer une carte d'hôpital
    createHospitalCard(hospital) {
        const card = document.createElement('div');
        card.className = 'hospital-card';
        
        // Utiliser une image locale basée sur l'ID
        const imageUrl = this.getHospitalImage(hospital.id);
        
        card.innerHTML = `
            <div class="hospital-card-image">
                <img src="${imageUrl}" alt="${hospital.name}">
                <div class="hospital-card-rating">
                    <i class="fas fa-star"></i>
                    <span>${hospital.rating.toFixed(1)}</span>
                </div>
            </div>
            <div class="hospital-card-content">
                <div class="hospital-header">
                    <div>
                        <h3 class="hospital-name">${hospital.name}</h3>
                        <span class="hospital-type">${hospital.type || 'Hôpital'}</span>
                    </div>
                </div>
                <div class="hospital-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${hospital.address || ''}</span>
                </div>
                <div class="hospital-info">
                    <i class="fas fa-phone"></i>
                    <span>${hospital.phone || ''}</span>
                </div>
                <div class="waiting-time">
                    <i class="fas fa-clock"></i>
                    <strong>Temps d'attente estimé:</strong> ${hospital.waitingTime ? (typeof hospital.waitingTime === 'number' ? hospital.waitingTime + ' min' : hospital.waitingTime) : 'N/A'}
                </div>
                <div class="hospital-services">
                    <p><strong>Services disponibles:</strong></p>
                    <div class="service-tags">
                        ${hospital.services?.slice(0,4).map(s => `<span class="service-tag"><i class="fas fa-check-circle"></i>${s}</span>`).join('') || ''}
                        ${hospital.services && hospital.services.length > 4 ? `<span class="service-tag">+${hospital.services.length - 4} autres</span>` : ''}
                    </div>
                </div>
                <p style="margin-top: 15px; color: var(--text-light); font-size: 0.95rem;">${hospital.description || ''}</p>
                <div class="hospital-actions">
                    <a href="appointment.html?hospital=${hospital.id}" class="btn btn-outline" style="flex:1;"><i class="fas fa-calendar-check"></i> Prendre RDV</a>
                    <a href="hospital-details.html?hospital=${hospital.id}" class="btn btn-secondary"><i class="fas fa-info-circle"></i> Détails</a>
                </div>
            </div>
        `;
        
        return card;
    }
    

    getHospitalImage(id) {
        // Chemins vers les images locales
        const images = {
            1: "images/hospitals/hopital1.jpg",
            2: "images/hospitals/hopital2.jpg",
            3: "images/hospitals/hopital3.jpg",
            4: "images/hospitals/hopital4.jpg",
            5: "images/hospitals/hopital5.jpg",
            6: "images/hospitals/hopital6.jpg",
            7: "images/hospitals/hopital7.jpg",
            8: "images/hospitals/hopital8.jpg",
            9: "images/hospitals/hopital9.jpg",
            10: "images/hospitals/hopital10.jpg"
        };
        
        // Si l'image n'existe pas, utiliser la première
        return images[id] || "images/hospitals/hopital1.jpg";
    }
    
    // Rendre la pagination
    renderPagination(containerId, totalPages) {
        const container = document.getElementById(containerId);
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        
        let paginationHTML = `
            <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="hospitalsLoader.prevPage('${containerId}')">
                <i class="fas fa-chevron-left"></i> Précédent
            </button>
            
            <div class="pagination-numbers">
        `;

        // Afficher les numéros de page
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `
                    <button class="pagination-number ${i === this.currentPage ? 'active' : ''}"
                            onclick="hospitalsLoader.goToPage(${i}, '${containerId}')">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        paginationHTML += `
            </div>
            
            <button class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}"
                    onclick="hospitalsLoader.nextPage('${containerId}')">
                Suivant <i class="fas fa-chevron-right"></i>
            </button>
        `;

        paginationContainer.innerHTML = paginationHTML;
        container.parentNode.insertBefore(paginationContainer, container.nextSibling);
    }

    // Mettre à jour les compteurs
    updateCounters(totalItems) {
        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(start + this.itemsPerPage - 1, totalItems);
        
        const counterElement = document.getElementById('hospitals-counter');
        if (counterElement) {
            counterElement.textContent = `Affichage de ${start} à ${end} sur ${totalItems} hôpitaux`;
        }
    }

    // Méthodes de pagination
    nextPage(containerId) {
        const totalItems = this.getFilteredHospitals().length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.loadHospitals(containerId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    prevPage(containerId) {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadHospitals(containerId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    goToPage(page, containerId) {
        const totalItems = this.getFilteredHospitals().length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        if (page >= 1 && page <= totalPages && page !== this.currentPage) {
            this.currentPage = page;
            this.loadHospitals(containerId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Rechercher des hôpitaux
    searchHospitals(searchTerm, containerId) {
        this.currentSearch = searchTerm;
        this.currentPage = 1;
        this.loadHospitals(containerId);
    }

    // Filtrer par service
    filterByService(service, containerId) {
        this.currentFilter = service === 'all' ? null : service;
        this.currentPage = 1;
        this.loadHospitals(containerId);
    }

    // Trier les hôpitaux
    sortHospitals(sortBy, containerId, userLocation = null) {
        this.loadHospitals(containerId, { sortBy, userLocation });
    }

    // Obtenir les hôpitaux filtrés
    getFilteredHospitals() {
        let filteredHospitals = [...this.hospitals];

        if (this.currentSearch) {
            const searchTerm = this.currentSearch.toLowerCase();
            filteredHospitals = filteredHospitals.filter(hospital =>
                hospital.name.toLowerCase().includes(searchTerm) ||
                hospital.address.toLowerCase().includes(searchTerm) ||
                hospital.services.some(service =>
                    service.toLowerCase().includes(searchTerm)
                )
            );
        }

        if (this.currentFilter) {
            filteredHospitals = filteredHospitals.filter(hospital =>
                hospital.services.includes(this.currentFilter)
            );
        }

        return filteredHospitals;
    }

    // Distance/localisation helpers removed (feature disabled)

    // Obtenir un hôpital par ID 
    getHospitalById(id) {
        return this.hospitals.find(hospital => hospital.id === parseInt(id));
    }

    // Obtenir tous les services disponibles
    getAllServices() {
        const services = new Set();
        this.hospitals.forEach(hospital => {
            hospital.services.forEach(service => services.add(service));
        });
        return Array.from(services).sort();
    }

    // getNearbyHospitals removed — localisation handled elsewhere if needed
}

// Initialiser le chargeur d'hôpitaux
const hospitalsLoader = new HospitalsLoader();

// Exporter pour utilisation globale
if (typeof window !== 'undefined') {
    window.hospitalsLoader = hospitalsLoader;
}