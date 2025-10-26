// Common functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Toggle Skills List (Profile page)
    const toggleSkillsBtn = document.getElementById('toggle-skills');
    if (toggleSkillsBtn) {
        toggleSkillsBtn.addEventListener('click', function() {
            const skillsList = document.getElementById('skills-list');
            skillsList.classList.toggle('hidden');
            toggleSkillsBtn.textContent = skillsList.classList.contains('hidden') ? 'Show Skills' : 'Hide Skills';
        });
    }

    // Password toggle functionality
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    });

    // Contact form validation (Profile page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateContactForm();
        });
    }

    // Mobile app registration (Mobile App page)
   <div id="mobile-app-page" class="hidden">
        <header>
            <div class="container">
                <nav>
                    <div class="logo">IDE Platform</div>
                    <ul class="nav-links">
                        <li><a href="#" onclick="showPage('landing-page')">Home</a></li>
                        <li><a href="#" onclick="showPage('profile-page')">Profile</a></li>
                        <li><a href="#" onclick="showPage('products-page')">Products</a></li>
                        <li><a href="#" onclick="showPage('quiz-page')">Quiz</a></li>
                        <li><a href="#" onclick="showPage('mobile-app-page')" class="active">Mobile App</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <section class="page-hero">
            <div class="container">
                <h1>Mobile App Prototype</h1>
                <p>Experience our application on mobile devices</p>
            </div>
        </section>

        <div class="container">
            <div class="app-showcase">
                <div class="app-screenshot">
                    
                    <p class="mt-2">Home Screen with Navigation</p>
                </div>
                
                <div class="app-features">
                    <h2>App Features</h2>
                    <ul>
                        <li>Intuitive navigation between screens</li>
                        <li>Media showcase with images and videos</li>
                        <li>User registration and data collection</li>
                        <li>Seamless integration with web platform</li>
                        <li>Responsive design for all devices</li>
                        <li>Push notifications for updates</li>
                        <li>Offline functionality for key features</li>
                    </ul>
                    
                    <div class="mt-2">
                        <a href="#" class="btn btn-primary">View App Walkthrough</a>
                        <a href="#" class="btn btn-secondary" style="margin-left: 1rem;">Download Prototype</a>
                    </div>
                </div>
            </div>
            
            <div class="content-section text-center">
                <h2>App Registration</h2>
                <p>Simulate the mobile app registration experience</p>
                
                <form id="app-registration" style="max-width: 500px; margin: 0 auto;">
                    <div class="form-group">
                        <label for="app-name">Full Name</label>
                        
                    </div>
                    
                    <div class="form-group">
                        <label for="app-email">Email Address</label>
                       
                    </div>
                    
                    <div class="form-group">
                        <label for="app-password">Password</label>
                        
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Register in App</button>
                    <div class="success-message" id="app-success">Registration successful! Data submitted to database.</div>
                </form>
            </div>
        </div>
    </div>
});

function validateContactForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Name validation
    if (nameInput.value.trim().length < 2) {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('email-error').style.display = 'none';
    }
    
    // Password validation
    if (passwordInput && passwordInput.value.length < 8) {
        document.getElementById('password-error').style.display = 'block';
        isValid = false;
    } else if (passwordInput) {
        document.getElementById('password-error').style.display = 'none';
    }
    
    // Message validation
    if (messageInput.value.trim().length < 10) {
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('message-error').style.display = 'none';
    }
    
    if (isValid) {
        document.getElementById('form-success').style.display = 'block';
        if (document.getElementById('contact-form')) {
            document.getElementById('contact-form').reset();
        }
        setTimeout(() => {
            document.getElementById('form-success').style.display = 'none';
        }, 3000);
    }
    
    return isValid;
}