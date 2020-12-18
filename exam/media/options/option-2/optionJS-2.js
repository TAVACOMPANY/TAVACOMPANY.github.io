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
        question: 'Двоевластие в Казахстане это: ',
        options: [
            'Временное правительство и несколько партий во главе с государством',
            'несколько партий с противоположенными взглядами',
            'наличие Временного правительство и Советов',
            'российские органы управления и органы местного самоуправления',
            'наличие двух премьер-министров',
        ],
        rightAnswer: 2
    },
    {
        question: 'Событие, сыгравшее большую роль в борьбе за советскую власть в Семиречье: ',
        options: [
            'оборона села Мариинского',
            'восстание крестьян',
            'оборона Боровского района',
            'Черкасская оборона',
            'мятеж в Верном',
        ],
        rightAnswer: 3
    },
    {
        question: 'Основными направлениями откочевки казахов в годы коллективизации стали: ',
        options: [
            'Турция, Монголия',
            'Россия, Пакистан',
            'Индия, Турция',
            'Китай, Иран, Афганистан',
            'Китай, Россия',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кому было адресовано “Письмо пяти”, которое написала группа деятелей Республики в июле 1932 г.? ',
        options: [
            'И.Курамысову',
            'И.Сталину',
            'С.Орджоникидзе',
            'Ф.Голощекину',
            'С.Меньдешеву',
        ],
        rightAnswer: 3
    },
    {
        question: 'Каковы потери в численности населения Казахстана в результате демографической катастрофы 1929-1933 гг.: ',
        options: [
            '2 млн. 123 тыс. человек',
            '2 млн. 343 тыс. человек',
            '1 млн. 234 тыс. человек',
            '1 млн. 123 тыс. человек',
            '1 млн. 798 тыс. человек',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой сталинский лагерь в Казахстане был самым большим? ',
        options: [
            'Карлаг',
            'Степлаг',
            'Кустанайская тюрьма',
            'Усть-Каменогорская тюрьма',
            'Алжир',
        ],
        rightAnswer: 0
    },
    {
        question: 'Почему ученого-этнографа, A.Затаевича в 20-30-е годы ХХ века называли “искателем жемчуга”? ',
        options: [
            'изучал природные ресурсы',
            'изучал фауну края',
            'изучал обычаи и традиции',
            'собирал песни и кюи казахского народа',
            'изучал флору края',
        ],
        rightAnswer: 3
    },
    {
        question: 'Главное направление научно-технического прогресса страны в 60-е гг. ХХ в. ',
        options: [
            'компьютеризация',
            'роботизация',
            'электрификация',
            'механизация',
            'автоматизация',
        ],
        rightAnswer: 2
    },
    {
        question: 'Первая в мире атомная водоопреснительная станция в Казахстане была построена на берегу.... ',
        options: [
            'Аральского моря',
            'оз.Балхаш',
            'оз.Алаколь',
            'Каспийского моря',
            'оз.Зайсан',
        ],
        rightAnswer: 3
    },
    {
        question: 'Согласно Конституции Республики Казахстан единственным источником государственной власти в республике является.... ',
        options: [
            'деятели культуры',
            'правительство',
            'министерство',
            'народ',
            'государственные служащие',
        ],
        rightAnswer: 3
    },
    {
        question: ' Какое место в мире занимает Казахстан по территории? ',
        options: [
            '6-е',
            '5-е',
            '8–е',
            '10-е',
            '9-е',
        ],
        rightAnswer: 4
    },
    {
        question: 'Лиссабонский протокол, подписанный в 1993 году президентом Н.A. Назарбаевым, объявил, что Казахстан.... ',
        options: [
            'суверенное государство',
            'демократическое государство',
            'правовое государство',
            'свободная экономическая зона',
            'территория, свободная от ядерного оружия',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая отрасль промышленности более успешно развивалась в Казахстане в начале 20 века? ',
        options: [
            'лёгкая промышленность',
            'цветная металлургия',
            'рудопроизводство',
            'химическая промышленность',
            'машиностроение',
        ],
        rightAnswer: 2
    },
    {
        question: 'Журнал "Айкап" выражал интересы направления…. ',
        options: [
            'аграрно-демократического',
            'социал-демократического',
            'либерально-монархического',
            'либерально-демократического',
            'буржуазно-демократического',
        ],
        rightAnswer: 0
    },
    {
        question: 'Главным редактором журнала "Айкап" был: ',
        options: [
            'A. Байтурсынов',
            'С. Донентаев',
            'М. Сералин',
            'М. Дулатов',
            'A. Букейханов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Каково историческое значение восстания 1916 года? ',
        options: [
            'восстание переросло в буржуазно-демократическую революцию',
            'восстановлена система государственного управления',
            'рост национального самосознания',
            'восстание переросло в социалистическую революцию',
            'восстание переросло в национально-освободительную революцию',
        ],
        rightAnswer: 2
    },
    {
        question: 'Набору на тыловые работы по царскому Указу 1916 г. подлежало все трудоспособное население в возрасте: ',
        options: [
            '19-40',
            '19-43',
            '18-45',
            '19-45',
            '23-49',
        ],
        rightAnswer: 1
    },
    {
        question: 'В период национально-освободительного восстания 1916 года казахи боролись: ',
        options: [
            'против национализма',
            'против ханов и султанов',
            'против империализма и колониализма',
            'против 1 мировой войны',
            'против политики царизма',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто был руководителем восстания 1916 г. в Тургайском уезде? ',
        options: [
            'Сейфуллин ',
            'Ашекеев',
            'Жанбосынов',
            'A.Иманов',
            'Бокин',
        ],
        rightAnswer: 3
    },
    {
        question: 'В какой области Токаш Бокин был руководителем восстания 1916 г.? ',
        options: [
            'Сырдарья',
            'Семипалатинск',
            'Семиречье',
            'Уральск',
            'Тургай',
        ],
        rightAnswer: 2
    },
    {
        question: 'Позиция казахской национальной либерально-демократической интеллигенции в отношении царского Указа 1916 г.? ',
        options: [
            'придерживались политики разумного компромисса ',
            'руководили народным восстанием',
            'выступили с поддержкой Указа',
            'выступили с резкой критикой',
            'никакой позиции не придерживались',
        ],
        rightAnswer: 0
    },
    {
        question: 'Первая столица Казахской республики… ',
        options: [
            'Оренбург ',
            'Ташкент',
            'Омск',
            'Уральск',
            'Кызыл-Орда',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто был руководителем правительства «Алаш»? ',
        options: [
            'М.Тынышпаев ',
            'С.Торайгыров',
            'A.Букейханов',
            'Х.Досмухамедов',
            'М.Жумабаев',
        ],
        rightAnswer: 2
    },
    {
        question: 'В 1905 г. солдаты города Жаркента выразили протест против… ',
        options: [
            'демонстрации рабочих ',
            'экономических реформ',
            'антинародных действий царских властей',
            'реформ в области военного дела',
            'политического протеста шаруа',
        ],
        rightAnswer: 2
    },
    {
        question: 'Событие, повлиявшее на резкое изменение национального состава Казахстана в начале XX векa.… ',
        options: [
            'выселение коренного населения в Китай ',
            'миграция сельского населения',
            'переселение уйгуров и дунган',
            'депортация народов',
            'аграрная реформа Столыпина',
        ],
        rightAnswer: 4
    },
    {
        question: 'Самое крупное интернациональное выступление казахских и русских рабочих в годы первой русской революции…. ',
        options: [
            'демонстрация в Троицке',
            'забастовка в Успенском (Нельдинском) руднике',
            'забастовка рабочих в Перовске',
            'выступление в Каркаралинске',
            'бунт шаруа в Семипалатинском уезде',
        ],
        rightAnswer: 1
    },
    {
        question: 'В ходе колонизации края к 1916 г. царизм создал переселенческий фонд, лишив казахов: ',
        options: [
            '2 млн.га',
            '45 млн.га',
            '20 млн.га',
            '15 млн.га',
            '10 млн.га',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто основал еженедельную газету «Казах»? ',
        options: [
            'С.Торайгыров ',
            'М.Дулатов',
            'Ш.Кудайбердиев',
            'Х.Досмухамедов',
            'A.Байтурсынов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Партизанские отряды Алтая и Тарбагатая… ',
        options: [
            'Красные горные орлы ',
            'Защитники Отечества',
            'Алтая Воины Тарбагатая',
            'Партизаны Алтая',
            'Мужество',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто по поручению В.И.Ленина возглавлял интернациональную экспедицию, доставившую оружие Актюбинскому фронту в годы Гражданской войны? ',
        options: [
            'Ж.Мамбетов ',
            'С.Сейфуллин',
            'A.Джангильдин',
            'С.Датов',
            'Т.Бокин',
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