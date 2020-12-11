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
        question: 'С 1 января 2010 г. начал действовать Таможенный союз с участием: ',
        options: [
            'Белоруссии, Казахстана, России',
            'Белоруссии, Казахстана, России, Украины',
            'Белоруссии, Казахстана, России, Таджикистана',
            'Белоруссии, Казахстана, России, Армении',
            'Белоруссии, Казахстана, России, Армении, Кыргызстана',
        ],
        rightAnswer: 0
    },
    {
        question: 'Институт президентства в Казахстане учреждён: ',
        options: [
            'Апрель 1990 г.',
            'Май 1990 г.',
            'Июнь 1990 г.',
            'Август 1991 г.',
            'Декабрь 1991 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Национальный академический театр оперы и балета «Астана Опера» открыт в...  ',
        options: [
            '2013 г',
            '2011 г.',
            '2014 г.',
            '2012 г.',
            '2010 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Национальный академический театр оперы и балета «Астана Опера» открылся постановкой? ',
        options: [
            'Оперы «Кыз-Жибек»',
            'Оперы «Амангельды»',
            'Оперы «Абай»',
            'Балета «Спартак»',
            'Оперы «Биржан и Сара»',
        ],
        rightAnswer: 4
    },
    {
        question: '«100 конкретных шагов» состоит из разделов? ',
        options: [
            '5',
            '6',
            '4',
            '7',
            '3',
        ],
        rightAnswer: 0
    },
    {
        question: '«100 конкретных шагов» наметили оптимизацию инстанций судебной системы от 5-ступенчатой к 3-уровневой, в которую войдут инстанции? ',
        options: [
            'Первая, повторная, надзорная',
            'Первая, повторная, кассационная',
            'Первая, апелляционная, повторная',
            'Первая, апелляционная, надзорная',
            'Первая, апелляционная, кассационная',
        ],
        rightAnswer: 4
    },
    {
        question: 'С целью формирования идентичности и единства общества «100 конкретных шагов» наметили внедрение в школьную программу ценностей? ',
        options: [
            'Национального проекта «Нұрлы болашақ»',
            'Стратегии «Казахстан-2050»',
            'Идеи Общества Всеобщего Труда',
            'Программы инфрaструктурного развития «Нұрлы жол»',
            'Патриотического акта «Мәңгілік ел»',
        ],
        rightAnswer: 4
    },
    {
        question: 'Госпрограмма инфраструктурного развития на 2015-19 гг. называется? ',
        options: [
            '«100 конкретных шагов»',
            '«Нұрлы болашақ»',
            '«Мәңгілік ел» ',
            '«Нұрлы жол»',
            'Общество Всеобщего Труда',
        ],
        rightAnswer: 3
    },
    {
        question: '«Саламатты Қазақстан» - это: ',
        options: [
            'Госпрограмма развития культуры РК',
            'Госпрограмма развития казахского языка',
            'Госпрограмма развития образования РК',
            'Госпрограмма развития здравоохранения РК',
            'Госпрограмма развития науки РК',
        ],
        rightAnswer: 3
    },
    {
        question: 'Госпрограмма «Информационный Казахстан - 2020» имеет цель? ',
        options: [
            'Создание условий для перехода к гражданскому обществу',
            'Создание условий для перехода к светскому обществу',
            'Создание условий для перехода к 12-летнему образованию',
            'Создание условий для перехода к информационному обществу',
            'Создание условий для перехода к открытому обществу',
        ],
        rightAnswer: 3
    },
    {
        question: '«Госпрограмма «Информационный Казахстан - 2020» ставит задачу довести уровень компьютерной грамотности до: ',
        options: [
            '75%',
            '80% ',
            '95%',
            '65%',
            '100%',
        ],
        rightAnswer: 1
    },
    {
        question: 'Госпрограмма «Информационный Казахстан - 2020» ставит задачу довести до 100% уровень компьютеризации учреждений? ',
        options: [
            'Образования, науки',
            'Образования, науки и здравоохранения',
            'Банковской сферы',
            'Обороны',
            'Здравоохранения',
        ],
        rightAnswer: 1
    },
    {
        question: 'Госпрограмма развития и функционирования языков в РК на 2011-2020 годы ставит задачу увеличения доли населения, владеющего 3 языками (казахский, русский, английский) к 2020 г.: ',
        options: [
            'До 20%',
            'До 15%',
            'До 25%',
            'До 30%',
            'До 10%',
        ],
        rightAnswer: 1
    },
    {
        question: 'Стратегия развития РК до 2050 г. определяет в качестве «ведущей силы национальной экономики»? ',
        options: [
            'Специалистов образования',
            'Предпринимательство',
            'Экономистов и финансистов',
            'Инженерно-технические кадры',
            'Научных работников',
        ],
        rightAnswer: 1
    },
    {
        question: 'Авторы Герба Республики Казахстан: ',
        options: [
            'Ш. Ниязбеков, Х. Наурызбаев',
            'К. Алимбаев, Ж. Малибеков',
            'К. Алимбаев, Ш. Ниязбеков',
            'Ш. Уалиханов, Ш. Ниязбеков',
            'Ж. Малибеков, Ш. Уалиханов',
        ],
        rightAnswer: 4
    },
    {
        question: 'С 2003 г. в Астане проводится международный форум? ',
        options: [
            'Съезд лидеров традиционных религий',
            'Съезд лидеров мировых религий',
            'Съезд лидеров мировых и традиционных религий',
            'Съезд лидеров тюркских государств',
            'Съезд лидеров правящих партий стран ШОС',
        ],
        rightAnswer: 2
    },
    {
        question: 'Согласно анализу, проведенному специалистами Межгосударственного статистического комитета СНГ, Казахстан по итогам 2008 г. занял среди стран СНГ по темпам промышленного роста? ',
        options: [
            '4-е место',
            '3-е место',
            '2-е место',
            '1-е место',
            '5-е место',
        ],
        rightAnswer: 0
    },
    {
        question: 'В октябре 2010 г. в Казахстане прошла 6-я Конференция Министров по окружающей среде и развитию стран...  ',
        options: [
            'ОБСЕ',
            'ШОС',
            'ЕврАзЭС',
            'Азиатско-Тихоокеанского региона',
            'СНГ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Укажите организации, объединившиеся 1 марта 1999 г., в партию «Отан»: ',
        options: [
            'Азат, Асар',
            'Демократическая партия, Либеральное движение',
            'Бирлик, Народно-кооперативная партия',
            'Союз офицеров, Ауыл',
            'Народное единство Казахстана, Социалистическая партия',
        ],
        rightAnswer: 1
    },
    {
        question: '26 февраля 1999 г. главы государств СНГ подписали Договор: ',
        options: [
            'О Таможенном Союзе и Едином экономическом пространстве',
            'О Таможенном Союзе',
            'О едином экономическом пространстве',
            'О коллективной безопасности',
            'О беспошлинной торговле',
        ],
        rightAnswer: 0
    },
    {
        question: '6 октября 2000 г.  в Астане создана новая международная организация – Евразийское экономическое сообщество (ЕврАзЭС) - в рамках встречи глав правительств стран? ',
        options: [
            'СНГ',
            'Таможенного союза',
            'ОБСЕ',
            'ШОС',
            'ОДКБ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Казахстан председательствовал в 2010 г. в международной организации? ',
        options: [
            'ШОС',
            'ОДКБ',
            'ОБСЕ',
            'ЕврАзЭС',
            'Межпарламентской Ассамблее СНГ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Казахстан председательствовал в 2007 г. в международной организации? ',
        options: [
            'ОБСЕ',
            'ЕврАзЭС',
            'Межпарламентской Ассамблее СНГ',
            'ШОС',
            'ОДКБ',
        ],
        rightAnswer: 3
    },
    {
        question: '25 сентября 2007 г. стартовала первая казахстанская морская кругосветная экспедиция «Terra vita» на яхте? ',
        options: [
            '«Сары-Арка»',
            '«Абай»',
            '«Нурсултан»',
            '«Казахстан»',
            '«Чокан Валиханов»',
        ],
        rightAnswer: 4
    },
    {
        question: 'Во время визита в Москву 29 марта 1994 г. Н.A. Назарбаев обнародовал идею? ',
        options: [
            'Введения единой наднациональной валюты «алтын»',
            'Строительства транспортного коридора из Китая в Европу через Казахстан',
            'Создания национальной космической отрасли',
            'Строительства новой столицы РК',
            'Создания Евразийского союза государств',
        ],
        rightAnswer: 4
    },
    {
        question: 'С государственным визитом 22-25 сентября 2001 г. Казахстан посетил Папа Римский? ',
        options: [
            'Иоанн Павел I',
            'Павел VI',
            'Фрэнсис',
            'Иоанн Павел II',
            'Бенедикт XVI',
        ],
        rightAnswer: 3
    },
    {
        question: 'Н.A. Назарбаев носитель титула Елбасы - Лидер Нации, который имеет характер? ',
        options: [
            'традиционный',
            'почётный',
            'официальный',
            'наследственный',
            'родовой',
        ],
        rightAnswer: 2
    },
    {
        question: 'В апреле 2015 г. Н.A. Назарбаев переизбран на пост Президента в очередной раз. Какой по счёту? ',
        options: [
            '4',
            '5',
            '6',
            '7',
            '3',
        ],
        rightAnswer: 1
    },
    {
        question: 'Н.A. Назарбаев стоит во главе партии? ',
        options: [
            'Нур Отан',
            'Демократической',
            'Социал-демократической',
            'Патриотов',
            'Никакой',
        ],
        rightAnswer: 0
    },
    {
        question: 'Жизненному пути Н.A. Назарбаева посвящена киноэпопея? ',
        options: [
            '«Железная гора»',
            '«Путь лидера»',
            '«Небо моего детства»',
            '«Разрывая замкнутый круг»',
            '«Огненная река»',
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
        playAudioCorrect();
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
        playAudioWrong();
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

function playAudioCorrect(){
    var myAudio = new Audio;
    myAudio.src = "../../correct-answer.mp3";
    myAudio.play();
}

function playAudioWrong(){
    var myAudio1 = new Audio;
    myAudio1.src = "../../wrong-answer.mp3";
    myAudio1.play();
}