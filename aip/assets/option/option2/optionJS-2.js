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
const img = document.getElementById('image');

let score = 0; // Итоговый Результат

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'В каком случае верно записана на Паскале формула?' + "<br/>" + "<img src='ph16.png'>",
        options: [
            'Cos(Sqr(X))+Sin(Sqr(X))',
            'Sqr(Cos(X))+Sin(Sqr(X))',
            'Sqr(Cos(X))+Sqr(Sin(X))',
            'Cos(Sqr(X))+Sqr(Sin(X))',
            'Cos(X^2)+ (Sin(X))^2',
        ],
        rightAnswer: 1
    },
    {
        question: 'В результате выполнения операторов:' + '<br/>' + 'A:=79;' + '<br/>' + 'If (A div 5=15) and (a<=79) Then Write("*") Else Write("+");' + '<br/>' + 'Write("$");' + '<br/>' + 'на экран выведется ... ',
        options: [
            'В этих операторах допущена ошибка; они не будут работать!',
            '+ $  ',
            '* +',
            '* $',
            '* + $',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой из операторов верно описывает логическое выражение:' + '0 < X < 3 или X > 7 ?',
        options: [
            '(X>0) and (X<3) and (X>7)',
            '(X>0) or (X<3) and (X>7)',
            '(X>0) and (X<3) or (X>7)',
            '(X>0) or (X<3) or (X>7)',
            '(X>0) or not(X<3) or (X>7)',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой из операторов верно описывает условие:' + 'X < 0 или 2 < X < 4 или X > 6 ?',
        options: [
            '(X<0) and ((X>2) or (X<4)) and (X>6)',
            '(X<0) or (X>2) and (X<4) or (X>6)',
            '(X<0) and ((X>2) and (X<4)) and (X>6)',
            '(X<0) or ((X>2) or (X<4)) or (X>6)',
            'not(X<0) and ((X>2) and (X<4)) and (X>6)',
        ],
        rightAnswer: 1
    },
    {
        question: 'В каком из операторов нет ошибки? ',
        options: [
            "Case K of" + "<br/>" + "'+','-','*','/':Writeln('Опер-я');" + "<br/>" + "1..9:Writeln('Цифра');" + "<br/>" + "Else" + "<br/>" + "Writeln('Перем-ая');" + "<br/>" + "end;",
            "Case K of" + "<br/>" + "0..20:M:=K;C:=K div 10;" + "<br/>" + "30..40,50..61:C:=K mod 10;" + "<br/>" + "Else" + "<br/>" + " M:=K+SQR(K);" + "<br/>" + "end;",
            "Case K of" + "<br/>" + "5..15:K:=K+1;" + "<br/>" + "25..35:K:=K/17+1" + "<br/>" + "Else K:=K/3;" + "<br/>" + "end;",
            "Case K of" + "<br/>" + "5..15:K:=K+1;" + "<br/>" + "25..35:K:=K*17.3+1;" + "<br/>" + "Else K:=K*3.5;" + "<br/>" + "end;",
            "Case K of " + "<br/>" + " 'a'..'z':Writeln('*');" + "<br/>" + " Else Writeln('-');" + "<br/>" + "end;",
        ],
        rightAnswer: 4
    },
    {
        question: 'Оператор WHILE ... DO ... - это ...  ',
        options: [
            'оператор вывода ',
            'оператор цикла с заранее известным числом повторений ',
            'оператор цикла с заранее известным числом повторений ',
            'оператор цикла с постусловием ',
            'оператор цикла с предусловием',
        ],
        rightAnswer: 4
    },
    {
        question: 'Оператор REPEAT ... UNTIL ... - это оператор ...',
        options: [
            `вывода `,
            `цикла с предусловием`,
            `выбора `,
            `цикла с постусловием`,
            `цикла с заранее известным числом повторений`,
        ],
        rightAnswer: 3
    },
    {
        question: 'Оператор FOR ... TO ... DO ... - это оператор ... ' ,
        options: [
            `цикла с заранее известным числом повторений`,
            `вывода `,
            `цикла с предусловием`,
            `условного перехода`,
            `оператор цикла с постусловием `,
        ],
        rightAnswer: 0
    },
    {
        question: 'Определить значение переменной S после выполнения следующих операторов:' + '<br/>' + 'S:=0; I:=0;' + '<br/>' + 'while I<3 do begin I:=I+1; S:=S+I end;',
        options: [
            '3',
            '6',
            '10',
            '1',
            '0',
        ],
        rightAnswer: 1
    },
    {
        question: 'Определить значение переменной S после выполнения следующих операторов:' + '<br/>' + 'S:=0;' + '<br/>' + 'I:=1;' + 'while I>1 do begin S:=S+I; I:=I-1 end;',
        options: [
            'в результате выполнения операторов произойдет зацикливание',
            '2',
            '-1',
            '1',
            '0',
        ],
        rightAnswer: 4
    },
    {
        question: 'Определить значение переменной S после выполнения операторов:' + '<br/>' + 'S:=0; I:=3;' + '<br/>' + 'Repeat' + '<br/>' + 'S:=S+I;' + '<br/>' + 'I:=I-1' + '<br/>' + 'Until I<=1;' ,
        options: [
            '5',
            '1',
            '2',
            '0',
            'в результате выполнения операторов произойдет зацикливание',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой фрагмент программы из ниже перечисленных находит значение y=cos x + cos 2x + cos 3x + ... + cos 30x',
        options: [
            'y:=0;' + '<br/>' + 'for i:=1 to 30 do y:=y+i*cos(x);',
            'y:=0;' + '<br/>' + 'for i:=1 to 30 do y:=y+cos(i*x);',
            'y:=1;' + '<br/>' + 'for i:=1 to 30 do y:=y+cos(i*x);',
            'нет правильного ответа ',
            'y:=0; i:=0; for i:=1 to 30 do' + '<br/>' + 'begin' + '<br/>' + 'i:=i+1;' + '<br/>' + 'y:=y+cos(i*x)' + '<br/>' + 'end;',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой фрагмент программы из ниже перечисленных находит значение y=n! ',
        options: [
            'y:=1;' + '<br/>' + 'for i:=1 to n do y:=y*i;',
            'y:=0;' + '<br/>' + 'for i:=1 to n do y:=y*i;',
            'y:=1;' + '<br/>' + 'for i:=1 to n do y:=y-i;',
            'y:=1;' + '<br/>' + 'for i:=0 to n do y:=y*i;',
            'нет правильного ответа',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой фрагмент программы из ниже перечисленных вычисляет' + "<img src='ph29.png'>",
        options: [
            'нет правильного ответа ',
            'y:=1;' + '<br/>' + 'for i:=1 to n do y:=y*exp(ln(x));' ,
            'y:=1;' + '<br/>' + 'for i:=1 to n do y:=y*x;',
            'y:=1;' + '<br/>' + 'for i:=1 to n do y:=y+exp(i*ln(x));',
            'y:=1;' + '<br/>' + 'for i:=1 to n do y:=y*exp(i*ln(x));',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой фрагмент из ниже перечисленных выводит на экран монитора таблицу кубов чисел, изменяющихся от 1 до 10 с шагом 0,1:',
        options: [
            'x:=1; for i:=1 to 10 do begin y:=x*x*x; writeln(x:5:1,y:10:3); x:=x+0,1; end;',
            'x:=1; while x<10 do begin y:=x*x*x; writeln(x:5:1,y:10:3); x:=x+0,1; end;',
            'for x:=1 to 10 step 0,1 do begin y:=x*x*x; writeln(x:5:1,y:10:3); end;',
            'x:=1; repeat y:=x*x*x; writeln(x:5:1,y:10:3); x:=x+0.1; until x>10;',
            'for x:=1 to 10 do begin y:=x*x*x; writeln(x:5:1,y:10:3); end;',
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

const attention = document.getElementById('attention');

function coratten() {
    if (score >= 12) {
        attention.innerHTML = 'Ты настоящий джедай Pascal!';
    } else {
        attention.innerHTML = 'Тебе не стать программистом!';
    }
};

function ilonaKep(){
    var ilona = document.createElement ("IMG");
    x.setAttribute ("src", "ph1.png");
}