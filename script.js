const quizData = [
    // We are going to create a collection of objects to store our questions.
    // Now what is an object?
    // An object is basically a key value player where we write the key without "" and we have to write the value in the "". We identify the object by {}.
    // Syntax of object
    // {
    // key:"value",
    // } We separate objects by giving commas and also we separate multiple key value players by commas.
    // Below is the details of the FIRST QUESTION
    {
        question: "What is my name?",
        options: ["Michael", "Philip", "Aydin", "Aryhan"],
        answer: "Aydin",
    },
    {
        question: "What is my favourite colour?",
        options: ["Red", "Light Blue", "Dark Blue", "Green"],
        answer: "Light Blue",
    },
    {
        question: "Where do I live?",
        options: ["West London", "Ipswich", "Orpington", "East London"],
        answer: "East London",
    },
    {
        question: "Which School do I go to?",
        options: ["Queen Elizabeth's School", "Wilson's School", "St. Olave's Grammar School", "King Edward VI Grammar School"],
        answer: "St. Olave's Grammar School",
    },
    {
        question: "What is my favourite food?",
        options: ["Biryani", "Paratha (A type of Flatbread)", "Pizza", "Pasta"],
        answer: "Pasta",
    },
    {
        question: "What is my favourite school subject?",
        options: ["English", "Mathematics", "History", "Science"],
        answer: "Mathematics",
    },
    {
        question: "What is my best achievement so far?",
        options: ["Getting accepted into one of the top Grammar Schools", "Maintaining a streak of full marks in Arithmetic (12 times in a row)", "My own smartness", "Finally learning how to take a free kick in football."],
        answer: "Getting accepted into one of the top Grammar Schools",
    },
    {
        question: "What is my favourite football team?",
        options: ["Real Madrid", "Liverpool", "PSG (Paris-Saint Germain)", "Arsenal"],
        answer: "Arsenal",
    },
    {
        question: "What is my favourite shape?",
        options: ["Triangle", "Square", "Semicircle", "Pentagon"],
        answer: "Triangle",
    },
    {
        question: "What platform do I LAUNCH all my websites?",
        options: ["Algolia", "GitHub", "Kantata", "Google"],
        answer: "GitHub",
    },
]






const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
let currentQuestion = 0;
let score = 0;


let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};





function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = `${currentQuestion + 1}.${questionData.question}`;
    const optionsElement = document.createElement("div");
    optionsElement.className = "options";
    const shuffledOptions = [...questionData.options];   // ... is the spread operator which copies the question data.options and pastes it for the content of the shuffled options.
    shuffleArray(shuffledOptions);
    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement("label");
        option.className = "option";
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.value = shuffledOptions[i];
        const optionText = document.createTextNode(shuffledOptions[i]);
        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }
    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}






function checkAnswer() {
    const selectedOption = document.querySelector('input[name = "quiz"]:checked');
    if(selectedOption) {
        const answer = selectedOption.value;
        if(answer === quizData[currentQuestion].answer) {
            score++;
        } else{
            incorrectAnswers.push({
                question:quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer:quizData[currentQuestion].answer,
            })
        }
        currentQuestion++;
        selectedOption.checked=false;
        if(currentQuestion<quizData.length) {
            displayQuestion();
        } else{
            displayResult();
        }
    }
    
}










function displayResult() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    retryButton.style.display = "inline-block";
    showAnswerButton.style.display = "inline-block";
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length} !`;
}







function retryQuiz() {
    currentQuestion = 0;
    score =  0;
    incorrectAnswers = [];
    quizContainer.style.display = "block";
    submitButton.style.display = "inline-block";
    retryButton.style.display = "none";
    showAnswerButton.style.display = "none";
    resultContainer.innerHTML = "";
    displayQuestion();
}








function showAnswer() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    retryButton.style.display = "inline-block";
    showAnswerButton.style.display = "none";
    let incorrectAnswersHtml = "";
    for(let i = 0; i<incorrectAnswers.length; i++) {
        incorrectAnswersHtml+=`
        <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question} <br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer} <br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
        `;
    }

    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length} !</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
    `;
}






submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);
displayQuestion();