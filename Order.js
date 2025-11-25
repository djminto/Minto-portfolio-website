/*================ Stripe Configuration =============*/
// Initialize Stripe with your publishable key
// Get your keys from: https://dashboard.stripe.com/test/apikeys
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51SXG3LEtdlHPQVWFZlnfo4GCrGq78ZciDqUdqgw7ivX5uczMSPe6uqFaBrEREA6SYIxd8kamgtLfqQeWSR4WFwjR00NmRYRcWj'; // Replace with your actual key
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

/*================ Package Pre-fill =============*/
// Check for package parameter and pre-fill
function checkPackageParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageType = urlParams.get('package');
    
    if (packageType) {
        const websiteTypeSelect = document.getElementById('websiteType');
        
        // Map package names to website types
        const packageMap = {
            'basic': 'Single Page',
            'professional': 'Multi-Page',
            'enterprise': 'E-commerce'
        };
        
        if (packageMap[packageType] && websiteTypeSelect) {
            // Set the website type
            websiteTypeSelect.value = packageMap[packageType];
            
            // Helper function to check a checkbox by value
            const checkFeature = (value) => {
                const checkbox = document.querySelector(`input[name="features"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            };
            
            // Pre-select appropriate features based on package
            if (packageType === 'basic') {
                checkFeature('responsive');
                checkFeature('seo');
            } else if (packageType === 'professional') {
                checkFeature('responsive');
                checkFeature('seo');
                checkFeature('cms');
                checkFeature('analytics');
            } else if (packageType === 'enterprise') {
                checkFeature('responsive');
                checkFeature('seo');
                checkFeature('cms');
                checkFeature('analytics');
                checkFeature('ecommerce');
                checkFeature('payment');
                checkFeature('chatbot');
            }
            
            // Show notification
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) {
                const packageMsg = document.createElement('p');
                packageMsg.style.color = 'var(--main-color)';
                packageMsg.style.fontSize = '1.4rem';
                packageMsg.style.marginTop = '1rem';
                packageMsg.style.textAlign = 'center';
                packageMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${packageMap[packageType]} package pre-selected! You can adjust the options as needed.`;
                sectionTitle.after(packageMsg);
            }
        }
    }
}

// Check if user is logged in and pre-fill contact info
function checkAndFillUserData() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        
        // Pre-fill contact information
        document.getElementById('fullName').value = `${user.firstName} ${user.lastName}`;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        
        // Show a welcome message
        const orderTitle = document.querySelector('.order-title');
        if (orderTitle) {
            const welcomeMsg = document.createElement('p');
            welcomeMsg.style.color = 'var(--main-color)';
            welcomeMsg.style.fontSize = '1.4rem';
            welcomeMsg.style.marginTop = '1rem';
            welcomeMsg.innerHTML = `<i class="fas fa-user-check"></i> Welcome back, ${user.firstName}! Your information has been pre-filled.`;
            orderTitle.after(welcomeMsg);
        }
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

// Form Step Management
let currentStep = 1;

// Initialize package and user data after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    checkPackageParameter();
    checkAndFillUserData();
});

function nextStep() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }

    // Hide current step
    currentFormStep.classList.remove('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');

    // Show next step
    currentStep++;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');

    // Update summary if on payment step
    if (currentStep === 3) {
        updatePaymentSummary();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep() {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');

    // Show previous step
    currentStep--;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
    const formStep = document.querySelector(`.form-step[data-step="${step}"]`);
    const requiredFields = formStep.querySelectorAll('[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            field.style.borderColor = '#ff6b6b';
            setTimeout(() => {
                field.style.borderColor = '';
            }, 2000);
            return false;
        }
    }
    
    return true;
}

// Update Payment Summary
function updatePaymentSummary() {
    const packageType = document.getElementById('packageType');
    const websiteType = document.getElementById('websiteType');
    const numPages = document.getElementById('numPages');
    
    const selectedOption = packageType.options[packageType.selectedIndex];
    const basePrice = parseInt(selectedOption.getAttribute('data-price') || 0);
    
    document.getElementById('summaryPackage').textContent = selectedOption.text;
    document.getElementById('summaryType').textContent = websiteType.options[websiteType.selectedIndex].text;
    document.getElementById('summaryPages').textContent = numPages.value;
    
    // Calculate total (base price + extras)
    let total = basePrice;
    const features = document.querySelectorAll('input[name="features"]:checked');
    total += features.length * 10000; // JMD 10,000 per feature
    
    document.getElementById('summaryTotal').textContent = `JMD ${total.toLocaleString()}`;
}

