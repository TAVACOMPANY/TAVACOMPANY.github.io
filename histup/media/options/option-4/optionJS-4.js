/* все ответы */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');

/* все наши вопросы */
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
        question: 'Основная причина откочёвки казахских племен во главе с Жанибеком и Кереем: ',
        options: [
            'Поражение Абулхаира от ойратов',
            'Распад ханства Абулхаира',
            'Смягчение налоговой политики Абулхаира',
            'Рост народных восстаний',
            'Насаждение христианства среди кочевников',
        ],
        rightAnswer: 0
    },
    {
        question: 'Решение о создании в Казахстане немецкой автономии ЦК КПСС принял: ',
        options: [
            'Весной 1979 г.',
            'Весной 1978 г.',
            'Летом 1978 г.',
            'Осенью 1979 г.',
            'Летом 1979 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Крепость Ново-Ишимской линии: ',
        options: [
            'Семипалатинская',
            'Звериноголовская',
            'Железинская',
            'Ямышевская',
            'Усть-Каменогорская',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сражения в Тас-Тюбе (Тастобе), Акбулак объединяет выступление под руководством: ',
        options: [
            'К. Касымова',
            'С. Датулы',
            'С. Касымулы',
            'Ж. Нурмухамедулы, Е. Котибарулы',
            'И. Тайманулы, М Утемисулы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Фильм «два бойца» был снят силами Центральной киностудии в: ',
        options: [
            'Москве',
            'Шымкенте',
            'Оренбурге',
            'Алма-Ате',
            'Ленинграде',
        ],
        rightAnswer: 3
    },
    {
        question: 'Титул главы гуннов: ',
        options: [
            'Эльтабар',
            'Каган',
            'Шаньюй',
            'Хан',
            'Гуньмо',
        ],
        rightAnswer: 0
    },
    {
        question: 'Титул правителя кангюев: ',
        options: [
            'Виликий хан',
            'Визирь',
            'Гуньмо',
            'Каган',
            'Шаньюй',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие вопросы мог решать в Золотой Орде беклербек: ',
        options: [
            'Хозяйственные',
            'Торговые',
            'Финансовые',
            'Дипломатические',
            'Культурные',
        ],
        rightAnswer: 3
    },
    {
        question: 'Когда закончилась гражданская война в Казахстане: ',
        options: [
            '1916 г.',
            '1917 г.',
            '1921 г.',
            '1920 г.',
            '1918 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Когда была создана партия «Алаш»: ',
        options: [
            'В 1916 г.',
            'В 1917 г.',
            'В 1913 г.',
            'В 1922 г.',
            'В 1920 г.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое хозяйство было у андроновцев?: ',
        options: [
            'Рыболовство',
            'Земледелие',
            'Скотоводство и земледелие',
            'Охота',
            'Садоводство',
        ],
        rightAnswer: 2
    },
    {
        question: 'К какому веку относится найденный археологами «Золотой человек»: ',
        options: [
            'VII в. до н.э.',
            'II в. до н.э.',
            'I в. до н.э.',
            'III в. до н.э.',
            'V-IV вв. до н.э.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Автор поэмы «Кутадгу билик»: ',
        options: [
            'М.Кашгари',
            'Аль-Фараби',
            'Ю. Баласагуни',
            'А.Яссауи',
            'Коркут',
        ],
        rightAnswer: 2
    },
    {
        question: 'Когда Кенесары Касымов стал ханом: ',
        options: [
            '1837 г.',
            '1840 г.',
            '1847 г.',
            '1841 г.',
            '1839 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Движущие силы восстания 1837-1847 гг. под руководством хана Кенесары: ',
        options: [
            'Шаруа',
            'Земледельцы',
            'Старшины',
            'Феодально-байская верхушка',
            'Все перечисленные',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите регионы, вошедшие в понятие «целина»: ',
        options: [
            'Украина, Сибирь, Казахстан, Северный Узбекистан',
            'Южная Сибирь, Казахстан, Урал, Поволжье, Северный Кавказ',
            'Повожье, Казахстан, Урал, Нечерноземье России',
            'Северный Узбекистан, Южная Сибирь, Казахстан, Украина',
            'Сибирь, Северный Кавказ, Казахстан, Дальний Восток',
        ],
        rightAnswer: 1
    },
    {
        question: 'Когда был открыт Казахский Государственный музыкальный театр оперы и балета: ',
        options: [
            'В 1930 г.',
            'В 1931 г.',
            'В 1932 г.',
            'В 1933 г.',
            'В 1934 г.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Где проживали заморские саки парадарайя: ',
        options: [
            'Семиречье',
            'Приаралье',
            'Поволжье',
            'Приуралье',
            'Около Балхаша',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой город был столицей Огузского государства в Х веке: ',
        options: [
            'Тараз',
            'Сыгнак',
            'Янгикент',
            'Отрар',
            'Сауран',
        ],
        rightAnswer: 2
    },
    {
        question: 'Налог в виде скота в пользу хана или султана: ',
        options: [
            'Зякет',
            'Тагар',
            'Ушур',
            'Калым',
            'Харадж',
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