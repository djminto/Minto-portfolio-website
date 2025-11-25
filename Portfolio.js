/*================ User Authentication & Profile =============*/
// Check if user is logged in
function checkUserLogin() {
    const currentUser = localStorage.getItem('currentUser');
    const userWidget = document.getElementById('userProfileWidget');
    const loginBtn = document.getElementById('loginBtn');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        
        // Show user widget, hide login button
        userWidget.style.display = 'flex';
        loginBtn.style.display = 'none';
        
        // Set greeting based on time
        const hour = new Date().getHours();
        let greeting = 'Welcome back';
        if (hour < 12) greeting = 'Good morning';
        else if (hour < 18) greeting = 'Good afternoon';
        else greeting = 'Good evening';
        
        document.getElementById('profileGreeting').textContent = `${greeting}, ${user.firstName}!`;
        document.getElementById('profileName').textContent = user.firstName;
        
        if (user.profileImage) {
            document.getElementById('profileAvatar').src = user.profileImage;
        }
        
        // Show admin link if user is admin
        if (user.role === 'admin') {
            document.getElementById('adminLink').style.display = 'block';
        }
    } else {
        // Show login button, hide user widget
        userWidget.style.display = 'none';
        loginBtn.style.display = 'flex';
    }
}

// Toggle profile dropdown
document.getElementById('profileBtn')?.addEventListener('click', function() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.profile-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        document.getElementById('profileMenu')?.classList.remove('show');
    }
});

// Logout function
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
}

// Edit profile function
function editProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const newFirstName = prompt('First Name:', currentUser.firstName);
    const newLastName = prompt('Last Name:', currentUser.lastName);
    const newPhone = prompt('Phone:', currentUser.phone);
    
    if (newFirstName && newLastName && newPhone) {
        currentUser.firstName = newFirstName;
        currentUser.lastName = newLastName;
        currentUser.phone = newPhone;
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update current session
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        alert('Profile updated successfully!');
        checkUserLogin();
    }
}

// Initialize user login check
checkUserLogin();

/*================ Custom Cursor =============*/
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effect
document.querySelectorAll('a, button, .btn').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    elem.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

/*================ Particles JS Background =============*/
if(typeof particlesJS !== 'undefined') {
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
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

/*================ Initialize EmailJS =============*/
(function() {
    emailjs.init('YVvnU5ulJ_2GW0rW4');
})();

/*================ Toggle Icon Navbar =============*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
    
    // Prevent body scroll on mobile when navbar is open
    if (navbar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
};

/*================ Scroll Section Active Link =============*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    // Close mobile menu on scroll
    if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-x');
        document.body.style.overflow = 'auto';
    }
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            let activeLink = document.querySelector('header nav a[href*=' + id +']');
            if(activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    /*================ Sticky Navbar ==============*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*================ Remove toggle icon and navbar when click navbar link =============*/
    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');
    document.body.style.overflow = 'auto';
};

/*================ Skills Progress Animation =============*/
const skillBoxes = document.querySelectorAll('.skill-box');

