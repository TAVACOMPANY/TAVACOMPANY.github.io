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
        question: 'Философские взгляды этого мыслителя положили начало социальным утопиям Возрождения. Назовите автора работы «Утопия», основателя утопического социализма.',
        options: [
            'Николай Кузанский',
            'Петрарка',
            'Эразм Роттердамский',
            'Мишель Монтень',
            'Томас Мор',
        ],
        rightAnswer: 4
    },
    {
        question: 'Космос, логос, эйдос, агон, энтелехия – основные категории философии …',
        options: [
            'Античности',
            'Средневековья',
            'Нового времени',
            'Просвещения',
            'Возрождения',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что представляет собой суфизм, как религиозное и культурное течение в исламе?',
        options: [
            'ортодоксальное направление ислама',
            'древне-религиозное течение',
            'научно-идеалистическая школа',
            'мистико-аскетическое направление в исламе ',
            'логическое направление в исламе',
        ],
        rightAnswer: 3
    },
    {
        question: '«Монада» в системе Лейбница – это…',
        options: [
            'Бытие общества',
            'Простая субстанция',
            'Вторая природа',
            'Бытие человека',
            'Первая природа',
        ],
        rightAnswer: 1
    },
    {
        question: 'Основное понятие даосизма.',
        options: [
            'нирвана',
            'путешествие',
            'путь вещей (закон)',
            'йога',
            'ненасилие',
        ],
        rightAnswer: 2
    },
    {
        question: 'Автор книги «Беседы и суждения» ( «Лунь-юй»).',
        options: [
            'Мэн-цзы',
            'Кун-фу-цзы',
            'Сюнь-цзы',
            'Вэн-цзы',
            'Лао-цзы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Синергетика – это:',
        options: [
            'наука о самоорганизующихся системах',
            'наука об образовании кристаллов',
            'наука о природе',
            'наука о направлении ветра',
            'наука о социуме',
        ],
        rightAnswer: 0
    },
    {
        question: 'Абай современное ему состояние казахского общества характеризует…',
        options: [
            'как серебряный век',
            'как золотой век',
            'как этап на пути к определенной цели',
            'как бронзовый век',
            'критически, как требующее преобразований',
        ],
        rightAnswer: 4
    },
    {
        question: 'Автор трудов: «Капитал», «Нищета философии», «Экономическо-философские рукописи 1844 года».',
        options: [
            'Фихте',
            'Гегель',
            'Ленин',
            'Маркс',
            'Шеллинг',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кто из ниже перечисленных философов в центр своего учения поставил человека?',
        options: [
            'Флоренский',
            'Лосский',
            'Бердяев',
            'Трубецкой',
            'Хомяков',
        ],
        rightAnswer: 2
    },
    {
        question: 'Идея материалистического понимания истории принадлежит…',
        options: [
            'Ленину',
            'Марксу',
            'Вольтеру',
            'Плеханову',
            'Гольбаху',
        ],
        rightAnswer: 1
    },
    {
        question: 'Развитие в концепции диалектики означает:',
        options: [
            'направленное, необратимое, закономерное изменение объектов ',
            'изменение по кругу',
            'изменение вообще',
            'состояние вещей',
            'эволюцию',
        ],
        rightAnswer: 0
    },
    {
        question: 'Этот русский мыслитель идеализирует русскую сельскую общину, усматривая в ней наибольшее приближение к общественному идеалу. В славянофильской философии он разработал понятие «соборность» (общинность):',
        options: [
            'К. Аксаков',
            'А. Островский',
            'А. Хомяков',
            'В. Даль',
            'В. Тютчев',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто впервые выразил диалектическую формулу “триады” (тезис-антитезис-синтез)?',
        options: [
            'Кант',
            'Маркс',
            'Энгельс',
            'Гегель',
            'Фихте',
        ],
        rightAnswer: 3
    },
    {
        question: '«Симулякр», «ризома», — понятия характеризующие философию …',
        options: [
            'постпозитивистов',
            'фрейдизма',
            'писателей-утопистов',
            'хиппи',
            'постмодернистов',
        ],
        rightAnswer: 4
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

if(score == 0 || score == 1 || score == 2)  {
    msgOfResult.innerHTML = 'Пидр';
} 
 else if(score == 3 || score == 4 || score == 5) {
    msgOfResult.innerHTML = 'Не плохо, но все еще пидр';
 }
 else if(score == 6 || score == 7 || score == 8) {
    msgOfResult.innerHTML = 'Средний пидр';
 }
 else if(score == 9 || score == 10 || score == 11) {
    msgOfResult.innerHTML = 'Нормальный пидр';
 }
 else if(score == 12 || score == 13 || score == 14) {
    msgOfResult.innerHTML = 'Запомнивший пидр';
 } else {
    msgOfResult.innerHTML = 'Умный пидр';
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