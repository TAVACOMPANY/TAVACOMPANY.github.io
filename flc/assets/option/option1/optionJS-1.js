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
      btnTryAgain = document.getElementById('btn-try-again'),
      msgOfResult = document.getElementById('msgOfResult');

const questions = [
    {
        question: 'Технические аспекты безопасности систем и сетей включают три относительно самостоятельные области, одной из которых является… ',
        options: [
            'Сетевая защита',
            'Радиоэлектронная защита',
            'Компьютерная защита',
            'Абсолютная защита',
            'Физическая защита',
        ],
        rightAnswer: 1
    },
    {
        question: 'К одной из фундаментальных областей (аспектов) безопасности систем и сетей относят…',
        options: [
            'Физическая защита',
            'Абсолютная защита',
            'Криптографическая защита',
            'Сетевая защита',
            'Компьютерная защита',
        ],
        rightAnswer: 2
    },
    {
        question: 'Одним из трех технических аспектов безопасности систем и сетей является…',
        options: [
            'Компьютерная защита информации',
            'Сетевая защита данных',
            'Физическая защита информации',
            'Защита информации от несанкционированного доступа в средствах вычислительной техники и автоматизирвоанных систем',
            'Абсолютная защита данных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Одним из системно-технических принципов безопасности является утверждение:',
        options: [
            'Компьютерная защита обеспечивает безопасность на всех уровнях передачи и обработки информации ',
            'Сетевая защита не допускает утечку или утрату информации ',
            'Криптографическая защита не допускает утечку или утрату информации',
            'Любая защита является абсолютной',
            'Любая защита не является абсолютной и при определенных условиях допускает утечку или утрату информации',
        ],
        rightAnswer: 4
    },
    {
        question: 'Одной из системно-технических аксиом безопасности является утверждение:',
        options: [
            'Любая защита обеспечивает безопасность лишь на уровне наиболее слабого звена (узкого места)',
            'Любая защита является абсолютной',
            'Криптографическая защита не допускает утечку или утрату информации',
            'Сетевая защита обеспечивает безопасность на всех звеньях (уровнях) передачи информации',
            'Компьютерная защита обеспечивает безопасность на всех уровнях передачи и обработки информации',
        ],
        rightAnswer: 0
    },
    {
        question: 'Предотвращение утечки информации по скрытым техническим каналам при работе любой электронной аппаратуры является задачей аспекта защиты …',
        options: [
            'Физическая защита',
            'Абсолютная защита',
            'Компьютерная защита',
            'Сетевая защита',
            'Радиоэлектронная защита',
        ],
        rightAnswer: 4
    },
    {
        question: 'Объектом изучения криптографии являются …',
        options: [
            'Правила преобразования данных в технических системах на основе физических законов',
            'Методы и средства преобразования сигналов в любых радиоэлектронных системах',
            'Технические и радиоэлетронные средства защиты информации',
            'Методы и средства преобразования данных в зашифрованное представление с использованием разделяемых секретов',
            'Физико-математические методы обработки данных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Область защиты информации, не обладающая формализованными методиками, пригодными для любых систем – это … ',
        options: [
            'Радиоэлектронная защита информации',
            'Криптографическая защита данных',
            'Защита информации от несанкционированного доступа в средствах вычислительной техники и автоматизирвоанных систем',
            'Компьютерная защита информации',
            'Сетевая защита данных',
        ],
        rightAnswer: 2
    },
    {
        question: 'Аспект защиты информации, получивший самостоятельное направление в Директиве 5200.28 (DoD) Министерства обороны США …',
        options: [
            'Сетевая защита информации',
            'Защита информации от несанкционированного доступа в средствах вычислительной техники и автоматизированных система',
            'Криптографическая защита информации',
            'Радиоэлектронная защита информации',
            'Компьютерная защита информации',
        ],
        rightAnswer: 1
    },
    {
        question: 'Автор, впервые изложивший в своих трудах формальные методы оценки качества криптографических методов - …',
        options: [
            'К. Шеннон',
            'Д. фон Нейман',
            'М.Э. Хеллман',
            'У. Диффи',
            'Д. Хаффман',
        ],
        rightAnswer: 0
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
        msgofScore();
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

function msgofScore() {
    if(score == 0 || score == 1)  {
        msgOfResult.innerHTML = 'Cъебись с универа.';
    } 
     else if(score == 2 || score == 3) {
        msgOfResult.innerHTML = 'Паскальщик';
     }
     else if(score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Дэлфин';
     }
     else if(score == 6 || score == 7) {
        msgOfResult.innerHTML = 'Крестовик';
     }
     else if(score == 8 || score == 9) {
        msgOfResult.innerHTML = 'Душитель питона';
     } else {
        msgOfResult.innerHTML = 'Хрестианин';
     }
}




const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    coratten();
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";   
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});