const countries = [
    "france", 
    "allemagne", 
    "italie", 
    "espagne", 
    "canada",
    "bresil",
    "japon",
    "chine",
    "argentine",
    "mexique",
    "russie",
    "australie",
    "inde",
    "royaume uni",
    "etats unis",
    "portugal",
    "suisse",
    "coree du sud",
    "belgique",
    "pays bas",
    "luxembourg",
    "afghanistan",
    "afrique du sud",
    "albanie",
    "algerie",
    "andorre",
    "angola",
    "antigua et barbuda",
    "arabie saoudite",
    "armenie",
    "autriche",
    "azerbaidjan",
    "bahamas",
    "bahrein",
    "bangladesh",
    "barbade",
    "belize",
    "benin",
    "bhoutan",
    "bielorussie",
    "myanmar",
    "bolivie",
    "bosnie",
    "botswana",
    "brunei",
    "bulgarie",
    "burkina faso",
    "burundi",
    "cambodge",
    "cameroun",
    "cap vert",
    "chili",
    "chypre",
    "colombie",
    "comores",
    "coree du nord",
    "coree du sud",
    "costa rica",
    "cote ivoire",
    "croatie",
    "cuba",
    "danemark",
    "djibouti",
    "dominique",
    "egypte",
    "emirats arabes unis",
    "equateur",
    "erythree",
    "estonie",
    "micronesie",
    "ethiopie",
    "fidji",
    "finlande",
    "gabon",
    "gambie",
    "georgie",
    "ghana",
    "grece",
    "grenade",
    "greonland",
    "guinee",
    "guinee equatoriale",
    "guyana",
    "haiti",
    "honduras",
    "hongrie",
    "iles feroe",
    "iles marshall",
    "iles salomon",
    "inde",
    "indonesie",
    "iran",
    "iraq",
    "irlande",
    "islande",
    "israel",
    "jamaique",
    "jordanie",
    "kazakhstan",
    "kenya",
    "kirghizistan",
    "kiribati",
    "koweit",
    "laos",
    "vatican",
    "lesotho",
    "lettonie",
    "liban",
    "liberia",
    "libye",
    "lituanie",
    "macedoine du nord",
    "madagascar",
    "malaisie",
    "malawi",
    "maldives",
    "mali",
    "malte",
    "maroc",
    "maurice",
    "mauritanie",
    "moldavie",
    "monaco",
    "mongolie",
    "montenegro",
    "mozambique",
    "namibie",
    "nauru",
    "nepal",
    "nicaragua",
    "niger",
    "nigeria",
    "niue",
    "norvege",
    "nouvelle zelande",
    "oman",
    "ouganda",
    "ouzbekistan",
    "pakistan",
    "palau",
    "palestine",
    "panama",
    "papouasie nouvelle guinee",
    "paraguay",
    "perou",
    "philippines",
    "pologne",
    "qatar",
    "republique centrafricaine",
    "republique democratique du congo",
    "republique dominicaine",
    "republique du congo",
    "republique tcheque",
    "roumanie",
    "rwanda",
    "saint marin",
    "saint vincent et les grenadines",
    "sainte lucie",
    "salvador",
    "samoa",
    "sao tome et principe",
    "senegal",
    "serbie",
    "seychelles",
    "sierra leone",
    "singapour",
    "slovaquie",
    "slovenie",
    "somalie",
    "soudan",
    "soudan du sud",
    "sri lanka",
    "suede",
    "suisse",
    "suriname",
    "eswatini",
    "syrie",
    "tadjikistan",
    "taiwan",
    "tanzanie",
    "tchad",
    "thailande",
    "timor oriental",
    "togo",
    "tonga",
    "trinite et tobago",
    "tunisie",
    "turkmenistan",
    "turquie",
    "tuvalu",
    "ukraine",
    "uruguay",
    "vanatu",
    "venezuela",
    "vietnam",
    "yemen",
    "zambie",
    "zimbabwe"
];

let shuffledCountries = [];
let currentCountryIndex = 0;
let score = 0;
const maxQuestions = 20; 

// Sélection des éléments du DOM
const quizzImg = document.getElementById("quizz-img");
const quizzQuestion = document.getElementById("quizz-question");
const inputResultat = document.getElementById("resultat");
const nextButton = document.getElementById("next");
const resultatFinal = document.getElementById("resultatFinal");

// algorithme de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

function startQuiz() {
    shuffledCountries = [...countries];  // Copier le tableau des pays
    shuffleArray(shuffledCountries);
    shuffledCountries = shuffledCountries.slice(0, maxQuestions);
    currentCountryIndex = 0;
    score = 0;
    loadNewCountry();
}


function loadNewCountry() {
    if (currentCountryIndex < shuffledCountries.length) {
        const country = shuffledCountries[currentCountryIndex];
        quizzImg.src = `flag/${country}.png`; 
        quizzQuestion.textContent = "Quel est ce pays ?";
        inputResultat.value = ""; // Réinitialiser le champ de saisie
        resultatFinal.textContent = ""; // Vider l'éventuel message de résultat précédent
    } else {
        quizzQuestion.textContent = "Quizz terminé !";
        quizzImg.style.display = "none";
        resultatFinal.textContent = `Votre score final est : ${score} / ${shuffledCountries.length}`;
        nextButton.style.display = "none";
    }
}

// Fonction pour vérifier si la touche "Enter" a été pressée
inputResultat.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Empêche le comportement par défaut (ex : soumission de formulaire)
        checkAnswer(); // Appelle la fonction comme si l'utilisateur avait cliqué sur "Suivant"
    }
});

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ').trim().toLowerCase();
}


function checkAnswer() {
    const userAnswer = normalizeString(inputResultat.value);
    const correctAnswer = normalizeString(shuffledCountries[currentCountryIndex]);
    
    if (userAnswer === correctAnswer) {
        score++;
        resultatFinal.textContent = "Bonne réponse !";
    } else {
        resultatFinal.textContent = `Mauvaise réponse ! C'était : ${shuffledCountries[currentCountryIndex]}`;
    }

    // Afficher le score actuel
    resultatFinal.textContent += ` | Score : ${score} / ${shuffledCountries.length}`;

    // Passer au pays suivant après un court délai
    setTimeout(() => {
        currentCountryIndex++;
        loadNewCountry();
    }, 2000);
}

// Ajouter un événement au bouton "Suivant"
nextButton.addEventListener("click", checkAnswer);

// Démarrer le quizz au chargement de la page
startQuiz();