const animateSkills = () => {
    skillBoxes.forEach(box => {
        const progressBar = box.querySelector('.progress-bar');
        const progress = progressBar.getAttribute('data-progress');
        
        const boxPosition = box.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(boxPosition < screenPosition) {
            progressBar.style.width = progress + '%';
        }
    });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

/*================ 3D Tilt Effect =============*/
const tiltElements = document.querySelectorAll('.img-box-3d, .service-3d, .portfolio-3d, .pricing-3d');

tiltElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

/*================ Scroll Reveal ==============*/
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .pricing-box', 
    { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.home-content h1, .about-img, .contact-info', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .skill-box', 
    { origin: 'right', interval: 100 });

/*================ Typing Text js ==============*/
const typed = new Typed('.multiple-text', {
    strings: ['Web Designer', 'Web Developer', 'Data Protection Officer', 'Frontend Developer', 'Backend Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*================ AI Chatbot Functionality =============*/
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbotToggle');
const closeChatbot = document.getElementById('closeChatbot');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

// Initialize chatbot with user greeting
function initializeChatbot() {
    const currentUser = localStorage.getItem('currentUser');
    const firstMessage = chatMessages.querySelector('.bot-message .message-content p');
    
    if (currentUser && firstMessage) {
        const user = JSON.parse(currentUser);
        const hour = new Date().getHours();
        let greeting = 'Hi';
        
        if (hour < 12) greeting = 'Good morning';
        else if (hour < 18) greeting = 'Good afternoon';
        else greeting = 'Good evening';
        
        firstMessage.textContent = `${greeting}, ${user.firstName}! I'm Minto's AI assistant. How can I help you today?`;
    }
}

// Initialize chatbot greeting
initializeChatbot();

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbot.classList.add('active');
    chatbotToggle.style.display = 'none';
});

closeChatbot.addEventListener('click', () => {
    chatbot.classList.remove('active');
    chatbotToggle.style.display = 'flex';
});

// Quick replies
document.querySelectorAll('.quick-reply').forEach(button => {
    button.addEventListener('click', () => {
        const message = button.getAttribute('data-message');
        sendUserMessage(message);
    });
});

// Send message function
function sendUserMessage(message) {
    // Add user message
    const userMessageHTML = `
        <div class="message user-message">
            <div class="message-content">
                <p>${message}</p>
                <span class="timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', userMessageHTML);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    const typingHTML = `
        <div class="message bot-message typing-indicator">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', typingHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response with random delay
    const delay = Math.random() * 1000 + 800; // 800-1800ms
    setTimeout(() => {
        // Remove typing indicator
        document.querySelector('.typing-indicator')?.remove();
        
        const botResponse = getBotResponse(message);
        const botMessageHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${botResponse.text}</p>
                    ${botResponse.quickReplies ? `
                        <div class="quick-replies">
                            ${botResponse.quickReplies.map(reply => 
                                `<button class="quick-reply" data-message="${reply}">${reply}</button>`
                            ).join('')}
                        </div>
                    ` : ''}
                    <span class="timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', botMessageHTML);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Re-attach event listeners to new quick reply buttons
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', () => {
                const msg = button.getAttribute('data-message');
                sendUserMessage(msg);
            });
        });
    }, delay);
}

