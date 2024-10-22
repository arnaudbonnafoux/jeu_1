let scenarios = [];
const questionElement = document.getElementById('question');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const explanationElement = document.getElementById('explanation');
const explanationContainer = document.getElementById('explanation-container');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-game');
let currentScenario = 0;
let score = 0;

// Fonction pour charger les scénarios depuis le fichier JSON
async function loadScenarios() {
    try {
        const response = await fetch('scenarios.json'); // Attendre la réponse
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des scénarios');
        }
        const data = await response.json(); // Attendre la conversion en JSON
        scenarios = data; // Affecter les scénarios chargés à la variable
        showQuestion(); // Afficher la première question après le chargement
    } catch (error) {
        console.error(error);
        questionElement.textContent = "Erreur lors du chargement des scénarios.";
    }
}

function showQuestion() {
    const scenario = scenarios[currentScenario];
    questionElement.textContent = scenario.question;
    questionElement.classList.add('fade-in');
    setTimeout(() => questionElement.classList.remove('fade-in'), 500);
    optionA.textContent = scenario.options.A;
    optionB.textContent = scenario.options.B;
    explanationContainer.style.display = 'none';

    // Afficher le conteneur de score si ce n'est pas déjà fait
    scoreContainer.style.display = 'block';
    scoreElement.textContent = score; // Met à jour le score affiché
}

function showExplanation(choice) {
    const scenario = scenarios[currentScenario];
    explanationElement.textContent = scenario.biasExplanation[choice];
    explanationContainer.style.display = 'block';

    // Met à jour le score si le choix montre une attitude critique
    if (choice === 'A') {
        score++;
        scoreElement.textContent = score; // Met à jour le score affiché
    }
}

optionA.addEventListener('click', () => showExplanation('A'));
optionB.addEventListener('click', () => showExplanation('B'));

document.getElementById('next-question').addEventListener('click', () => {
    currentScenario++;
    if (currentScenario < scenarios.length) {
        showQuestion();
    } else {
        questionElement.textContent = `Merci d'avoir joué ! Vous avez obtenu un score de ${score} sur ${scenarios.length}.`;
        document.getElementById('question-container').style.display = 'none';
        explanationContainer.style.display = 'none';
        scoreContainer.style.display = 'none';
        restartButton.style.display = 'block';
    }
});

restartButton.addEventListener('click', () => {
    currentScenario = 0;
    score = 0;
    restartButton.style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    showQuestion();
});

// Charger les scénarios lorsque le document est prêt
document.addEventListener('DOMContentLoaded', loadScenarios);
