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
        question: 'Трансформатор выпрямителя предназначен ',
        options: [
            'Для стабилизации выпрямленного напряжения.',
            'Для выпрямления переменного тока.',
            'Для гальванической развязки питающей сети и нагрузки и изменения величины переменного напряжения.',
            'Для увеличения мощности источника переменного напряжения.',
            'Для изменения фазы переменного напряжения.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Типовой состав выпрямителя:',
        options: [
            'Компаратор, триггер, диодная схема (вентильная группа).',
            'Компаратор, стабилитрон, сглаживающий фильтр.',
            'Трансформатор, диодная схема (вентильная группа), сглаживающий фильтр.',
            'Трансформатор, усилитель, сглаживающий фильтр',
            'Диодная схема(вентильная группа), триггер, мультивибратор.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Отношение амплитуды первой гармоники переменной составляющей выпрямленного напряжения выпрямителя к его постоянной составляющей, это:',
        options: [
            'Коэффициент пульсаций.',
            'Коэффициент полезного действия.',
            'Амплитудная характеристика.',
            'Спектральная характеристика.',
            'Коэффициент эффективности.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Значения коэффициента пульсаций однополупериодного выпрямителя, мостового выпрямителя и двухполупериодного выпрямителя со средней точкой при отключенных фильтрах соответственно равны :',
        options: [
            '0,67; 1,57; 0,67;',
            '1,57; 0.67; 0,67;',
            '0,67; 0,67; 1,57;',
            '0,67; 0,57; 1,57;',
            '1,57; 1,57; 0,67;',
        ],
        rightAnswer: 1
    },
    {
        question: 'Выпрямитель, в котором при отключенном фильтре ток через нагрузку протекает лишь в течении полупериода сетевого напряжения, называют :',
        options: [
            'Мостовым',
            'Полупериодным',
            'Половинчатым ',
            'Односторонним',
            'Однополупериодным',
        ],
        rightAnswer: 4
    },
    {
        question: 'Минимальное число диодов в составе однополупериодного выпрямителя, мостового выпрямителя, двухполупериодного выпрямителя со средней точкой соответственно равно:',
        options: [
            '1,4,4.',
            '2,2,2.',
            '2,1,4.',
            '1,4,2.',
            '1,2,4.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Выпрямитель, представляющий собой параллельное соединение двух однополупериодных выпрямителей подключаемых к общей нагрузке в разные полупериоды сетевого напряжения, это:',
        options: [
            'Полнопериодный выпрямитель.',
            'Полный выпрямитель.',
            'Двухполупериодный выпрямитель со средней точкой.',
            'Мостовой выпрямитель.',
            'Двухсторонний выпрямитель',
        ],
        rightAnswer: 2
    },
    {
        question: 'В мостовом выпрямителе на одну диагональ диодного моста подается переменное синусоидальное напряжение, а с другой диагонали моста снимается',
        options: [
            'Пульсирующее однополярное напряжение, равное модулю входного напряжения',
            'Постоянное напряжение.',
            'Прямоугольное разнополярное напряжение.',
            'Прямоугольное однополярное напряжение.',
            'Пульсирующее однополярное напряжение, равное квадрату входного напряжения.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основные недостатки однополупериодного  выпрямителя',
        options: [
            'Низкий коэффициент пульсаций и низкая частота пульсаций',
            'Малый коэффициент усилителя и низкая мощность',
            'Большой коэффициент усиления и низкая мощность',
            'Высокая частота пульсаций и большой коэффициент пульсаций',
            'Большой коэффициент пульсаций и низкая частота пульсаций',
        ],
        rightAnswer: 4
    },
    {
        question: 'При увеличении нагрузки выпрямителя с емкостным фильтром  для сохранения коэффициента пульсаций  необходимо:',
        options: [
            'Увеличить рабочее напряжение конденсатора',
            'Увеличить емкость конденсатора',
            'Увеличить максимальный прямой ток диодов',
            'Увеличить максимальное обратное  напряжение диодов',
            'Уменьшить емкость конденсатора',
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