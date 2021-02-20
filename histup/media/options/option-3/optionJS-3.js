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
        question: 'Город Южного Казахстана, уцелевший от вторжения джунгар в конце XVII века: ',
        options: [
            'Сайрам',
            'Тараз',
            'Сауран',
            'Сыгнак',
            'Туркестан',
        ],
        rightAnswer: 4
    },
    {
        question: 'В 1947 г. первую продукцию дал свинцово-цинковый комбинат: ',
        options: [
            'Павладара',
            'Усть-Каменогорска',
            'Темиртау',
            'Зыряновска',
            'Рудного',
        ],
        rightAnswer: 1
    },
    {
        question: 'Оседлое скотоводство в X - XIII вв. преобладало в регионе: ',
        options: [
            'Центрального Казахстана',
            'Восточного Казахстана и Алтая',
            'Западного Казахстана',
            'Южного Казахстана и Восточного Туркестана',
            'Северного Казахстана',
        ],
        rightAnswer: 3
    },
    {
        question: 'По «Жеты-Жаргы»  все главы родов и племён, явившиеся на нородное собрание без оружия: ',
        options: [
            'На совет не допускались',
            'Получали оружие на совете',
            'Лишались права носить оружие',
            'Привлекались к ответственности',
            'Допускались на совет, но их лишали звания',
        ],
        rightAnswer: 0
    },
    {
        question: 'Событие второй половине XIV века, усилившее внутреннюю нестабильность Золотой Орды: ',
        options: [
            'Принятие ханом Узбеком ислама',
            'Поражение Мамая на Куликовом поле',
            'Сожжение Тохтамышем Москвы',
            'Разрыв дипломатических отношений с Византией',
            'Заключение военного союза с султаном Бейбарысом',
        ],
        rightAnswer: 1
    },
    {
        question: 'Весь Казахстан, Среднию Азию, часть Сибири и Кавказ охватило восстание: ',
        options: [
            '1870 г.',
            '1783 - 1897 гг',
            '1916 г.',
            '1837 - 1847 гг.',
            '1836 - 1838 гг.',
        ],
        rightAnswer: 2
    },
    {
        question: 'С 2007 г. девять депутатов Мажилиса Парламента избираются от: ',
        options: [
            'Партии «Ак жол»',
            'Партии «Нур Отан»',
            'Движения «Азат»',
            'Ассамблеи народа Казахстана',
            'Лиги женщин-мусульманок Казахстана',
        ],
        rightAnswer: 3
    },
    {
        question: 'Причина разробленности Казахского ханства к концу правления хана Тауке: ',
        options: [
            'Стремление султанов к самостоятельности',
            'Отсутствие единых законов, регламентирующих отношения с властью',
            'Выход из ханства племён Заподной Сибири',
            'Непрерывные завоевательные походы',
            'Привлечение биев к управлению государством',
        ],
        rightAnswer: 0
    },
    {
        question: 'Мухтар Ауэзов удостоен Государственной премии за роман-эпопею: ',
        options: [
            '«Оплот народа»',
            '«Пробужденный край»',
            '«Кочевники»',
            '«Путь Абая»',
            '«Тернистый путь, трудный переход»',
        ],
        rightAnswer: 3
    },
    {
        question: 'В ноябре 1917 г. IV Чрезвычайный Всетуркестанский съезд собрался в городе: ',
        options: [
            'Туркестане',
            'Бухаре',
            'Ташкенте',
            'Коканде',
            'Верном',
        ],
        rightAnswer: 3
    },
    {
        question: 'В 1999 году в республике получили большой резонанс торжества по поводу 100-летия со дня рождения: ',
        options: [
            'А.Кунанбаева',
            'Ж.Аймауытова',
            'К.Сатпаева',
            'Ж.Жабаева',
            'А.Байтурсынова',
        ],
        rightAnswer: 2
    },
    {
        question: 'Одержав победу над Огулшаком, Сатук Богра-хан подчинил себе: ',
        options: [
            'Испиджаб и Мавераннахр',
            'Баласагун и Жетысу',
            'Суяб и Фергану',
            'Узгенд и Согдиану',
            'Тараз и Кашгарию',
        ],
        rightAnswer: 4
    },
    {
        question: 'Изготавливали тамги для обозначения частной собственности племена: ',
        options: [
            'Гуннов',
            'Уйсуней',
            'Саков',
            'Сарматов',
            'Кангюев',
        ],
        rightAnswer: 1
    },
    {
        question: 'Указ о либерализаций цен на территории Казахстана вышел в: ',
        options: [
            '1998 г.',
            '1996 г.',
            '1997 г.',
            '1992 г.',
            '1990 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'События 1989 года в Жанаозене (Жана-Узене) и Караганде являются: ',
        options: [
            'Революцией',
            'Религиозными войнами',
            'Массовым недовольством политикой власти',
            'Гражданской войной',
            'Референдумом',
        ],
        rightAnswer: 2
    },
    {
        question: 'О процессе вхождения Младшего жуза в состав России содержится информация в научном труде П.И.Рычкова: ',
        options: [
            '«История Оренбургская»',
            '«Описание Средней Орды киргиз-кайсаков»',
            '«Изъяснение о киргиз-кайсацкой и каракалпакской ордах»',
            '«Путешествие по разным провинциям Российской империи»',
            '«Описание всех в Российском государстве обитающих народов»',
        ],
        rightAnswer: 0
    },
    {
        question: 'Древнее городище эпохи бронзы: ',
        options: [
            'Аркаим',
            'Каратау',
            'Тараз',
            'Арыстанды',
            'Акбешим',
        ],
        rightAnswer: 0
    },
    {
        question: 'Правитель государства Караханидов объявивший ислам государственной религией: ',
        options: [
            'Муса',
            'Сатук',
            'Кучлук',
            'Текеш',
            'Огулшак',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основное хозяйственное занятие саков: ',
        options: [
            'Ремесло',
            'Торговля',
            'Земледелие',
            'Рыболовство',
            'Скотоводство',
        ],
        rightAnswer: 4
    },
    {
        question: 'Гуньмо - это титул правителя государства: ',
        options: [
            'Гуннов',
            'Уйсунов',
            'Саков',
            'Сарматов',
            'Кангюев',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});