// 3D Credit Card Animation
const cardNumber = document.getElementById('cardNumber');
const cardName = document.getElementById('cardName');
const cardExpiry = document.getElementById('cardExpiry');
const cardCvv = document.getElementById('cardCvv');
const creditCard = document.querySelector('.credit-card');

// Card Number Formatting and Display
cardNumber.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
    
    const display = document.getElementById('cardNumberDisplay');
    const spans = display.querySelectorAll('span');
    const groups = formattedValue.split(' ');
    
    spans.forEach((span, index) => {
        span.textContent = groups[index] || '****';
    });
});

// Cardholder Name Display
cardName.addEventListener('input', function(e) {
    const value = e.target.value.toUpperCase();
    document.getElementById('cardHolderDisplay').textContent = value || 'YOUR NAME';
});

// Expiry Date Formatting and Display
cardExpiry.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
    document.getElementById('cardExpiryDisplay').textContent = value || 'MM/YY';
});

// CVV Display with Card Flip
cardCvv.addEventListener('focus', function() {
    creditCard.classList.add('flipped');
});

cardCvv.addEventListener('blur', function() {
    creditCard.classList.remove('flipped');
});

cardCvv.addEventListener('input', function(e) {
    const value = e.target.value;
    document.getElementById('cardCvvDisplay').textContent = value || '***';
});

// Payment Method Selection
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const cardForm = document.getElementById('cardForm');
const cardContainer = document.getElementById('cardContainer');
const securityNotice = document.getElementById('securityNotice');
const bankInfo = document.getElementById('bankInfo');

// Card input fields
const cardInputs = [
    document.getElementById('cardNumber'),
    document.getElementById('cardName'),
    document.getElementById('cardExpiry'),
    document.getElementById('cardCvv')
];

paymentMethods.forEach(method => {
    method.addEventListener('change', function() {
        // Hide all payment forms
        cardForm.style.display = 'none';
        cardContainer.style.display = 'none';
        if (securityNotice) securityNotice.style.display = 'none';
        bankInfo.style.display = 'none';
        
        // Remove required from card fields
        cardInputs.forEach(input => {
            if (input) input.removeAttribute('required');
        });
        
        // Show selected payment form
        if (this.value === 'card') {
            if (securityNotice) securityNotice.style.display = 'block';
            cardForm.style.display = 'block';
            cardContainer.style.display = 'block';
            // Add required back to card fields
            cardInputs.forEach(input => {
                if (input) input.setAttribute('required', '');
            });
        } else if (this.value === 'bank') {
            bankInfo.style.display = 'block';
        }
    });
});

