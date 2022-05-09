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
        question: 'Наиболее распространенная классификация способностей',
        options: [
            'общие и талант',
            'одаренность и гениальность',
            'общие и специальные',
            'художественные и музыкальные',
            'творческие и мыслительные',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сознательная регуляция человеком собственных состояний, побуждений и действий на основе сопоставления их с некоторыми субъективными нормами и представлениями',
        options: [
            'Мотивация',
            'Медиация',
            'Настроение',
            'Самоконтроль',
            'Медитация',
        ],
        rightAnswer: 3
    },
    {
        question: 'Установки, связанные с представлениями индивида о том, как его видят другие',
        options: [
            'зеркальное (социальное) Я',
            'развивающееся Я',
            'желаемое Я',
            'реальное Я',
            'идеальное Я',
        ],
        rightAnswer: 0
    },
    {
        question: 'Мотивация избегания неудачи –',
        options: [
            'определяет направленность активности организма, то, ради чего избираются одни, а не другие акты поведения',
            'выработанный в психике механизм избегания ошибок, неудач любыми путями и средствами',
            'характеристика локализации причин, исходя из которых человек объясняет свое поведение и ответственность, как и наблюдаемое им поведение и ответственность других людей',
            'главный, основной мотив, побуждающий к некой деятельности в случае ее полимотивированности',
            'выработанный в психике механизм достижения, действующий по формуле: мотив «жажда успеха» - активность - цель - «достижение успеха»',
        ],
        rightAnswer: 1
    },
    {
        question: 'Образ желаемого будущего, осознаваемый результат, на достижение которого направлено действие, – это ...',
        options: [
            'Мотив',
            'Операция',
            'Потребность',
            'Задача',
            'Цель',
        ],
        rightAnswer: 4
    },
    {
        question: 'Метод наблюдения входит в группу:',
        options: [
            'обработки данных',
            'теоретических методов',
            'интерпретационных методов',
            'эмпирических методов',
            'организационных методов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой из перечисленных факторов не входит мотивационный профиль (Шейлы Ричи и Питера Мартина)',
        options: [
            'Признание заслуг',
            'Комфортные физические условия работы',
            'Здоровый образ жизни',
            'Самостоятельность, независимость и самосовершенствование',
            'Постановка и достижение целей',
        ],
        rightAnswer: 2
    },
    {
        question: 'Показатель быстроты смены процессов возбуждения и торможения',
        options: [
            'Подвижность',
            'Сила',
            'Талант',
            'Одаренность',
            'Уравновешенность',
        ],
        rightAnswer: 0
    },
    {
        question: 'Способ научного познания сущности психических явлений и их закономерностей – это',
        options: [
            'Индукция',
            'Анализ',
            'Психологическое тестирование',
            'Психологическое консультирование',
            'Психологическое исследование',
        ],
        rightAnswer: 4
    },
    {
        question: 'Основатель телесной терапии:',
        options: [
            'З. Фрейд',
            'В. Райх',
            'М. Вертгеймер',
            'К.Д. Ушинский',
            'В. Вольф',
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