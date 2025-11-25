// Check authentication
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'Login.html';
        return null;
    }
    
    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
        alert('Access Denied: Admin privileges required');
        window.location.href = 'index.html';
        return null;
    }
    
    // Update user info in sidebar
    document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('userRole').textContent = user.role === 'admin' ? 'Administrator' : 'User';
    if (user.profileImage) {
        document.getElementById('userAvatar').src = user.profileImage;
    }
    
    return user;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'Login.html';
    }
}

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

// Update Date/Time
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
}

updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

// Navigation
document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        switchSection(section);
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    
    // Show selected section
    const sectionMap = {
        'dashboard': 'dashboardSection',
        'orders': 'ordersSection',
        'pending': 'pendingSection',
        'completed': 'completedSection'
    };
    
    document.getElementById(sectionMap[section]).classList.add('active');
    
    // Load data for section
    loadOrders();
}

// Load Orders from LocalStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Update stats
    updateStats(orders);
    
    // Render orders in different sections
    renderRecentOrders(orders.slice(0, 5));
    renderAllOrders(orders);
    renderPendingOrders(orders.filter(o => o.status === 'pending'));
    renderCompletedOrders(orders.filter(o => o.status === 'completed'));
    
    // Calculate revenue
    calculateRevenue(orders);
}

// Update Statistics
function updateStats(orders) {
    const pending = orders.filter(o => o.status === 'pending').length;
    const inProgress = orders.filter(o => o.status === 'in-progress').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalPending').textContent = pending;
    document.getElementById('totalProgress').textContent = inProgress;
    document.getElementById('totalCompleted').textContent = completed;
    
    document.getElementById('orderCount').textContent = orders.length;
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('notificationCount').textContent = pending;
}

