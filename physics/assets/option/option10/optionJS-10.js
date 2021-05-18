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
      br = '<br/>';

const questions = [
    {
        question: 'Какие частицы обладают волновыми свойствами?',
        options: [
            'Частицы, движущиеся с большими скоростями',
            'Любые частицы',
            'Частицы, движущиеся с ускорением',
            'Только заряженные частицы',
            'Электрически нейтральные частицы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Укажите выражение, определяющее энергию поля заряженного конденсатора.',
        options: [
            '<img src="img10/image17- 4.png" class="smallf">',
            '<img src="img10/image17- 1.png" class="smallf">',
            '<img src="img10/image17- 5.png" class="smallf">',
            '<img src="img10/image17- 2.png" class="smallf">',
            '<img src="img10/image17- 3.png" class="smallf">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Провод сопротивлением 2 Ом сложили вдвое и включили в ту же цепь. Чему равно сопротивление этого участка?',
        options: [
            '1 Ом',
            '0,25Ом',
            '2 Ом',
            '0,5 Ом',
            '4 Ом',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какая поверхность называется эквипотенциальной?',
        options: [
            'Поверхность, имеющая сферическую форму, которой можно охватить любое заряженное тело',
            'Поверхности, количественно характеризующие распределение поля в пространстве',
            'Поверхность, параллельная силовым линиям однородного электростатического поля',
            'Поверхность любого тела в электрическом поле',
            'Поверхность, все точки которой имеют один и тот же потенциал',
        ],
        rightAnswer: 4
    },
    {
        question: 'Закон Кирхгофа для теплового излучения... .',
        options: [
            '<img src="img10/image20- 4.png">',
            '<img src="img10/image20- 3.png">',
            '<img src="img10/image20- 1.png">',
            '<img src="img10/image20- 2.png">',
            '<img src="img10/image20- 5.png">',
        ],
        rightAnswer: 0
    },
    {
        question: 'Человек приближается к плоскому зеркалу со скоростью 2 м/с. С какой скоростью он приближается к своему отражению?',
        options: [
            '0',
            '4 м/с',
            '1 м/с',
            '2 м/с',
            'Нет правильного ответа',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какую скорость приобретет заряженная частица (заряд q, масса m), пройдя в электрическом поле ускоряющую разность потенциалов U:',
        options: [
            '<img src="img10/image22- 1.png">',
            '<img src="img10/image22- 2.png">',
            '<img src="img10/image22- 4.png">',
            '<img src="img10/image22- 5.png">',
            '<img src="img10/image22- 3.png" class="smallf">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Условие минимума для дифракции Фраунгофера на одной щели.',
        options: [
            '<img src="img10/image23- 2.png" class="relyat">',
            '<img src="img10/image23- 4.png" class="relyat">',
            '<img src="img10/image23- 1.png" class="relyat">',
            '<img src="img10/image23- 3.png" class="relyat">',
            '<img src="img10/image23- 5.png" class="relyat">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как вычисляется работа тока на участке цепи:',
        options: [
            '<img src="img10/image24- 5.png" class="smallf">',
            '<img src="img10/image24- 2.png">',
            '<img src="img10/image24- 1.png">',
            '<img src="img10/image24- 4.png">',
            '<img src="img10/image24- 3.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Определить энергию фотона, испускаемого при переходе электрона с третьего энергетического уровня на основной.',
        options: [
            '12,1 эВ',
            '1,8 эВ',
            '21,1 эВ',
            '3,2 эВ',
            '10 эВ',
        ],
        rightAnswer: 0
    },
    {
        question: 'По какой формуле определяется энергия заряженного конденсатора в колебательном контуре?',
        options: [
            '<img src="img10/image26- 1.png">',
            '<img src="img10/image26- 3.png">',
            '<img src="img10/image26- 5.png">',
            '<img src="img10/image26- 2.png" class="relyat">',
            '<img src="img10/image26- 4.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Эффект Комптона (формула)... .',
        options: [
            '<img src="img10/image27- 4.png">',
            '<img src="img10/image27- 2.png">',
            '<img src="img10/image27- 5.png" class="relyat">',
            '<img src="img10/image27- 1.png">',
            '<img src="img10/image27- 3.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Два одинаковых шарика, имеющих заряды ' + '<img src="img10/image28- 00.png" class="relyat"> ' + '<img src="img10/image28- 01.png" class="relyat"> ' + ' привели в соприкосновение и разъединили. Заряды шариков стали:',
        options: [
            '<img src="img10/image28- 4.png" class="relyat">',
            '<img src="img10/image28- 2.png" class="relyat">',
            '<img src="img10/image28- 5.png" class="relyat">',
            '<img src="img10/image28- 1.png" class="relyat">',
            '<img src="img10/image28- 3.png" class="relyat">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Энергия фoтона... .',
        options: [
            '<img src="img10/image29- 5.png">',
            '<img src="img10/image29- 4.png">',
            '<img src="img10/image29- 2.png">',
            '<img src="img10/image29- 1.png">',
            '<img src="img10/image29- 3.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Импульс фотона … .',
        options: [
            '<img src="img10/image30- 4.png">',
            '<img src="img10/image30- 5.png">',
            '<img src="img10/image30- 3.png">',
            '<img src="img10/image30- 2.png">',
            '<img src="img10/image30- 1.png">',
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