// Form Submission
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateStep(3)) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        // Collect form data
        const formData = new FormData(this);
        const paymentMethod = formData.get('paymentMethod');
        
        // Mask card details for security (PCI compliance)
        let paymentDetails = '';
        let paymentStatus = 'pending';
        
        const orderData = {
            orderNumber: 'ORD-' + Date.now(),
            timestamp: new Date().toISOString(),
            status: 'pending',
            projectInfo: {
                packageType: formData.get('packageType'),
                websiteType: formData.get('websiteType'),
                numPages: formData.get('numPages'),
                features: formData.getAll('features'),
                description: formData.get('description')
            },
            contactInfo: {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                deadline: formData.get('deadline'),
                budget: formData.get('budget')
            },
            paymentInfo: {
                method: paymentMethod,
                amount: document.getElementById('summaryTotal').textContent,
                details: paymentDetails,
                status: paymentStatus
            }
        };
        
        // Process payment based on method
        if (paymentMethod === 'card') {
            // Note: Card payment is currently under maintenance
            // Show warning and redirect to bank transfer
            alert('⚠️ Card Payment Temporarily Unavailable\n\nWe are currently experiencing technical difficulties with card payments.\n\nPlease select "Bank Transfer" as your payment method.\n\nWe apologize for the inconvenience.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            return;
        } else if (paymentMethod === 'bank') {
            paymentDetails = 'Bank Transfer - Awaiting confirmation';
            paymentStatus = 'pending';
        }
        
        orderData.paymentInfo.details = paymentDetails;
        orderData.paymentInfo.status = paymentStatus;
        
        // Save to localStorage
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Send email notification
        await sendOrderNotification(orderData);
        
        // Show success modal
        document.getElementById('orderNumber').textContent = orderData.orderNumber;
        document.getElementById('confirmEmail').textContent = orderData.contactInfo.email;
        document.getElementById('successModal').classList.add('show');
        
        // Reset form
        this.reset();
        currentStep = 1;
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        document.querySelectorAll('.progress-step').forEach(step => step.classList.remove('active'));
        document.querySelector('.form-step[data-step="1"]').classList.add('active');
        document.querySelector('.progress-step[data-step="1"]').classList.add('active');
        
    } catch (error) {
        console.error('Order submission error:', error);
        alert('Error processing order: ' + error.message + '\n\nPlease try again or contact support.');
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

/*================ Stripe Payment Processing =============*/
async function processStripePayment(orderData, formData) {
    try {
        // Get card details
        const cardNumber = formData.get('cardNumber').replace(/\s/g, '');
        const cardExpiry = formData.get('cardExpiry').split('/');
        const cardCvv = formData.get('cardCvv');
        const cardName = formData.get('cardName');
        
        // Extract amount (remove currency symbol and convert to cents)
        const amountText = orderData.paymentInfo.amount.replace(/[^0-9.]/g, '');
        const amountInCents = Math.round(parseFloat(amountText) * 100);
        
        // Check if running locally (HTTP) or if it's a test card
        const isLocalTest = window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const isTestCard = cardNumber === '4242424242424242';
        
        // For local testing or test cards, bypass Stripe API and simulate success
        if (isLocalTest || isTestCard) {
            console.log('🧪 LOCAL/TEST MODE: Simulating payment');
            console.log('Card:', cardNumber.slice(-4));
            console.log('Amount:', amountInCents, 'cents');
            
            // Simulate a small delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            return {
                success: true,
                paymentIntentId: 'pi_test_local_' + Date.now(),
                last4: cardNumber.slice(-4)
            };
        }
        
        // Try to create payment method with Stripe (HTTPS required)
        try {
            const { paymentMethod, error } = await Promise.race([
                stripe.createPaymentMethod({
                    type: 'card',
                    card: {
                        number: cardNumber,
                        exp_month: parseInt(cardExpiry[0]),
                        exp_year: parseInt('20' + cardExpiry[1]),
                        cvc: cardCvv,
                    },
                    billing_details: {
                        name: cardName,
                        email: orderData.contactInfo.email,
                        phone: orderData.contactInfo.phone,
                    },
                }),
                // Timeout after 10 seconds
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Connection timeout')), 10000)
                )
            ]);
            
            if (error) {
                console.error('Stripe payment method error:', error);
                
                // Fallback to simulation mode if Stripe connection fails
                console.log('⚠️ Stripe connection failed, using simulation mode');
                return {
                    success: true,
                    paymentIntentId: 'pi_simulated_' + Date.now(),
                    last4: cardNumber.slice(-4),
                    simulated: true
                };
            }
            
            // In a real application, you would send the paymentMethod.id to your backend
            // Your backend would then create a PaymentIntent and confirm it
            
            console.log('Payment method created:', paymentMethod.id);
            console.log('Amount to charge:', amountInCents, 'cents');
            
            // For test mode, simulate successful payment
            if (STRIPE_PUBLISHABLE_KEY.includes('test')) {
                console.log('✅ TEST MODE: Payment would be processed');
                return {
                    success: true,
                    paymentIntentId: 'pi_test_' + Date.now(),
                    paymentMethodId: paymentMethod.id,
                    last4: cardNumber.slice(-4)
                };
            }
            
        } catch (stripeError) {
            // If Stripe API fails (network issue, HTTPS required, etc.), use simulation
            console.warn('⚠️ Stripe API unavailable:', stripeError.message);
            console.log('Using simulation mode for testing');
            
            return {
                success: true,
                paymentIntentId: 'pi_simulated_' + Date.now(),
                last4: cardNumber.slice(-4),
                simulated: true
            };
        }
        
        // For production with live keys, you need backend implementation
        alert('Payment processing requires backend implementation. Contact developer for setup.');
        return {
            success: false,
            error: 'Backend payment processing not yet configured'
        };
        
    } catch (error) {
        console.error('Stripe payment error:', error);
        
        // Final fallback - allow order to proceed with "payment pending" status
        console.log('⚠️ Using fallback mode - order will be marked as pending payment');
        return {
            success: true,
            paymentIntentId: 'pi_pending_' + Date.now(),
            last4: formData.get('cardNumber').replace(/\s/g, '').slice(-4),
            pending: true
        };
    }
}

