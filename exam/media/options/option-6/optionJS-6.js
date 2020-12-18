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
        question: '4 июня отмечается как: ',
        options: [
            'День памяти жертв репрессий',
            'День государственных символов',
            'День вступления в ООН',
            'День Победы над джунгарами',
            'День Астаны',
        ],
        rightAnswer: 1
    },
    {
        question: 'Основные положения Алматинской декларации от 21 декабря 1991 г.: ',
        options: [
            'об образовании Союза республик Европы и Азии',
            'о прекращении существования СССР и образовании Союза республик Европы и Азии',
            'об образовании СНГ',
            'о прекращении существования СССР',
            'о прекращении существования СССР и образовании СНГ',
        ],
        rightAnswer: 4
    },
    {
        question: '1991 году, 12 декабря издан Указ Президента РК: ',
        options: [
            'о выходе из состава СССР',
            'о переходе ядерного оружия на территории Казахстана под юрисдикцию республики',
            'о приостановке полётов с коcмодрома Байконур',
            'о закрытии Семипалатинского ядерного полигона',
            'о реабилитации граждан, привлеченных к ответственности за участие в событиях 17-18 декабря 1986 г.',
        ],
        rightAnswer: 4
    },
    {
        question: 'В «Стратегии становления и развития Казахстана как суверенного государства» от 16 мая 1992 г. определён курс на строительство в РК ... .? ',
        options: [
            'сильной президентской республики',
            'президентской республики',
            'президентско-парламентской республики',
            'парламентской республики',
            'выборной монархии',
        ],
        rightAnswer: 0
    },
    {
        question: 'В «Стратегии становления и развития Казахстана как суверенного государства» от 16 мая 1992 г. указывалось, что во внутренней политике всё заметную роль будут играть? ',
        options: [
            'политические партии и организации',
            'этнокультурные объединения',
            'Ассамблея народа Казахстан',
            'Религиозные организации',
            'Только государство',
        ],
        rightAnswer: 0
    },
    {
        question: 'В «Стратегии становления и развития Казахстана как суверенного государства» от 16 мая 1992 г. - «воротами к мировым коммуникациям» для интеграции РК в мировое сообщество указаны страны? ',
        options: [
            'Россия, Китай',
            'Россия, Китай, исламские государства',
            'Россия, Китай, США',
            'Россия, Китай, Евросоюз',
            'Только бывшие республики СССР',
        ],
        rightAnswer: 0
    },
    {
        question: 'В «Стратегии становления и развития Казахстана как суверенного государства» от 16 мая 1992 г. идёт речь о наличии «трех главных центров рыночной системы»? ',
        options: [
            'США, Япония и Западная Европа',
            'США, Япония и Исламские государства',
            'США, Япония и Россия',
            'США, Россия и Западная Европа',
            'США, Германия и Западная Европа',
        ],
        rightAnswer: 0
    },
    {
        question: 'После роспуска Советов осенью 1993 г. вся полнота власти перешла к... ',
        options: [
            'вновь избранным Советам',
            'Конституционному суду',
            'парламенту',
            'президенту',
            'правительству',
        ],
        rightAnswer: 3
    },
    {
        question: 'Республиканская партия в сентябре 1991 г. создана на основе движения? ',
        options: [
            'Забастовочный комитет шахтёров Караганды',
            'Союз Народное единство Казахстана',
            'Азат',
            'Бирлик',
            'Бирлесу',
        ],
        rightAnswer: 2
    },
    {
        question: 'Одна из первых политических партий Казахстана, состоявшая преимущественно из лиц казахской национальности: ',
        options: [
            'Народный конгресс Казахстана',
            'Союз народное единство Казахстана',
            'Республиканская',
            'Народно-кооперативная',
            'Табигат',
        ],
        rightAnswer: 2
    },
    {
        question: 'В Верховном Совете, избранном 7 марта 1994 г., депутаты от какого движения взяли на себя задачу по защите прав русскоговорящего населения? ',
        options: [
            'Лад',
            'Русская община',
            'Союз казаков Степного края',
            'Союз казаков Семиречья',
            'Коммунисты',
        ],
        rightAnswer: 0
    },
    {
        question: 'Конституция 1995 г. констатировала завершение процесса формирования? ',
        options: [
            'Президентско-парламентской республики',
            'Президентской республики',
            'Парламентской республики',
            'Представительной демократии',
            'Народной демократии',
        ],
        rightAnswer: 1
    },
    {
        question: 'Первый министр обороны РК? ',
        options: [
            'Нурмагамбетов С.К.',
            'Касымов А.Х.',
            'Алтынбаев М.К.',
            'Токпакбаев С.Б.',
            'Ахметов Д.К',
        ],
        rightAnswer: 0
    },
    {
        question: 'На начало 1994 г. число общественно-политических организаций, действовавших в РК? ',
        options: [
            'Около 200',
            '300',
            'Более 200 ',
            'Более 300',
            '181',
        ],
        rightAnswer: 3
    },
    {
        question: 'Общественная организация, выступившая с инициативой проведения референдума 29 апреля 1995 г. о продлении полномочий Президента РК: ',
        options: [
            'Лад ',
            'Ассамблея народа Казахстана',
            'Союз казаков Степного края',
            'Союз казаков Семиречья',
            'Лига женщин-мусульманок',
        ],
        rightAnswer: 1
    },
    {
        question: 'В основу Конституции 1995 г. положены приоритеты: ',
        options: [
            'Прав человека и гражданина',
            'Права частной собственности',
            'Прав приверженцев ислама',
            'Прав института президентства',
            'Прав коренной национальности',
        ],
        rightAnswer: 0
    },
    {
        question: 'Международная организация, созданная по инициативе РК в 2002 г.: ',
        options: [
            'Совещание по взаимодействию и мерам доверия в Азии (СВМДA)',
            'Парламентская ассамблея тюркоязычных стран (ТюркПA)',
            'Тюркский Совет',
            'Исламская военная коалиция',
            'Лига городов',
        ],
        rightAnswer: 0
    },
    {
        question: 'На момент распада СССР Казахстан располагал ядерным арсеналом, занимая в мировом рейтинге место? ',
        options: [
            '6',
            '3',
            '5',
            '4',
            '2',
        ],
        rightAnswer: 3
    },
    {
        question: 'Государство, открывшее первым посольство в РК: ',
        options: [
            'США',
            'Россия',
            'Китай',
            'Турция',
            'ФРГ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Шанхайская Организация Сотрудничества «выросла» из инициативы РК по подписанию Соглашения между Китаем и сопредельными постсоветскими республиками? ',
        options: [
            'о беспошлинном развитии торгово-экономических отношений',
            'об использовании трансграничных водоёмов',
            'о таможенных льготах и преференциях',
            'о развитии транспортного потенциала',
            'об укреплении мер доверия в военной области в районе государственных границ',
        ],
        rightAnswer: 4
    },
    {
        question: 'РК 28 июня 2016 г. избрана в состав органа ООН? ',
        options: [
            'Международный Суд',
            'Совет Безопасности',
            'Секретариат',
            'Экономический и социальный совет',
            'Совет по опеке',
        ],
        rightAnswer: 1
    },
    {
        question: '27 мая 1994 г.  РК стал государством-участником программы НАТО? ',
        options: [
            'Партнёрство во имя мира',
            'Система разведки наземной обстановки',
            'По обеспечению стратегических воздушных перебросок',
            'Разумная оборона',
            'Активная эшелонированная система противоракетной обороны',
        ],
        rightAnswer: 0
    },
    {
        question: '1998 год объявлен годом? ',
        options: [
            'Абая',
            'Единства и национальной истории',
            'Жамбыла Жабаева',
            'Поддержки села',
            'Поддержки культуры',
        ],
        rightAnswer: 1
    },
    {
        question: 'За основу пенсионной реформы 1998 г. взята пенсионная система? ',
        options: [
            'США',
            'Чили',
            'Аргентина',
            'Сингапур',
            'Польша',
        ],
        rightAnswer: 1
    },
    {
        question: 'Государство, открывшее первым посольство в РК: ',
        options: [
            'НАТО',
            'ООН',
            'ШОС',
            'ОДКБ',
            'ЮНЕСКО',
        ],
        rightAnswer: 1
    },
    {
        question: 'Государственная телерадиовещательная корпорация, созданная 18 сентября 1992г.? ',
        options: [
            'Хабар',
            'ТАН',
            'НТК',
            'Казакстан',
            '7 канал',
        ],
        rightAnswer: 3
    },
    {
        question: 'Введение национальной валюты «тенге» 15 ноября 1993 г. отмечается как? ',
        options: [
            'День финансиста',
            'День банковского работника',
            'День экономиста',
            'День благосостояния',
            'День тенге',
        ],
        rightAnswer: 0
    },
    {
        question: '6 июля1998года подписана Декларация между Республикой Казахстан и Российской Федерацией? ',
        options: [
            'О дружбе и союзничестве',
            'О вечной дружбе и союзничестве',
            'О союзничестве, ориентированном в 21 столетие',
            'О вечной дружбе, ориентированной в 21 столетие',
            'О вечной дружбе и союзничестве, ориентированном в 21 столетие',
        ],
        rightAnswer: 4
    },
    {
        question: '25 февраля - 4 марта1999 г. проведено мероприятие? ',
        options: [
            'Первый этап акционирования вузов',
            'Первая волна приватизации',
            'Первая национальная перепись',
            'Первая сельхозперепись',
            'Первый этап распределения инвестиционных приватизационных купонов',
        ],
        rightAnswer: 2
    },
    {
        question: 'На бывшем Семипалатинском ядерном полигоне 29 июля 2000 г.: ',
        options: [
            'Расформирована последняя воинская часть, занимавшаяся обслуживанием работ по проведению испытаний',
            'Утилизировано всё оборудование для проведения испытаний',
            'Уничтожен последний ядерный заряд для испытаний',
            'Уничтожена последняя штольня для ядерных испытаний',
            'Закрыта последняя лаборатория по исследованию ядерных испытаний',
        ],
        rightAnswer: 3
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
    myAudio.volume= 0.07;
}

function playAudioWrong(){
    var myAudio1 = new Audio;
    myAudio1.src = "../../wrong-answer.mp3";
    myAudio1.play();
    myAudio1.volume= 0.07;
}