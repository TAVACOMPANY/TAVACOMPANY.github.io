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
        question: 'Власть - это … .',
        options: [
            'одна из основных характеристик современной мировой системы',
            'необходимый эмоциональный фактор политики',
            'центральное, организованное и регулятивно-контрольное начало политики',
            'стимулирование',
            'рациональное начало',
        ],
        rightAnswer: 2
    },
    {
        question: 'По функциям органов, власть имеет три ветви:',
        options: [
            'справедливая, непоколебимая, стабильная',
            'экономическая, семейная, политическая',
            'общественная, публичная, личная',
            'законодательная, исполнительная, судебная',
            'автократическая, олигархическая, самоуправленческая',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какая власть обладает монопольным правом на применение насилия?',
        options: [
            'Государственная',
            'Судебная',
            'Политическая',
            'Экономическая',
            'Тоталитарная',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите форму власти, которая выражается в законах, правовых актах и т.д.',
        options: [
            'Судебная',
            'Государственная',
            'Политическая',
            'Экономическая',
            'Теократическая',
        ],
        rightAnswer: 1
    },
    {
        question: 'Любая власть стремится к расширению, а это приводит к установлению диктаторской власти, коррупции. Укажите меру для предотвращения этого явления.',
        options: [
            'Приоритет судебной власти',
            'Уголовное наказание',
            'Строгий контроль со стороны общества',
            'Ограничение полномочий той или иной власти',
            'Разделение властей',
        ],
        rightAnswer: 4
    },
    {
        question: 'Власть является центральным элементом политики. Что является двигателем власти?',
        options: [
            'Амбиции политических лидеров',
            'Борьба за власть',
            'Народ',
            'Интересы людей',
            'Деятельность политиков',
        ],
        rightAnswer: 3
    },
    {
        question: 'Укажите форму государственного правления, основанную на принципах народовластия, равенства и свободы.',
        options: [
            'Олигархия',
            'Социализм',
            'Демократия',
            'Республика',
            'Полития',
        ],
        rightAnswer: 2
    },
    {
        question: 'Согласно бихеовиристской трактовке власти, власть - это … ',
        options: [
            'особый тип поведения людей (командование и подчинение)',
            'государство и его устройство (армия, полиция и т.д.)',
            'городская психология и быт',
            'политический строй',
            'психология поведения политических лидеров',
        ],
        rightAnswer: 0
    },
    {
        question: 'Субъект власти- это …',
        options: [
            'деятельностный агент',
            'независимый агент',
            'подчиняющийся агент',
            'пассивное, второстепенное начало власти',
            'активное, направляющее начало власти',
        ],
        rightAnswer: 4
    },
    {
        question: 'Степень согласия между управляющими и управляемыми характеризует … ',
        options: [
            'верховенство закона',
            'легитимность власти',
            'справедливость власти',
            'демократичность власти',
            'законность власти',
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