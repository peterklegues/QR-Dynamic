// QR Dynamic - Login JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Form switching functions
function showLoginForm() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
}

function showSignupForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
}

function showForgotPassword() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.remove('hidden');
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Mock authentication - in a real app, this would call your backend
    if (email && password) {
        // Store login state
        localStorage.setItem('qr_dynamic_logged_in', 'true');
        localStorage.setItem('qr_dynamic_user', JSON.stringify({
            email: email,
            name: email.split('@')[0]
        }));
        
        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Mock signup - in a real app, this would call your backend
    if (email && password) {
        // Store user data
        localStorage.setItem('qr_dynamic_logged_in', 'true');
        localStorage.setItem('qr_dynamic_user', JSON.stringify({
            email: email,
            name: email.split('@')[0]
        }));
        
        showNotification('Conta criada com sucesso!', 'success');
        
        // Redirect to dashboard after a delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

// Handle forgot password form submission
function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    if (email) {
        showNotification('Instruções de redefinição enviadas para seu e-mail!', 'success');
        showLoginForm();
    } else {
        showNotification('Por favor, digite seu e-mail.', 'error');
    }
}

// Check if user is already logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('qr_dynamic_logged_in');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-success text-primary-foreground' : 
        type === 'error' ? 'bg-destructive text-destructive-foreground' : 
        'bg-primary text-primary-foreground'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});