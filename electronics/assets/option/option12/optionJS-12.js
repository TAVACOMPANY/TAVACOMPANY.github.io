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
        question: 'Дифференциальный усилитель',
        options: [
            'Инвертирует входной сигнал',
            'Дифференцирует входной сигнал',
            'Выдает разность двух сигналов',
            'Разделяет входные сигналы по фазе',
            'Суммирует два входных сигнала',
        ],
        rightAnswer: 2
    },
    {
        question: 'Инвертирующий усилитель',
        options: [
            'Усиливает только переменную составляющую входного сигнала',
            'Изменяет амплитуду и сохраняет фазу входного сигнала',
            'Изменяет фазу входного сигнала на ' + '<img src="gradus360.png">',
            'Изменяет фазу входного сигнала на ' + '<img src="gradus180.png">' + ' и амплитуду в ' + '<img src="rformula.png">' + 'раз',
            'Изменяет фазу входного сигнала на ' + '<img src="gradus90.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Сигнал на выходе логического элемента И-НЕ равен',
        options: [
            '0, если все входные сигналы 1, иначе 1',
            '1, если все входные сигналы 1, иначе 0',
            '1, если хотя бы один входной сигнал 0, иначе 0',
            '1, если хотя бы один входной сигнал 1, иначе 0',
            '0, если хотя бы один входной сигнал 1, иначе 1',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сигнал на выходе логического элемента ИЛИ-НЕ равен',
        options: [
            '0, если все входные сигналы 1, иначе 1',
            '0, если хотя бы один входной сигнал 1, иначе 1',
            '1, если хотя бы один входной сигнал 0, иначе 0',
            '1, если все входные сигналы 1, иначе 0',
            '1, если хотя бы один входной сигнал 1, иначе 0',
        ],
        rightAnswer: 1
    },
    {
        question: 'Комбинационная схема, выходной двоичный код которой равен номеру входа с единственным сигналом «1», это:',
        options: [
            'Коммутатор',
            'Демультиплексор',
            'Мультиплексор',
            'Дешифратор',
            'Шифратор',
        ],
        rightAnswer: 4
    },
    {
        question: 'Комбинационная схема, входной двоичный код которой равен номеру выхода с единственным сигналом «1», это:',
        options: [
            'Коммутатор',
            'Демультиплексор',
            'Мультиплексор',
            'Дешифратор',
            'Шифратор',
        ],
        rightAnswer: 3
    },
    {
        question: 'Коэффициент разветвления по выходу логического элемента это:',
        options: [
            'Число выходов элемента',
            'Число ветвей его алгоритма функционирования',
            'Число входов аналогичных элементов, которые могут быть подключены к выходу',
            'Коэффициент усиления элемента',
            'Число выходных транзисторов элемента',
        ],
        rightAnswer: 2
    },
    {
        question: 'Логический элемент с открытым коллектором- это элемент, у которого',
        options: [
            'Коллектор выходного транзистора никуда не подключен',
            'Всегда открыт коллекторный переход выходного транзистора',
            'Коллектор открыт, когда эмиттер закрыт',
            'Открыта передача сигнала от базы к коллектору выходного транзистора',
            'Коллекторный вход открыт для приема сигнала',
        ],
        rightAnswer: 0
    },
    {
        question: 'Высокоимпедансное  состояние логического элемента - это, когда',
        options: [
            'На выходе элемента высокий уровень напряжения',
            'Нагрузка элемента имеет высокое сопротивление',
            'Выход элемента недогружен',
            'Выход элемента перегружен',
            'Выход элемента отключается от нагрузки',
        ],
        rightAnswer: 4
    },
    {
        question: 'Связь между каскадами усилителя постоянного тока может быть',
        options: [
            'Конденсаторной.',
            'Непосредственной. ',
            'Трансформаторной.',
            'Конденсаторной и трансформаторной.',
            'Непосредственной и конденсаторной',
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