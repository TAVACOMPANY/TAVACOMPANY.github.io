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
        question: 'К моделям виртуальной памяти не относятся',
        options: [
            'Сегментно-страничная',
            'Фрагментная',
            'Сегментная',
            'Страничная',
            'Нет правильного ответа',
        ],
        rightAnswer: 1
    },
    {
        question: 'В большинстве современных компьютеров со страничной организацией виртуальной памяти все таблицы страниц хранятся',
        options: [
            'В кэш-памяти',
            'В буфере',
            'В облаке',
            'В основной памяти',
            'В виртуальной памяти',
        ],
        rightAnswer: 3
    },
    {
        question: 'С точки зрения ОС сегменты являются логическими сущностями и их главное назначение',
        options: [
            'хранение и защита пользовательских данных',
            'хранение и защита однородной информации',
            'хранение и защита прикладных программ',
            'хранение и защита данных восстановления',
            'защита всей системной информации',
        ],
        rightAnswer: 1
    },
    {
        question: 'Система поддержки страничной виртуальной памяти называется',
        options: [
            'System memory page',
            'Memory page',
            'Пейджингом',
            'Виртуализацией',
            'Массивом',
        ],
        rightAnswer: 2
    },
    {
        question: 'Процесс может выполняться, если его текущая страница находится в',
        options: [
            'Оперативной памяти',
            'Дамп-памяти',
            'Кэш-памяти',
            'Облаке',
            'Виртуальной памяти',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сегмент не имеет',
        options: [
            'Имя',
            'Облачное пространство',
            'Размер',
            'Уровень привилегий',
            'Флаги присутствия',
        ],
        rightAnswer: 1
    },
    {
        question: 'Каждый сегмент - линейная последовательность адресов',
        options: [
            'От 0 до 10000',
            'От 0 65654',
            'От 1 до 100000',
            'От 0 до 255',
            'От 0 до максимума',
        ],
        rightAnswer: 4
    },
    {
        question: 'При сегментно-страничной организации виртуальной памяти происходит двухуровневая трансляция',
        options: [
            'Облачного адреса в виртуальный',
            'Физического адреса в виртуальный',
            'Виртуального адреса в физический',
            'Облачного адреса в физический',
            'Физического адреса в облачный',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что не относится к внешним прерываниям',
        options: [
            'прерывания от таймера',
            'при нарушении адресации (в адресной части выполняемой команды указан запрещенный или несуществующий адрес, обращение к отсутствующему сегменту или странице при организации механизмов виртуальной памяти)',
            'прерывания от внешних устройств (прерывания по вводу-выводу)',
            'прерывания от внешних устройств (прерывания по вводу-выводу)',
            'прерывания с пульта оператора вычислительной системы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что не относится к внутренним прерываниям',
        options: [
            'от средств контроля (например, вследствие обнаружения ошибки четности, ошибок в работе различных устройств)',
            'вследствие переполнения или исчезновения порядка',
            'прерывания от другого процессора или другой вычислительной системы',
            'при наличии в поле кода операции незадействованной двоичной комбинации',
            'при делении на ноль',
        ],
        rightAnswer: 2
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