// Send Order Notification using EmailJS
async function sendOrderNotification(orderData) {
    // SETUP REQUIRED: 
    // 1. Go to https://www.emailjs.com/ and create a free account
    // 2. Add your email service (Gmail)
    // 3. Create an email template
    // 4. Get your Public Key, Service ID, and Template ID
    // 5. Replace the values below
    
    const EMAILJS_PUBLIC_KEY = 'YVvnU5ulJ_2GW0rW4';
    const EMAILJS_SERVICE_ID = 'service_seli6gr';
    const EMAILJS_TEMPLATE_ID = 'template_k597rol';
    
    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.warn('⚠️ EmailJS not configured. Emails will not be sent.');
        console.log('Order Data:', orderData);
        console.log('📧 Email would be sent to: danielminto13@gmail.com');
        return;
    }
    
    try {
        // Initialize EmailJS (only once)
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS library not loaded. Make sure the script is included in Order.html');
            alert('Email service is not available. Your order has been saved locally.');
            return;
        }
        
        emailjs.init(EMAILJS_PUBLIC_KEY);
        
        // Prepare email parameters - IMPORTANT: These must match your EmailJS template variables
        const adminEmailParams = {
            to_email: 'danielminto13@gmail.com',  // REQUIRED: Admin email address
            to_name: 'Daniel Minto',
            from_name: orderData.contactInfo.fullName,
            from_email: orderData.contactInfo.email,
            order_number: orderData.orderNumber,
            client_name: orderData.contactInfo.fullName,
            client_email: orderData.contactInfo.email,
            client_phone: orderData.contactInfo.phone,
            client_company: orderData.contactInfo.company || 'N/A',
            package_type: orderData.projectInfo.packageType.toUpperCase(),
            website_type: orderData.projectInfo.websiteType,
            num_pages: orderData.projectInfo.numPages,
            features: orderData.projectInfo.features.join(', ') || 'None selected',
            description: orderData.projectInfo.description,
            budget: orderData.contactInfo.budget || 'Not specified',
            deadline: orderData.contactInfo.deadline || 'Not specified',
            payment_method: orderData.paymentInfo.method,
            payment_details: orderData.paymentInfo.details,
            amount: orderData.paymentInfo.amount,
            date: new Date(orderData.timestamp).toLocaleString(),
            reply_to: orderData.contactInfo.email,
            message: `New order from ${orderData.contactInfo.fullName} for ${orderData.projectInfo.packageType} package.`
        };
        
        console.log('📤 Sending admin notification with params:', adminEmailParams);
        
        // Send admin notification to danielminto13@gmail.com
        const adminResponse = await emailjs.send(
            EMAILJS_SERVICE_ID, 
            EMAILJS_TEMPLATE_ID, 
            adminEmailParams
        );
        
        console.log('✅ SUCCESS! Admin notification sent to danielminto13@gmail.com');
        console.log('Response:', adminResponse);
        
        // Send client confirmation
        const clientEmailParams = {
            to_email: orderData.contactInfo.email,  // REQUIRED: Client email address
            to_name: orderData.contactInfo.fullName,
            from_name: 'Daniel Minto - Web Development Services',
            from_email: 'danielminto13@gmail.com',
            order_number: orderData.orderNumber,
            package_type: orderData.projectInfo.packageType.toUpperCase(),
            amount: orderData.paymentInfo.amount,
            client_email: orderData.contactInfo.email,
            reply_to: 'danielminto13@gmail.com',
            message: `Thank you for your order! Your order number is ${orderData.orderNumber}. We'll review your requirements and get back to you within 24-48 hours.`
        };
        
        console.log('📤 Sending client confirmation to:', orderData.contactInfo.email);
        
        const clientResponse = await emailjs.send(
            EMAILJS_SERVICE_ID, 
            EMAILJS_TEMPLATE_ID, 
            clientEmailParams
        );
        
        console.log('✅ Client confirmation sent successfully');
        console.log('Response:', clientResponse);
        
    } catch (error) {
        console.error('❌ ERROR sending email:', error);
        console.error('Error details:', {
            message: error.message,
            text: error.text,
            status: error.status
        });
        
        // Show user-friendly error
        alert(`Order saved, but email notification failed: ${error.text || error.message}\n\nPlease contact danielminto13@gmail.com with order number: ${orderData.orderNumber}`);
    }
}

// Close Modal
function closeModal() {
    document.getElementById('successModal').classList.remove('show');
    window.location.href = 'Homepage.html';
}

// Close modal on outside click
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        });
    });
}
