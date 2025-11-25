// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#0ef' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#0ef',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

// Switch between login and register
function switchToRegister() {
    document.getElementById('loginCard').classList.add('hidden');
    document.getElementById('registerCard').classList.remove('hidden');
}

function switchToLogin() {
    document.getElementById('registerCard').classList.add('hidden');
    document.getElementById('loginCard').classList.remove('hidden');
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password strength checker
document.getElementById('registerPassword')?.addEventListener('input', function(e) {
    const password = e.target.value;
    const strengthBar = document.getElementById('passwordStrength');
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    strengthBar.className = 'password-strength';
    if (strength <= 1) {
        strengthBar.classList.add('weak');
    } else if (strength <= 3) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save current session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show welcome modal
        showWelcomeModal(user);
        
        // Redirect based on user role
        setTimeout(() => {
            if (user.role === 'admin') {
                window.location.href = 'Dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 3000);
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Registration Form Handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('Email already registered. Please login or use a different email.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: 'USER-' + Date.now(),
        firstName,
        lastName,
        email,
        phone,
        password,
        role: 'customer',
        createdAt: new Date().toISOString(),
        profileImage: 'Images/Minto\'s Logo2.png'
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Show welcome modal
    showWelcomeModal(newUser);
    
    // Redirect to homepage
    setTimeout(() => {
        window.location.href = 'Homepage.html';
    }, 3000);
});

// Demo Login
function loginAsDemo() {
    // Create or get demo user
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let demoUser = users.find(u => u.email === 'demo@example.com');
    
    if (!demoUser) {
        demoUser = {
            id: 'USER-DEMO',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@example.com',
            phone: '876-123-4567',
            password: 'demo123',
            role: 'customer',
            createdAt: new Date().toISOString(),
            profileImage: 'Images/Minto\'s Logo2.png'
        };
        users.push(demoUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Login as demo
    localStorage.setItem('currentUser', JSON.stringify(demoUser));
    showWelcomeModal(demoUser);
    
    setTimeout(() => {
        window.location.href = 'Homepage.html';
    }, 3000);
}

// Show Welcome Modal
function showWelcomeModal(user) {
    const modal = document.getElementById('welcomeModal');
    const userName = document.getElementById('userName');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeSubtext = document.getElementById('welcomeSubtext');
    
    // Set user name
    userName.textContent = user.firstName;
    
    // Set greeting based on time
    const hour = new Date().getHours();
    let greeting = 'Welcome Back';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    welcomeMessage.innerHTML = `${greeting}, <span>${user.firstName}</span>!`;
    
    // Set subtext based on user role
    if (user.role === 'admin') {
        welcomeSubtext.textContent = 'Managing your web development dashboard...';
    } else {
        welcomeSubtext.textContent = 'We\'re excited to have you here!';
    }
    
    // Show modal
    modal.classList.add('show');
}

// Initialize admin account if not exists
function initializeAdmin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (!users.find(u => u.email === 'danielminto13@gmail.com')) {
        const adminUser = {
            id: 'USER-ADMIN',
            firstName: 'Daniel',
            lastName: 'Minto',
            email: 'danielminto13@gmail.com',
            phone: '876-341-6014',
            password: 'admin123',
            role: 'admin',
            createdAt: new Date().toISOString(),
            profileImage: 'Images/Minto\'s Logo2.png'
        };
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Admin account created: danielminto13@gmail.com / admin123');
    }
}

// Check if already logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        // If already logged in, redirect to appropriate page
        if (user.role === 'admin') {
            window.location.href = 'Dashboard.html';
        } else {
            window.location.href = 'Homepage.html';
        }
    }
}

// Initialize
initializeAdmin();
checkAuth();
