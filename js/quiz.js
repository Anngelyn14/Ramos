// Quiz functionality
let currentQuestions = [];

function loadQuizQuestions() {
    currentQuestions = [
        {
            question: "What does API stand for?",
            options: [
                "Application Programming Interface",
                "Advanced Programming Instruction",
                "Automated Program Integration",
                "Application Process Integration"
            ],
            correct: 0
        },
        {
            question: "Which protocol is commonly used for OAuth 2.0?",
            options: [
                "HTTP",
                "FTP",
                "SMTP",
                "TCP"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of XML in web development?",
            options: [
                "To structure and transport data",
                "To style web pages",
                "To add interactivity to websites",
                "To manage databases"
            ],
            correct: 0
        },
        {
            question: "Which tool was used for mobile app prototyping in this project?",
            options: [
                "Thunkable",
                "Figma",
                "Adobe XD",
                "Sketch"
            ],
            correct: 0
        }
    ];
    
    displayQuizQuestions();
}

function displayQuizQuestions() {
    const quizQuestions = document.getElementById('quiz-questions');
    quizQuestions.innerHTML = '';
    
    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}: ${q.question}</h3>
            <div class="options">
                ${q.options.map((option, i) => `
                    <div class="option" data-question="${index}" data-option="${i}">${option}</div>
                `).join('')}
            </div>
        `;
        quizQuestions.appendChild(questionDiv);
    });
    
    // Add event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const questionIndex = this.getAttribute('data-question');
            
            // Remove selected class from all options in this question
            document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
    
    // Add submit button event listener
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
}

function submitQuiz() {
    const selectedOptions = document.querySelectorAll('.option.selected');
    let correctAnswers = 0;
    
    selectedOptions.forEach(option => {
        const questionIndex = parseInt(option.getAttribute('data-question'));
        const optionIndex = parseInt(option.getAttribute('data-option'));
        
        if (currentQuestions[questionIndex].correct === optionIndex) {
            correctAnswers++;
        }
    });
    
    const totalQuestions = currentQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    showCertificate(score);
}

function showCertificate(score) {
    const userEmail = localStorage.getItem('userEmail') || 'User';
    const userName = userEmail.split('@')[0];
    
    document.getElementById('certificate-name').textContent = userName;
    document.getElementById('certificate-score').textContent = score;
    document.getElementById('certificate-date').textContent = new Date().toLocaleDateString();
    
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('certificate-section').classList.remove('hidden');
    
    // Add download functionality
    document.getElementById('download-certificate').addEventListener('click', function() {
        downloadCertificate(userName, score);
    });
}

function downloadCertificate(name, score) {
    alert(`Certificate for ${name} with score ${score}% downloaded successfully!`);
    // In a real implementation, this would generate and download a PDF
}