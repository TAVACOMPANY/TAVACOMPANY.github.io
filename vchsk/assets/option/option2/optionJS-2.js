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
      msgOfResult = document.getElementById('msgOfResult'),
      br = '</br>';

const questions = [
    {
        question: 'Адаптивный диалог, в отличие от гибкого диалога, характеризуется тем, что',
        options: [
            'интерфейс сам настраивается под пользователя',
            'пользователь настраивает интерфейс «под себя»',
            'интерфейс частично настраиваемый',
            'интерфейс ненастраиваемый',
            'интуитивный интерфейс',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой оператор очищает список ListBox1',
        options: [
            'listBox1.Items.Clear()',
            'listBox1.Items.Clear = true',
            'listBox1.Clear()',
            'listBox1.Clear = true',
            'listBox1.Items.Clear() = true',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой оператор выделяет пятый по счету элемент списка ListBox1?',
        options: [
            'listBox1.SetSelected(5, true)',
            'listBox1.Items(5) = true',
            'listBox1.SetSelected(4, true)',
            'listBox1.SetSelected(6, true)',
            'listBox1.Items(4) = true',
        ],
        rightAnswer: 0
    },
    {
        question: 'Отнесение объекта к определённой категории',
        options: [
            'Отнесение объекта к определённой категории',
            'Преимущественное выделение одних объектов по сравнению с другими',
            'Относительное постоянство некоторых воспринимаемых свойств предметов при неизменности условий восприятия',
            'Результат анализа и синтеза раздражителей в процессе деятельности оператора',
            'Относительное постоянство некоторых воспринимаемых свойств предметов при изменении условий восприятия',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что формируется на основе синтеза ощущений?',
        options: [
            'Опознавание',
            'Различение',
            'Восприятие',
            'Обнаружения объекта',
            'Мышление',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое ScrollBar',
        options: [
            'полоса прокрутки',
            'ползунковый регулятор',
            'выпадающий список',
            'комбинированный список',
            'всплывающая подсказка',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое ProgressBar?',
        options: [
            'полоса прокрутки',
            'выпадающий список',
            'комбинированный список',
            'всплывающая подсказка',
            'индикатор состояния прогресса',
        ],
        rightAnswer: 4
    },
    {
        question: 'Концептуальная модель является … образом реального мира',
        options: [
            'Окончательным',
            'Субъективным',
            'Интуитивным',
            'Объективным',
            'Неизменным',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какого размера пиктограмма может присутствовать при 256 цветах в палитре',
        options: [
            '50*50 пикселей',
            '48*48 пикселей',
            '84*84 пикселей',
            '40*40 пикселей',
            '58*58 пикселей',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой вид пользовательского интерфейса сейчас наиболее рапространён?',
        options: [
            'WIMP-интерфейс',
            'Биометрический',
            'Командный',
            'Голосовой',
            'Логический',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});