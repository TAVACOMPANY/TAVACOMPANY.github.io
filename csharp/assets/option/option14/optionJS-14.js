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
      br = '</br>';

const questions = [
    {
        question: 'Значение кнопки, которая будет срабатывать при нажатии клавиши Enter',
        options: [
            'Cursor',
            'ControlBox',
            'AcceptButton',
            'DrawGrid',
            'CancelButton',
        ],
        rightAnswer: 2
    },
    {
        question: 'Перекрашивание формы  при нажатии кнопки',
        options: [
            'private void button1(object sender, EventArgs e) ' + br + '{  this.BackColor = Color.Aquamarine;  }',
            'private void button1_Click(object sender, EventArgs e) ' + br + '{  this.BackColor = Aquamarine;  }',
            'private void button1_Click(object sender, EventArgs e) ' + br + '{  this.Color = Color.Aquamarine;  }',
            'private void button1_Click(object sender, EventArgs e) ' + br  + '{  this.BackColor = Color.Aquamarine;  }',
            'private void Click(object sender, EventArgs e' + br + '{  this.BackColor = Color.Aquamarine;  }',
        ],
        rightAnswer: 3
    },
    {
        question: 'Код вызова модального диалогового окна (обработчик нажатия кнопки)',
        options: [
            'private void button1_Click(object sender, EventArgs e)' + br + '{ DialWind dlgbx = new DialWind();' + br + 'DialogResult result = digbx.ShowDialog();' + br + 'Close();  }',
            'private void Click(object sender, EventArgs e)' + br + '{ DialWind dlgbx = new DialWind();' + br + 'DialogResult result = digbx.ShowDialog();' + br + 'Close();  }',
            'private void button1_Click(object sender, EventArgs e)' + br + '{ DialWind dlgbx = new DialWind();' + br + 'Dialog result = digbx.ShowDialog();' + br + 'Close();  }',
            'private void button1_Click(object sender, EventArgs e)' + br + '{ DialWind dlgbx = new Dial();' + br + 'DialogResult result = digbx.ShowDialog();' + br + 'Close();  }',
            'private void button1_Click(object sender, EventArgs e)' + br + '{ DialWind dlgbx = new DialWind();' + br + 'DialogResult  = digbx.ShowDialog();' + br + 'Close();  }',
        ],
        rightAnswer: 0
    },
    {
        question: 'Код вызова диалогового окна выбора цвета (обработчик нажатия кнопки)',
        options: [
            'private void button1_Click(object sender, EventArgs e) ' + br + '{  colorDialog1.ShowDialog();' + br + 'BackColor = colorDialog1.Color;  }',
            'private void button1_Click(object sender, EventArgs e) ' + br + '{  colorDialog1.ShowDialog ();' + br + 'this.BackColor = colorDialog1.Color;  }',
            'private void button1_Click(object sender, EventArgs e) ' + br + '{  colorDialog1.ShowDialog();' + br + 'this.BackColor = Dialog1.Color;  }',
            'private void button1_Click(object sender, EventArgs e) ' + br + '{  colorDialog1.ShowDialog();' + br + 'this.BackColor = colorDialog1;  }',
            'private void button1_Click(object sender, EventArgs e) ' + br + '{  colorDialog1 ();' + br + 'this.BackColor = colorDialog1.Color;  }',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое пространство имен надо объявить для изменения формы и размера формы?',
        options: [
            'Using System.Drawing.Form',
            'Using System.Drawing.Size;',
            'Using System.Drawing;',
            'Using System.Drawing2D;',
            'Using System.Drawing.Drawing2D;',
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