/* все ответы */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');

/* все вопросы */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страниц

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Итоговый Результат

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'The Turkish strategy encompassed varying approaches and was _____ that of the English, necessitating a rethinking of traditional counterinsurgency methods.',
        options: [
            'so adaptable as',
            'so adaptable',
            'more adaptable than',
            'the most adaptable',
            'adaptable enough',
        ],
        rightAnswer: 2
    },
    {
        question: 'The economic downfall of the U.S. has affected many countries and Haiti is one of _____ one.',
        options: [
            'the most affecting',
            'more affecting',
            'as affected as',
            'the most affected',
            'more affected than',
        ],
        rightAnswer: 3
    },
    {
        question: 'Insurance companies would spend a lot _____ paying the $10 cost of a flu shot for each employee _____ they would pay to stop the resulting outbreak.',
        options: [
            'less / than',
            'so little / as',
            'such little / that',
            'the least / as',
            'so little / that',
        ],
        rightAnswer: 0
    },
    {
        question: 'Penguins are the most highly specialized of all birds for marine life. They swim entirely by means of their flipperlike wings, using their webbed feet as rudders. Their stiff feathers serve as insulation, and are waterproof when oiled. Since their legs are set far back on their bodies, they waddle awkwardly on land often travel by swinging on their bellies over the ice as they migrate sometimes great distances. Underwater they can swim up to 25 miles (40.3km) per hour as they pursue the fish, squid, and shrimp that form their diet. _____ . This results in weight losses of up to lb (33.8 kg) during the two-month incubation period.',
        options: [
            'They do not eat while on land, subsisting on a layer of fat under the skin',
            'The largest penguins, the emperor and the king (3 -4 f t / 91.5-122 cm in height), incubate their eggs between their feet in a fold of skin',
            'Their chief enemies are the leopard seal, killer whale, and skua gull',
            'Penguins are highly gregarious, and a population density of half a million birds',
            'There are 17 species of penguins, 10 of which are considered endangered or threatened',
        ],
        rightAnswer: 1
    },
    {
        question: 'Benjamin Franklin, one of America’s founding fathers, wrote that “They that can give up essential liberty to obtain a little temporary safety deserve neither liberty nor safety.” _____ . What precisely are the essential liberties which, when given up, make a liberal society unworthy of the name? In Franklin’s own country, as well as in Britain, Australia and elsewhere, these questions are proving particularly vexing to policymakers trying to deal with terrorism.',
        options: [
            'Some of the government`s other proposals are perhaps even more controversial than detention without charge',
            'Ministers had argued that 14 days’ detention without charge was too short to assess lots of complex and classified evidence',
            'The Pentagon issued new guidelines on prisoner interrogations, in an implicit response to the abuses at Baghdad’s prison',
            'Britain`s prime minister, Blair, announced that "the rules of the game are changing” and proposed new security measures to Parliament',
            'He presaged an argument that is raging almost two and a half centuries late',
        ],
        rightAnswer: 4
    },
    {
        question: 'Low levels of hormones can cause a laundry list of health problems______ fatigue, weight gain, and joint pain.',
        options: [
            'Sustaining',
            'Clarifying',
            'Confirming',
            'Including',
            'Excluding',
        ],
        rightAnswer: 3
    },
    {
        question: 'In training it is suggested that an instructor not lay a burden on an individual beyond his_____ .',
        options: [
            'Bearable',
            'Value',
            'Limit',
            'Moral',
            'Deficiency',
        ],
        rightAnswer: 2
    },
    {
        question: 'The company I work for offered me to choose between a better salary and a flat in the city centre and I chose ____.',
        options: [
            'the latter',
            'so late',
            'the later',
            'late',
            'the last',
        ],
        rightAnswer: 0
    },
    {
        question: 'The archaeologist enjoyed the ____ life she led while gathering artifacts; she never stayed at any one site long enough to get bored.',
        options: [
            'Rustic',
            'Clamorous',
            'Stealthy',
            'Indiscreet',
            'Nomadic',
        ],
        rightAnswer: 4
    },
    {
        question: 'Like most students, Emily was juggling a full schedule of classes. But in the middle of her junior year, she became overwhelmed by her normal routine. She rarely went out. Now a 30-year-old retail analyst. "Even though my eating habits hadn`t changed, I kept gaining weight." At first she chalked it up to the winter blues._____ ',
        options: [
            'A butterfly-shaped gland in her neck hasoccured',
            'But then a routine test at her yearly checkup showed something different: hypothyroidism',
            'And then she met Adrian, her husband for the next 20 years',
            'Most women aren`t diagnosed as easily as Emily',
            'Her doctor prescribed a recipe, and within a few weeks her energy levels improved',
        ],
        rightAnswer: 1
    },
];
  
numberOfAllQuestion.innerHTML = questions.length;  // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    option5.innerHTML = questions[indexOfQuestion].options[4];

    numberOfQuestion.innerHTML = indexOfPage + 1; // устоновка номера страницы 
    indexOfPage++;
};

let comletedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(comletedAnswers.length > 0) {
            comletedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(comletedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    comletedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
         const div = document.createElement('div');
         answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const attModal = document.querySelector('.attention-over-modal');
const btnClosed = document.getElementById("btn-close");

btnClosed.addEventListener('click', function () {
    attModal.classList.remove('actived');
});

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
       attModal.classList.add('actived');
    } else {
        randomQuestion();
        enableOptions();
    }

};

btnNext.addEventListener('click', validate);

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";
    coratten();
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});