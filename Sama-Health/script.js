/**
 * Sama Health - Global UI Controller
 * Version: 2.1 (Production-Ready)
 */

class UIController {
    constructor() {
        this.dataManager = window.dataManager;
        this.lastScroll = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAuthUI();
        this.initAnimations();
        this.handlePWA();
        this.initNavbarScroll();
    }

    /**
     * AUTH UI & NAVIGATION
     */
    updateAuthUI() {
        const authLinks = document.querySelector('.auth-links');
        const user = this.dataManager?.state?.currentUser;

        if (authLinks) {
            if (user) {
                authLinks.innerHTML = `
                    <div class="user-menu">
                        <a href="profile.html" class="nav-user">
                            <i class="fas fa-user-circle"></i>
                            <span>${user.fullName.split(' ')[0]}</span>
                        </a>
                        <button id="logout-btn" class="btn btn-outline btn-sm">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                `;
                document.getElementById('logout-btn')?.addEventListener('click', () => {
                    this.showNotification("Déconnexion réussie.", "info");
                    setTimeout(() => this.dataManager.logout(), 1000);
                });
            } else {
                authLinks.innerHTML = `
                    <a href="login.html" class="btn btn-outline">Connexion</a>
                    <a href="signup.html" class="btn btn-primary">Inscription</a>
                `;
            }
        }
    }

    setupEventListeners() {
        const menuBtn = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuBtn?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * MODERN UX FEATURES
     */
    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (currentScroll > this.lastScroll && currentScroll > 500) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            this.lastScroll = currentScroll;
        });
    }

    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .hero-content, .hero-image, .section-title, .feature-card').forEach(el => {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    }

    handlePWA() {
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            if (!localStorage.getItem('pwa_banner_closed')) {
                this.showNotification("Sama Health est plus rapide avec l'application !", "info", () => {
                    deferredPrompt.prompt();
                    localStorage.setItem('pwa_banner_closed', 'true');
                });
            }
        });
    }

    /**
     * SYSTEM FEEDBACK
     */
    showNotification(message, type = 'success', action = null) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getIconForType(type)}"></i>
                <p>${message}</p>
            </div>
            ${action ? '<button class="toast-action">Installer</button>' : ''}
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);

        const timer = setTimeout(() => this.removeToast(toast), 5000);

        toast.querySelector('.toast-close').onclick = () => {
            clearTimeout(timer);
            this.removeToast(toast);
        };

        if (action) {
            toast.querySelector('.toast-action').onclick = () => {
                action();
                this.removeToast(toast);
            };
        }
    }

    removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }

    getIconForType(type) {
        return {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        }[type] || 'fa-bell';
    }

    showLoading(target = 'body') {
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.innerHTML = '<div class="spinner"></div>';
        const container = document.querySelector(target);
        if (container) container.appendChild(loader);
    }

    hideLoading(target = 'body') {
        document.querySelector(target + ' .loader-overlay')?.remove();
    }
}

// Global Form Helper
const FormValidator = {
    validate(formId, rules) {
        const form = document.getElementById(formId);
        if (!form) return true;

        let isValid = true;
        const errors = {};

        form.querySelectorAll('input, select, textarea').forEach(input => {
            const name = input.name;
            const value = input.value;

            if (rules[name]) {
                if (rules[name].required && !value) {
                    isValid = false;
                    errors[name] = "Ce champ est obligatoire.";
                } else if (value && rules[name].email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errors[name] = "Format d'email invalide.";
                } else if (value && rules[name].min && value.length < rules[name].min) {
                    isValid = false;
                    errors[name] = `Minimum ${rules[name].min} caractères.`;
                }
            }
            this.toggleError(input, null);
        });

        Object.keys(errors).forEach(name => {
            const input = form.querySelector(`[name="${name}"]`);
            this.toggleError(input, errors[name]);
        });

        return isValid;
    },

    toggleError(input, message) {
        const parent = input.closest('.form-group') || input.parentElement;
        let errorEl = parent?.querySelector('.error-msg');

        if (message) {
            if (!errorEl) {
                errorEl = document.createElement('span');
                errorEl.className = 'error-msg';
                parent.appendChild(errorEl);
            }
            errorEl.textContent = message;
            input.classList.add('is-invalid');
        } else if (errorEl) {
            errorEl.remove();
            input.classList.remove('is-invalid');
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.ui = new UIController();
});