// Render Recent Orders
function renderRecentOrders(orders) {
    const container = document.getElementById('recentOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No orders yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => createOrderCard(order)).join('');
}

// Render All Orders
function renderAllOrders(orders) {
    const container = document.getElementById('allOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No orders yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => createOrderCard(order)).join('');
}

// Render Pending Orders
function renderPendingOrders(orders) {
    const container = document.getElementById('pendingOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <p>No pending orders</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => createOrderCard(order)).join('');
}

// Render Completed Orders
function renderCompletedOrders(orders) {
    const container = document.getElementById('completedOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <p>No completed orders yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(order => createOrderCard(order)).join('');
}

// Create Order Card HTML
function createOrderCard(order) {
    const statusClass = `status-${order.status}`;
    const statusText = order.status.replace('-', ' ').toUpperCase();
    const orderDate = new Date(order.timestamp).toLocaleString();
    
    return `
        <div class="order-item">
            <div class="order-header">
                <div class="order-id">
                    <h3>${order.orderNumber}</h3>
                    <span class="order-date"><i class="fas fa-clock"></i> ${orderDate}</span>
                </div>
                <span class="order-status ${statusClass}">${statusText}</span>
            </div>
            
            <div class="order-details">
                <div class="detail-item">
                    <span class="detail-label">Client</span>
                    <span class="detail-value">${order.contactInfo.fullName}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${order.contactInfo.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Package</span>
                    <span class="detail-value">${order.projectInfo.packageType.toUpperCase()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Amount</span>
                    <span class="detail-value">${order.paymentInfo.amount}</span>
                </div>
            </div>
            
            <div class="order-actions">
                <button class="btn-action btn-view" onclick="viewOrderDetails('${order.orderNumber}')">
                    <i class="fas fa-eye"></i> View Details
                </button>
                ${order.status === 'pending' ? `
                    <button class="btn-action btn-progress" onclick="updateOrderStatus('${order.orderNumber}', 'in-progress')">
                        <i class="fas fa-play"></i> Start Project
                    </button>
                ` : ''}
                ${order.status === 'in-progress' ? `
                    <button class="btn-action btn-complete" onclick="updateOrderStatus('${order.orderNumber}', 'completed')">
                        <i class="fas fa-check"></i> Mark Complete
                    </button>
                ` : ''}
                <button class="btn-action btn-delete" onclick="deleteOrder('${order.orderNumber}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
}

// View Order Details
function viewOrderDetails(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) return;
    
    const modal = document.getElementById('orderDetailsModal');
    const body = document.getElementById('orderDetailsBody');
    
    const features = order.projectInfo.features.map(f => 
        `<span class="feature-tag"><i class="fas fa-check"></i> ${f}</span>`
    ).join('');
    
    body.innerHTML = `
        <div class="detail-section">
            <h3><i class="fas fa-info-circle"></i> Order Information</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Order Number</span>
                    <span class="detail-value">${order.orderNumber}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <span class="detail-value order-status status-${order.status}">${order.status.toUpperCase()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">${new Date(order.timestamp).toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Payment Method</span>
                    <span class="detail-value">${order.paymentInfo.method.toUpperCase()}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3><i class="fas fa-user"></i> Client Information</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Name</span>
                    <span class="detail-value">${order.contactInfo.fullName}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${order.contactInfo.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${order.contactInfo.phone}</span>
                </div>
                ${order.contactInfo.company ? `
                    <div class="detail-item">
                        <span class="detail-label">Company</span>
                        <span class="detail-value">${order.contactInfo.company}</span>
                    </div>
                ` : ''}
                ${order.contactInfo.deadline ? `
                    <div class="detail-item">
                        <span class="detail-label">Deadline</span>
                        <span class="detail-value">${order.contactInfo.deadline}</span>
                    </div>
                ` : ''}
                ${order.contactInfo.budget ? `
                    <div class="detail-item">
                        <span class="detail-label">Budget</span>
                        <span class="detail-value">${order.contactInfo.budget}</span>
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h3><i class="fas fa-laptop-code"></i> Project Details</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Package</span>
                    <span class="detail-value">${order.projectInfo.packageType.toUpperCase()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Website Type</span>
                    <span class="detail-value">${order.projectInfo.websiteType}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Number of Pages</span>
                    <span class="detail-value">${order.projectInfo.numPages}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Total Amount</span>
                    <span class="detail-value">${order.paymentInfo.amount}</span>
                </div>
            </div>
            
            ${order.projectInfo.features.length > 0 ? `
                <div style="margin-top: 1.5rem;">
                    <span class="detail-label" style="display: block; margin-bottom: 1rem;">Features Required</span>
                    <div class="features-list">${features}</div>
                </div>
            ` : ''}
            
            <div style="margin-top: 1.5rem;">
                <span class="detail-label" style="display: block; margin-bottom: 1rem;">Project Description</span>
                <div style="padding: 1.5rem; background: var(--bg-color); border-radius: 10px; line-height: 1.8;">
                    ${order.projectInfo.description}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeOrderModal() {
    document.getElementById('orderDetailsModal').classList.remove('show');
}

// Update Order Status
async function updateOrderStatus(orderNumber, newStatus) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
    
    if (orderIndex === -1) return;
    
    orders[orderIndex].status = newStatus;
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Send email notification to client
    await sendStatusUpdateEmail(orders[orderIndex], newStatus);
    
    // Reload orders
    loadOrders();
    
    // Show success message
    alert(`Order ${orderNumber} has been updated to ${newStatus.toUpperCase()}`);
}

// Send Status Update Email (Simulated)
async function sendStatusUpdateEmail(order, status) {
    const statusMessages = {
        'in-progress': 'Your project has been started and is now in progress!',
        'completed': 'Your project has been completed! We\'ll be in touch with the final deliverables.'
    };
    
    const email = {
        to: order.contactInfo.email,
        subject: `Order Update: ${order.orderNumber} - ${status.toUpperCase()}`,
        body: `
            Dear ${order.contactInfo.fullName},
            
            ${statusMessages[status]}
            
            Order Number: ${order.orderNumber}
            Status: ${status.toUpperCase()}
            
            ${status === 'completed' ? 
                'Thank you for choosing our services! We hope you\'re satisfied with the final result.' :
                'We\'ll keep you updated on the progress.'
            }
            
            Best regards,
            Daniel Minto
            Web Development Services
        `
    };
    
    console.log('Status Update Email Sent:', email);
}

// Delete Order
function deleteOrder(orderNumber) {
    if (!confirm(`Are you sure you want to delete order ${orderNumber}?`)) {
        return;
    }
    
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders = orders.filter(o => o.orderNumber !== orderNumber);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    loadOrders();
    alert(`Order ${orderNumber} has been deleted.`);
}

// Calculate Revenue
function calculateRevenue(orders) {
    let totalRevenue = 0;
    let monthRevenue = 0;
    let pendingRevenue = 0;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    orders.forEach(order => {
        const amount = parseInt(order.paymentInfo.amount.replace(/[^0-9]/g, '')) || 0;
        const orderDate = new Date(order.timestamp);
        
        // Total revenue from completed orders
        if (order.status === 'completed') {
            totalRevenue += amount;
            
            // This month's revenue
            if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
                monthRevenue += amount;
            }
        }
        
        // Pending revenue
        if (order.status === 'pending' || order.status === 'in-progress') {
            pendingRevenue += amount;
        }
    });
    
    document.getElementById('totalRevenue').textContent = `JMD ${totalRevenue.toLocaleString()}`;
    document.getElementById('monthRevenue').textContent = `JMD ${monthRevenue.toLocaleString()}`;
    document.getElementById('pendingRevenue').textContent = `JMD ${pendingRevenue.toLocaleString()}`;
}

// Search Orders
document.getElementById('searchOrders')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    filterOrders(searchTerm);
});

// Filter by Status
document.getElementById('filterStatus')?.addEventListener('change', function(e) {
    const status = e.target.value;
    const searchTerm = document.getElementById('searchOrders').value.toLowerCase();
    filterOrders(searchTerm, status);
});

function filterOrders(searchTerm = '', status = 'all') {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Filter by search term
    if (searchTerm) {
        orders = orders.filter(order => 
            order.orderNumber.toLowerCase().includes(searchTerm) ||
            order.contactInfo.fullName.toLowerCase().includes(searchTerm) ||
            order.contactInfo.email.toLowerCase().includes(searchTerm) ||
            order.projectInfo.websiteType.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by status
    if (status !== 'all') {
        orders = orders.filter(order => order.status === status);
    }
    
    renderAllOrders(orders);
}

// Close modal on outside click
document.getElementById('orderDetailsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeOrderModal();
    }
});

// Mobile Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking on nav items (mobile only)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Close sidebar when clicking outside (mobile only)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) &&
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Initial Load - Check auth first
checkAuth();
loadOrders();
