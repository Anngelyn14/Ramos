// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const googleLoginBtn = document.getElementById('google-login');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            handleGoogleLogin();
        });
    }
});

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login process
    localStorage.setItem('userEmail', email);
    showQuizSection();
}

function handleGoogleLogin() {
    // Simulate Google OAuth process
    alert('Redirecting to Google OAuth...');
    const mockEmail = 'user@gmail.com';
    localStorage.setItem('userEmail', mockEmail);
    showQuizSection();
}

function showQuizSection() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    loadQuizQuestions();
}