// Bot response logic with enhanced interactivity
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if(lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            return {
                text: `Hello, ${user.firstName}! 👋 How can I help you today?`,
                quickReplies: ['What services do you offer?', 'Show me pricing', 'Contact info']
            };
        }
        return {
            text: "Hello! 👋 Welcome to Minto's Web Development! How can I assist you?",
            quickReplies: ['Services', 'Pricing', 'Contact']
        };
    }
    
    // Services
    else if(lowerMessage.includes('service') || lowerMessage.includes('offer')) {
        return {
            text: "I offer the following services:\n\n🌐 Web Development - Custom websites\n🎨 Web Design - Modern UI/UX\n📱 Digital Marketing - SEO & Social Media\n👨‍🏫 Mentorship - Tech guidance\n\nWould you like to know more about any specific service?",
            quickReplies: ['Web Development', 'Web Design', 'Pricing', 'Order now']
        };
    }
    
    // Web Development details
    else if(lowerMessage.includes('web development') || lowerMessage.includes('development')) {
        return {
            text: "I specialize in full-stack web development using:\n\n💻 Frontend: HTML5, CSS3, JavaScript, React\n⚙️ Backend: C#, ASP.NET, Node.js\n🗄️ Database: SQL Server, MongoDB\n\nI build responsive, secure, and scalable websites!",
            quickReplies: ['See projects', 'Get a quote', 'Pricing']
        };
    }
    
    // Web Design details
    else if(lowerMessage.includes('web design') || lowerMessage.includes('design')) {
        return {
            text: "My design approach focuses on:\n\n✨ Modern & Clean UI\n📱 Mobile-First Design\n🎯 User Experience (UX)\n🎨 Brand Identity\n🔥 3D Animations & Effects\n\nEvery design is custom-tailored to your brand!",
            quickReplies: ['View portfolio', 'Order website', 'Contact me']
        };
    }
    
    // Pricing
    else if(lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        return {
            text: "💰 My pricing packages:\n\n📦 Basic: JMD 80K - 150K\n   (Single page, responsive, 1-2 weeks)\n\n🚀 Professional: JMD 200K - 500K\n   (Multi-page, CMS, 3-4 weeks)\n\n⭐ Enterprise: JMD 600K+\n   (E-commerce, custom app, 6-8 weeks)\n\nAll packages include free hosting setup!",
            quickReplies: ['Order Basic', 'Order Professional', 'Order Enterprise', 'Custom quote']
        };
    }
    
    // Contact
    else if(lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        return {
            text: "📞 Get in touch:\n\n✉️ Email: danielminto13@gmail.com\n📱 Phone/WhatsApp: +1 (876) 386-4417\n📍 Instagram: @minto_web_design\n\n⏱️ I typically respond within 24 hours!",
            quickReplies: ['Send email', 'WhatsApp me', 'View resume']
        };
    }
    
    // Skills
    else if(lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
        return {
            text: "🛠️ My tech stack:\n\n Frontend: HTML5, CSS3, JavaScript, React\n Backend: C#, ASP.NET, Node.js\n Database: SQL Server, MongoDB\n Tools: Git, VS Code, Figma\n Other: RESTful APIs, JWT, EmailJS\n\nAlways learning and adapting to new technologies!",
            quickReplies: ['See projects', 'Hire me', 'Pricing']
        };
    }
    
    // Projects/Portfolio
    else if(lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('example')) {
        return {
            text: "🎨 Check out my work:\n\nI've completed projects including:\n• E-commerce platforms\n• Business websites\n• Portfolio sites\n• Custom web applications\n\nScroll to the Projects section to see my latest work!",
            quickReplies: ['Order website', 'Get a quote', 'Contact me']
        };
    }
    
    // Delivery time
    else if(lowerMessage.includes('time') || lowerMessage.includes('delivery') || lowerMessage.includes('how long') || lowerMessage.includes('deadline')) {
        return {
            text: "⏰ Project timelines:\n\n📦 Basic: 1-2 weeks\n🚀 Professional: 3-4 weeks\n⭐ Enterprise: 6-8 weeks\n\nRush delivery available for urgent projects! Custom timelines can be discussed.",
            quickReplies: ['Order now', 'Rush delivery?', 'Pricing']
        };
    }
    
    // Order/Start
    else if(lowerMessage.includes('order') || lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('hire')) {
        return {
            text: "🎉 Excited to work with you!\n\nTo get started:\n1. Click 'Order Website' in the navigation\n2. Choose your package\n3. Fill out the project details\n4. I'll review and contact you within 24-48 hours!\n\nOr contact me directly for a custom quote!",
            quickReplies: ['Order Basic', 'Order Professional', 'Order Enterprise', 'Contact directly']
        };
    }
    
    // About/Experience
    else if(lowerMessage.includes('about') || lowerMessage.includes('experience') || lowerMessage.includes('who are you')) {
        return {
            text: "👨‍💻 About me:\n\nI'm Daniel Minto, a Junior Web Developer passionate about creating stunning, secure websites. I combine modern design with robust functionality to bring your vision to life!\n\nI'm also certified as a Data Protection Officer and love mentoring aspiring developers.",
            quickReplies: ['View resume', 'See projects', 'Hire me']
        };
    }
    
    // Thanks
    else if(lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return {
            text: "You're welcome! 😊 Is there anything else I can help you with?",
            quickReplies: ['Services', 'Pricing', 'Contact', 'Order website']
        };
    }
    
    // Default response
    else {
        return {
            text: "I'm here to help! You can ask me about:\n\n• Services I offer\n• Pricing & packages\n• My skills & experience\n• Project delivery times\n• How to get started\n\nWhat would you like to know?",
            quickReplies: ['Services', 'Pricing', 'Projects', 'Contact']
        };
    }
}

// Send message on button click
sendMessage.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if(message) {
        sendUserMessage(message);
    }
});

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const message = chatInput.value.trim();
        if(message) {
            sendUserMessage(message);
        }
    }
});

/*================ Form Submission Handler =============*/
const contactForm = document.getElementById('contactForm');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            to_email: 'danielminto13@gmail.com',
            to_name: 'Daniel Minto',
            from_name: document.getElementById('contactName').value,
            from_email: document.getElementById('contactEmail').value,
            reply_to: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };
        
        // Send email using EmailJS
        emailjs.send('service_seli6gr', 'template_yf6h4lf', formData)
            .then(() => {
                alert('Thank you for your message! I will get back to you within 24 hours.');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact me directly at danielminto13@gmail.com');
            });
    });
}

/*================ Smooth Scroll for Navigation =============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*================ Digital Clock =============*/
function updateClock() {
    const now = new Date();
    
    // Time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Date
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    const dateString = `${dayName}, ${month} ${day}, ${year}`;
    
    // Update DOM
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    
    if(clockElement) clockElement.textContent = timeString;
    if(dateElement) dateElement.textContent = dateString;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

/*================ Loading Animation =============*/
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});