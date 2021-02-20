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
        question: 'Столицей госудраства уйсунов являлся город: ',
        options: [
            'Баласагун',
            'Отрар',
            'Чигучен',
            'Бабиш-Молда',
            'Чирик-Рабат',
        ],
        rightAnswer: 2
    },
    {
        question: 'Путешественник, оставивший сведения о кыпчаках: ',
        options: [
            'П.Карпини',
            'Марвази',
            'Абильгази',
            'Марко Поло',
            'Джурджани',
        ],
        rightAnswer: 0
    },
    {
        question: 'Могильники Бесоба и Сынтас относятся к археологияческим памятникам: ',
        options: [
            'саков тиграхаудов',
            'Сарматов-савроматов',
            'Кангюев',
            'Уйсунов',
            'Гуннов',
        ],
        rightAnswer: 1
    },
    {
        question: 'І съезд представителей Мировых и традиционных религии мира в Астане состоялся в: ',
        options: [
            '2001 г.',
            '2005 г.',
            '2003 г.',
            '2007 г.',
            '2004 г.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Памятник эпохи энеолита на севере страны: ',
        options: [
            'Каратау',
            'Ботай',
            'Батпак',
            'Шебир',
            'Арыстанды',
        ],
        rightAnswer: 1
    },
    {
        question: 'В годы великой Отечественной войны в Алма-Ате работали эвакуированные писатели: ',
        options: [
            'Н. Крючков, Б. Андреев, Л. Мендельштам',
            'С. Прокофьев, С. Юткевич, Н. Черкасов ',
            'И. Бардин, В. Обучев, В. Образцов',
            'В. Вернадский, Н. Зелинский, А. Орлов',
            'А. Толстой, С. Маршка, С. Михалков',
        ],
        rightAnswer: 4
    },
    {
        question: 'Общественный деятель, основатель газеты «Казах»: ',
        options: [
            'Мухамеджан Тынышпаев',
            'Мустафа Шоқай',
            'Мыржакып Дулатов',
            'Ахмет Байтурсынов',
            'Алихан Бокейханов ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Во время правления хана Тауекеля произошло событие: ',
        options: [
            'Борьба с Джунгарами',
            'Присоединение Ногайской Орды',
            'Разгром войск Баба-султана',
            'Сражение в местности Айгыржар',
            'Сражение с шахом Ирана',
        ],
        rightAnswer: 2
    },
    {
        question: 'В период восстания 1916 г. колониальная местная администрация: ',
        options: [
            'Придерживалась тактики разумного компромисса',
            'Примкнула к национально-освободительному движению',
            'Придерживалась политики нейтралитета',
            'Мигрировала в Китай, Ирн, Монголию',
            'Поддержала царский указ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Один из создателей организации «Жас тулпар»: ',
        options: [
            'Мухтар Шаханов',
            'Динмухамед Кунаев',
            'Олжас Сулеменов',
            'Мурат Ауэзов',
            'Магжан Жумабаев',
        ],
        rightAnswer: 3
    },
    {
        question: 'о принятия ханского титула в 1628 (1629) г. за героическую борьбу с джунгарами вошел в историю как народный батыр: ',
        options: [
            'Жангир',
            'Тауке',
            'шигай',
            'Аблай',
            'Есим',
        ],
        rightAnswer: 0
    },
    {
        question: '10 декабря 1991 г. в Казахстане произошло событие: ',
        options: [
            'Казахстан стал полноправным членом ООН',
            'Принята первая Конституция Республики Казахстан',
            'Первые всенародные выборы президента',
            'Провозглашение независимости Казахстана',
            'Казахская ССР переименована в Республику Казахстан',
        ],
        rightAnswer: 4
    },
    {
        question: 'Самый продолжительный период в истории эпохи камня: ',
        options: [
            'Мезолит',
            'Энеолит',
            'Мустье',
            'Палеолит',
            'Неолит',
        ],
        rightAnswer: 3
    },
    {
        question: 'В 1889 г. большие стелы с руническими письменами обнаружил: ',
        options: [
            'К. Сатпаев',
            'А. Маргулан',
            'Л. Морган',
            'М. Герасимов',
            'Н. Ядринцев',
        ],
        rightAnswer: 4
    },
    {
        question: 'Главное отличие кочевничества от оседлости, повлиявшее на появление сезонных перекочевок: ',
        options: [
            'Наличие переносного жилища',
            'Междоусобицы за пастбища',
            'Хорошие знания природных условий',
            'Скот круглогодично содержался в естественных условиях',
            'Приспособленность к природным условиям',
        ],
        rightAnswer: 3
    },
    {
        question: 'Партия «Алаш» провозгласил идею: ',
        options: [
            'Создания конституционной монархии',
            'Восстановления Казахского ханства',
            'Создания федеративной республики',
            'Создания парламентской республики',
            'Создания национальной автономии ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Стоянка эпохи энеолита Центрального Казахстана: ',
        options: [
            'Арыстанды',
            'Ботай',
            'Шебир',
            'Караганда',
            'Шакпаката',
        ],
        rightAnswer: 3
    },
    {
        question: 'Вдохновенное искусство стало известно во всей республике. Участвовал в этнографических концертах на Всемирной выставке в Париже. В апреле 1927 г. дал концертное выступление в Москве, а в июле того же года - во Франкфурте-на-Майне.: Определите по тексту великого казахского певца ',
        options: [
            'Гарифолла Курмангалиев',
            'Балуан Шолак',
            'Амре Кашаубаев',
            'Кенен Азербаев',
            'Майра Шамсутдинова',
        ],
        rightAnswer: 2
    },
    {
        question: 'Касым был сыном: ',
        options: [
            'Керея',
            'Барака',
            'Абулхаира',
            'Есен-Буги',
            'Жаныбек',
        ],
        rightAnswer: 4
    },
    {
        question: 'В конце І в. до н.э. северные гунны получили возможность кочевать к востоку от р.Талас так как: ',
        options: [
            'Победили армию кангюев',
            'Заключили соглашение с кангюями',
            'Подчинили себе уйсуней ',
            'Объеденились с южными гуннами',
            'Попали под власть династии Хань',
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