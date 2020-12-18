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
        question: 'В годы ожесточенной, истребительной гражданской войны погибло: ',
        options: [
            '6 млн.чел.',
            '8 млн.чел.',
            '10 млн.чел.',
            '12 млн.чел.',
            '15 млн.чел.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Система заготовок сельскохозяйственных продуктов в период «военного коммунизма» …. ',
        options: [
            'продразверстка',
            'сельзаготовка',
            'продвоенкомы',
            'общий сбор',
            'продсбор',
        ],
        rightAnswer: 0
    },
    {
        question: 'Один из принципов «военного коммунизма»… ',
        options: [
            'максимальная национализация промышленности',
            'свободная торговля',
            'частная собственность',
            'продналог',
            'аренда земли',
        ],
        rightAnswer: 0
    },
    {
        question: 'Комиссаром народного просвещения в Букеевской Орде в 1918 г. был… ',
        options: [
            'С.Сейфуллин',
            'Т.Рыскулов',
            'С.Мендешов',
            'У.Джандосов',
            'Т.Жургенев',
        ],
        rightAnswer: 2
    },
    {
        question: 'Когда был издан декрет об образовании Казахской АССР? ',
        options: [
            '1922, 20 июня',
            '1921, 19 декабря',
            '1920, 30 декабря',
            '1930, 19 декабря',
            '1920, 26 августа',
        ],
        rightAnswer: 4
    },
    {
        question: 'В какие годы Оренбург был первой столицей КазАССР и сыграл важную роль в ее развитии? ',
        options: [
            '1920-1924 г.',
            '1929-1935 г.',
            '1919-1941 г.',
            '1925-1929 г.',
            '1936-1997 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Вторая столица Каз-АССР… ',
        options: [
            'Верный',
            'Омск',
            'Кызыл-Орда',
            'Семипалатинск',
            'Оренбург',
        ],
        rightAnswer: 2
    },
    {
        question: 'В каком году столицей Казахстана стала Алматы? ',
        options: [
            '1925 г.',
            '1930 г.',
            '1929 г.',
            '1920 г.',
            '1932 г.',
        ],
        rightAnswer: 2
    },
    {
        question: 'В 1928г. по новому административно-территориальному управлению в Казахстане создана какая административная система? ',
        options: [
            'трехступенчатая',
            'двухступенчатая',
            'шестиступенчатая',
            'четырехступенчатая',
            'пятиступенчатая',
        ],
        rightAnswer: 3
    },
    {
        question: 'Курс на силовые реформы в казахском ауле под руководством Ф. Голощекина получил название: ',
        options: [
            'Октябрский Казахстан',
            'Малый Октябрь',
            'Большой Туркестан',
            'Большой Казахстан',
            'Малый Казахстан',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто автор идеи «Малого Октября»? ',
        options: [
            'Ф.Голощекин',
            'И. Сталин',
            'Керенский',
            'В. Ленин',
            'Столыпин',
        ],
        rightAnswer: 0
    },
    {
        question: 'Обвинение, выдвинутое против тех, кто выступил против «советизации аулов» Ф.И.Голощекиным… ',
        options: [
            'националист',
            'фашист',
            'космополит',
            'шовинист',
            'нацист',
        ],
        rightAnswer: 0
    },
    {
        question: 'В апреле 1924 года в Казахстане было организовано общество: ',
        options: [
            'Долой неграмотность',
            'Долой беспризорность',
            'За мир и согласие',
            'Кошчи',
            'Общество борьбы с нищетой',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой завод в Казахстане, дававший 40% общесоюзной добычи свинца, был сдан в эксплуатацию досрочно к 1923 году? ',
        options: [
            'Карсакпайский',
            'на Эмбе',
            'Карагандинский',
            'Риддерский',
            'Спасский',
        ],
        rightAnswer: 3
    },
    {
        question: 'В животноводстве в период НЭПа произошли изменения… ',
        options: [
            'увеличено все поголовье скота',
            'повышение цен на мясо',
            'появилось овцеводство',
            'увеличено коневодство',
            'экспорт животноводческого сырья',
        ],
        rightAnswer: 0
    },
    {
        question: 'Дивизия генерал-майора И.В.Панфилова была сформирована в городе: ',
        options: [
            'Семипалатинск',
            'Акмола',
            'Алма-ата',
            'Актюбинск',
            'Уральск',
        ],
        rightAnswer: 2
    },
    {
        question: 'Нефтеперерабатывающий завод в годы войны был построен в: ',
        options: [
            'Гурьев',
            'Шымкент',
            'Алматы',
            'Кокшетау',
            'Джамбыл',
        ],
        rightAnswer: 0
    },
    {
        question: 'Этот город во время Сталинградской битвы соединял Кавказский фронт и Среднюю Азию… ',
        options: [
            'Гурьев',
            'Акмола',
            'Шымкент',
            'Петропавловск',
            'Уральск',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кому из казахстанцев в годы Великой Отечественной войны самому первому было присвоено звание Героя Советского Союза? ',
        options: [
            'К.A.Семенченко',
            'С. Баймагамбетову',
            'С. Джилкишеву',
            'Каирбаеву',
            'Т. Тохтарову',
        ],
        rightAnswer: 0
    },
    {
        question: 'Количество казахстанцев - партизан в годы Великой Отечественной войны… ',
        options: [
            '4,7 тыс. человек',
            '2 тыс. человек',
            '3,5 тыс. человек',
            '2,5 тыс. человек',
            '1,5 тыс. человек',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто из казахских джигитов геройски погиб при защите Москвы? ',
        options: [
            'С. Джилкишев',
            'Т.Токтаров',
            'С. Баймагамбетов',
            'Н. Абдиров',
            'Д. Шыныбеков',
        ],
        rightAnswer: 1
    },
    {
        question: 'В боях за какой город проявил геройство К.Спатаев? ',
        options: [
            'Москва',
            'Ленинград',
            'Курск',
            'Сталинград',
            'Брест',
        ],
        rightAnswer: 3
    },
    {
        question: 'В качестве кого участвовал в Великой Отечественной войне дважды герой Советского Союза Талгат Бигельдинов? ',
        options: [
            'снайпер',
            'летчик',
            'пулеметчик',
            'матрос',
            'партизан',
        ],
        rightAnswer: 1
    },
    {
        question: 'Где командовал партизанским отрядом известный партизан К.Кайсенов? ',
        options: [
            'на Украине',
            'в Германии',
            'в России',
            'в Польше',
            'в Белоруссии',
        ],
        rightAnswer: 0
    },
    {
        question: 'В каком городе Казахстана в основном были размещены заводы и фабрики, эвакуированные в годы войны из западных областей страны? ',
        options: [
            'Шымкенте',
            'Семипалатинске',
            'Алма-Ате',
            'Джамбуле',
            'Кустанае',
        ],
        rightAnswer: 0
    },
    {
        question: 'Город, жителям которого посвятил свое стихотворение Жамбыл в 1941 г.… ',
        options: [
            'Владивосток',
            'Москва',
            'Ленинград',
            'Курск',
            'Сталинград',
        ],
        rightAnswer: 2
    },
    {
        question: 'В рядах Красной Армии сражалось в годы Второй Мировой войны казахстанцев… ',
        options: [
            '2млн.',
            '1 млн. 200 тыс.',
            '1 млн.750 тыс.',
            '3 млн.300 тыс.',
            '4 млн.200 тыс.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Герой Советского Союза Нуркен Абдиров был… ',
        options: [
            'снайпером',
            'летчиком',
            'матросом',
            'разведчиком',
            'партизаном',
        ],
        rightAnswer: 1
    },
    {
        question: 'Военная специальность Алии Молдагуловой… ',
        options: [
            'разведчик',
            'матрос',
            'снайпер',
            'партизан',
            'летчик',
        ],
        rightAnswer: 2
    },
    {
        question: 'Достойный сын своего народа, командовавший батальоном, полком, дивизией в годы Великой Отечественной войны… ',
        options: [
            'К. Кайсенов',
            'Р. Амангельдинов',
            'С. Баймагамбетов',
            'К. Аманжолов',
            'Б.Момышулы',
        ],
        rightAnswer: 4
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