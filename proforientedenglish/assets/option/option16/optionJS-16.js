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
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'After I _____ to the news, I _____ to bed.',
        options: [
            'listened / had gone',
            'listen / go',
            'had listened / went',
            'listened / gone',
            'have listened / had gone',
        ],
        rightAnswer: 2
    },
    {
        question: 'I`m not sure ... the green coat is.',
        options: [
            'Who',
            'who`s',
            'whom',
            'whose',
            'which',
        ],
        rightAnswer: 3
    },
    {
        question: 'If you keep trying, you might ... to do it.',
        options: [
            'Manage',
            'Succeed',
            'Understand',
            'Catch',
            'Discover',
        ],
        rightAnswer: 0
    },
    {
        question: 'The airline ---- to me for losing my luggage, but I wasn’t in the right frame of mind to forgive them.',
        options: [
            'Complained',
            'Apologized',
            'Denied',
            'Excused',
            'Thanked',
        ],
        rightAnswer: 1
    },
    {
        question: 'Before we start the lesson, I`d like to ... what we did yesterday.',
        options: [
            'run across',
            'run into',
            'run along',
            'run up',
            'run through',
        ],
        rightAnswer: 4
    },
    {
        question: 'I was under the impression that you, too, .............. along with us. I am sorry that you aren`t.',
        options: [
            'came to suppose',
            'were supposed to have come',
            'supposed to have come',
            'were supposed to come',
            'supposed to come',
        ],
        rightAnswer: 3
    },
    {
        question: 'I ____ to sleep until I _____ my homework.',
        options: [
            'didn’t go / do',
            'didn’t go / did',
            'didn’t go / had done',
            'had not gone / had done',
            'don’t go / did',
        ],
        rightAnswer: 2
    },
    {
        question: 'When I _____ the letter, I _____ it away.',
        options: [
            'had read / threw',
            'read / had thrown',
            'read / threw',
            'reading / threw',
            'had read / had thrown',
        ],
        rightAnswer: 0
    },
    {
        question: 'He house is in good ... though it needs to be repainted.',
        options: [
            'Mood',
            'Position',
            'State',
            'Standing',
            'Condition',
        ],
        rightAnswer: 4
    },
    {
        question: 'Would you believe it! ............... was no other than our poor old postman who had fallen into that pond still holding onto his mail bags.',
        options: [
            'Who',
            'It',
            'Someone',
            'Somebody',
            'Man',
        ],
        rightAnswer: 1
    },
    {
        question: 'Our company is a small organization with only a few ....',
        options: [
            'Employerers',
            'Employs',
            'Employees',
            'Employments',
            'Employers',
        ],
        rightAnswer: 2
    },
    {
        question: '“You can move in immediately.” She told me I _____ immediately.',
        options: [
            'will move in',
            'would move in',
            'moving in',
            'could move in',
            'can move in',
        ],
        rightAnswer: 3
    },
    {
        question: 'They have the poor girl ............... the whole house twice a day.',
        options: [
            'clean',
            'will clean',
            'cleans',
            'to clean',
            'Cleaned',
        ],
        rightAnswer: 0
    },
    {
        question: 'What a smart suit that is you`ve got on. It .............. cost you a fortune to buy.',
        options: [
            'ought to have',
            'must have',
            'can`t have',
            'should have',
            'needn`t have',
        ],
        rightAnswer: 1
    },
    {
        question: 'I didn’t recognize him because he _____ a haircut.',
        options: [
            'Had',
            'Has',
            'haved hased',
            'have had',
            'had had',
        ],
        rightAnswer: 4
    },
    {
        question: 'In order to ... with his studies he worked through the summer.',
        options: [
            'take care of',
            'take up',
            'take on',
            'catch up',
            'catch on',
        ],
        rightAnswer: 3
    },
    {
        question: 'I _____ you at 8.00, but you _____ just _____ out.',
        options: [
            'called / have / gone',
            'call / haved / go',
            'called / had / gone ',
            'have called / have / gone',
            'call / have / gone',
        ],
        rightAnswer: 2
    },
    {
        question: 'I can`t stand her and I find that even ... her voice gets on my nerves.',
        options: [
            'the sound of',
            'a sound of',
            'a sound from',
            'her sound of',
            'the sounds',
        ],
        rightAnswer: 0
    },
    {
        question: '“You’ll have to make up your mind soon.” She told me I _____ make up my mind soon.',
        options: [
            'had to',
            'could have to',
            'will have had to',
            'having to',
            'would have to',
        ],
        rightAnswer: 4
    },
    {
        question: 'Could I ______ your pen?',
        options: [
            'Taken',
            'Borrow',
            'Make',
            'Lend',
            'Give',
        ],
        rightAnswer: 1
    },
    {
        question: 'The boss urged the staff ............... this splendid opportunity he was offering them.',
        options: [
            'why not miss',
            'to miss',
            'not to miss',
            'would not miss',
            'about missing',
        ],
        rightAnswer: 2
    },
    {
        question: 'According to the estimate there are _____ or ______ 85,000 people who have joined today`s rally asking for the resignation of president.',
        options: [
            'much/more than',
            'the more / the less',
            'more/ fewer than',
            'more / less',
            'less/ fewer than',
        ],
        rightAnswer: 3
    },
    {
        question: 'Business diversity is associated with walking trips. Having four or more different types of businesses in a neighborhood significantly increased the number of walking trips among residents. This is probably true because of added convenience ______.',
        options: [
            'Residents are able to accomplish multiple routine errands in a single walking trip and thus may drive less',
            'A greater number of four-way intersections was also associated with more walking',
            'Neighbourhood age, and block length aren`t associated with walking',
            'The effects of housing density had been mixed',
            'Children living in close-knit neighborhoods are less likely to be overweight than children who don’t',
        ],
        rightAnswer: 0
    },
    {
        question: 'The ballet stage is a bright, seemingly weightless world where gravity is continually being _____ by the dancers.',
        options: [
            'Reflected',
            'Defied',
            'Prolonged',
            'Unbalanced',
            'Reapportioned',
        ],
        rightAnswer: 1
    },
    {
        question: 'Joe Louis was a /an ____ fighter: he inspired fear in many of his opponents.',
        options: [
            'Insipid',
            'Malleable',
            'Impetuous',
            'Serene',
            'Redoubtable',
        ],
        rightAnswer: 4
    },
    {
        question: 'The proportion of English, who are severely obese, increased by 50 percent from 2000 to 2005, twice _____ the growth seen in moderate obesity.',
        options: [
            'too fast',
            'fast enough',
            'so fast as',
            'as fast as',
            'so fast that',
        ],
        rightAnswer: 3
    },
    {
        question: 'Jane Addams was a peacemaker even when she was criticized for her views. She taught, wrote, and lectured about peace both nationally and internationally. Before World War I, Addams was probably the most beloved woman in America. In a newspaper poll that asked, "Who among our contemporaries are of the most value to the community?"_____',
        options: [
            'Addams`s repuation gradually was restored during the last years of her life.',
            'But she never changed her mind.',
            'Addams was second, after Thomas Edison',
            'When she opposed America’s involvement in WW I, newspapers called her a traitor.',
            'Have you ever believed she was right about something?',
        ],
        rightAnswer: 2
    },
    {
        question: 'With the 1969 film The Learning Tree, Gordon Parks proved what a truly _____ artist he was: he not only directed the film and composed its musical score, but also adapted its screenplay from his own novel',
        options: [
            'Protean',
            'Clairvoyant',
            'Complacent',
            'Lauded',
            'Harried',
        ],
        rightAnswer: 0
    },
    {
        question: 'I imagine Sally was about ---- when I asked her ---- a letter for me, as she looked rather reluctant.',
        options: [
            'to be leaving / typing',
            'to have left / type',
            'having left / typed',
            'leaving / to have typed',
            'to leave / to type',
        ],
        rightAnswer: 4
    },
    {
        question: 'This year, oil exporters could haul in $700 billion from selling oil to foreigners. This includes not only the Organisation of Petroleum Exporting Countries (OPEC) but also Russia and Norway, the world`s second- and third-biggest earners. _____ . In real terms, this is almost double their dollar surpluses in 1974 and 1980 when Russia`s hard-currency exports were tiny.',
        options: [
            'The rise in oil prices represents a big redistribution of income from those who buy oil to those who produce it',
            'The IMF estimates that oil exporters currentaccount surplus could reach $400 billion, more than four times as much as in 2002',
            'Relative to their economies, the oil producers` current-account 0 surpluses are far bigger than China`s',
            'If oil exporters spend their bonanza, they import more from other countries and thus help to maintain global demand',
            'The combined current-account surplus of China and other Asian emerging economies is put at only $188 billion this year',
        ],
        rightAnswer: 1
    },
    {
        question: 'According to the company spokesperson, the majority of the wrongful termination lawsuits filed against the company were frivolous, representing bogus claims made by _____ former employees hoping to strike it rich.',
        options: [
            'Disgruntled',
            'Surprised',
            'Greedy',
            'Contented',
            'Wise',
        ],
        rightAnswer: 2
    },
    {
        question: 'Many dairy products ______ cheese and yogurt and some fermented meat products already use lactic acid producing bacteria to protect and preserve their products.',
        options: [
            'Rather',
            'just as',
            'most of',
            'such as',
            'both',
        ],
        rightAnswer: 3
    },
    {
        question: 'It is claimed that there is a (n)______ for every problem in democracy.',
        options: [
            'Remedy',
            'Solute',
            'Obstacle',
            'Situation',
            'Correct',
        ],
        rightAnswer: 0
    },
    {
        question: 'The actor’s _____ decline in popularity was as striking and unexpected as his meteoric rise to prominence had been.',
        options: [
            'Dazzling',
            'Sudden',
            'Inevitable',
            'Precipitous',
            'Gradual',
        ],
        rightAnswer: 1
    },
    {
        question: 'The airlines are constantly pressing the manufacturers to produce large and medium-sized aircraft that can fly anywhere in the world non-stop. Gradually they are getting what they want, particularly with the latest Boeing and Airbus 250-300 seaters on the way. _____ . If flights like that become common, Emirates, with its giant planes and global hub, would be flying in the face of conventional wisdom',
        options: [
            'The airlines are expected to opt for large widebodied jets such as the latest version of Boeing`s 777 preferred by Emirates',
            'In particular, Emirates has ordered no fewer than 45 of Airbus`s A380, with operating costs promised to be 15-20% lower than today`s 747s',
            'That is why there is strong interest in some of the upcoming airline orders from the ones that Boeing hopes will come its way',
            'The key-thing about- these new subjumbos was that they had been suited for short flights',
            'A Boeing 777 has taken off from Hong Kong to fly to London, covering 20,300 kilometres and flying for 23 hours, to set a new record',
        ],
        rightAnswer: 4
    },
    {
        question: 'Women face unique challenges in keeping their blood pressure under control, and this may help explain why _____ women _____ men struggle with uncontrolled blood pressure.',
        options: [
            'less / than',
            'the more / the more',
            'the / same',
            'more / than',
            'such / as',
        ],
        rightAnswer: 3
    },
    {
        question: '_____ . Iraq`s former ruling minority had many reasons to dislike the document`s contents -the federal system split the country, they said, and allowed oil revenues to be distributed unevenly to benefit the Shia- and now they have reason to contest its legitimacy. Even before the election, some American and British officials said they were dreading this kind of result, which could stoke rather than pacify the insurgency.',
        options: [
            'Sunnis wanted to put forward various proposals at a national reconciliation conference sponsored by the Arab League',
            'The adoption of the constitution and December`s elections brought an end to the succession of shortlived transitional governments',
            'Iraq now has a constitution supported by large majorities of two of the three main ethnic groups, the Shia Arabs and the Kurds, but rejected by the third, the Sunni Arabs',
            'As a result in a last-minute deal aimed at getting the Sunnis on board, the constitutional drafters added a mechanism to review and amend the constitution in the first half of the new year',
            'However, opportunities still exist to bring the Sunnis into the political process',
        ],
        rightAnswer: 2
    },
    {
        question: 'That’s strange. I saw him ---- his bike along the river this morning and he didn’t mention anything about ---- his job.',
        options: [
            'riding / changing',
            'to be riding / to change',
            'ride / to have changed',
            'having ridden / change',
            'to ride / having changed',
        ],
        rightAnswer: 0
    },
    {
        question: 'Many things around us have begun to change so quickly that we can’t _____ them easily.',
        options: [
            'take up with',
            'look forward to',
            'go through with',
            'put off',
            'keep up with',
        ],
        rightAnswer: 4
    },
    {
        question: 'The company has had a bad year and will therefore not be ... any new workers.',
        options: [
            'taking after',
            'taking on',
            'taking off',
            'taking up',
            'taking to',
        ],
        rightAnswer: 1
    },
    {
        question: 'He was so tired that he ... asleep in the chair.',
        options: [
            'Went',
            'Lost',
            'Fell',
            'Became',
            'Felt',
        ],
        rightAnswer: 2
    },
    {
        question: 'He`s intelligent but he ... common sense.',
        options: [
            'Needs',
            'Fails',
            'Wants',
            'Lacks',
            'Misses',
        ],
        rightAnswer: 3
    },
    {
        question: '... experience of working in an office environment is essential for this job.',
        options: [
            'Previous',
            'First',
            'Last',
            'Earlier',
            'Initial',
        ],
        rightAnswer: 0
    },
    {
        question: 'Have you heard the great news, Anton? The man, ............... refused your proposal last year, has been arrested for embezzlement of government funds.',
        options: [
            'when he',
            'whose daughter',
            'Whom',
            'That',
            'who have repeatedly',
        ],
        rightAnswer: 1
    },
    {
        question: 'We expected him at eight, but he finally ... at midnight.',
        options: [
            'came off',
            'turned on',
            'found out',
            'turned off',
            'turned up',
        ],
        rightAnswer: 4
    },
    {
        question: 'He is a little bit ... in his left ear, but if you speak clearly he will hear what you say.',
        options: [
            'Disabled',
            'Dead',
            'Diseased',
            'Deaf',
            'Bad',
        ],
        rightAnswer: 3
    },
    {
        question: 'I`m simply surprised at your lack of authority over him. Why can`t you ............... him eat his dinner?',
        options: [
            'Tell',
            'Force',
            'Make',
            'Persuade',
            'Ask',
        ],
        rightAnswer: 2
    },
    {
        question: 'Sandra _____ Bob that she didn’t see the Taj Mahal.',
        options: [
            'Told',
            'Said',
            'Talked',
            'Tells',
            'Say',
        ],
        rightAnswer: 0
    },
    {
        question: 'When I learned to ski, I practiced on a slope that was not too ... .',
        options: [
            'Slow',
            'Tall',
            'Rising',
            'High',
            'Steep',
        ],
        rightAnswer: 4
    },
    {
        question: 'He sat there with his arms ... doing nothing waiting for us.',
        options: [
            'Beyond',
            'Folded',
            'Turned',
            'Flapped',
            'Twisted',
        ],
        rightAnswer: 1
    },
    {
        question: 'The desperate voice over the phone says: Darling, I`ve got news for you: my niece Meltem, together with her husband, six children, two dogs and three cats, .............. come to stay with us for a whole month.',
        options: [
            'Had',
            '------',
            'Has',
            'are to',
            'have',
        ],
        rightAnswer: 2
    },
    {
        question: 'I`d like to have a word with you. Yes, but ............... ?',
        options: [
            'we have to talk about what',
            'what about we have to talk',
            'about what we have to talk',
            'what do we have to talk about',
            'what we have to talk about',
        ],
        rightAnswer: 3
    },
    {
        question: 'The estate agent spent a ... deal of time trying to persuade me to buy the house.',
        options: [
            'Great',
            'Large',
            'Big',
            'Numerous',
            'Wide',
        ],
        rightAnswer: 0
    },
    {
        question: 'As far as I`m concerned, all he`s good at .............. making up the most improbable excuses anyone has ever heard.',
        options: [
            'he is',
            'Is',
            'Present',
            'Presently',
            'His',
        ],
        rightAnswer: 1
    },
    {
        question: 'It seems to me that they never gave a thought to probable future problems when the plans ............... five years ago.',
        options: [
            'to be laid down',
            'had been laid down',
            'were not laid down',
            'they laid down',
            'were being laid down',
        ],
        rightAnswer: 4
    },
    {
        question: '............... two months at sea, he came back healthier than ever.',
        options: [
            'Having been spent',
            'Being spent',
            'Spending',
            'Having spent',
            'While spending',
        ],
        rightAnswer: 3
    },
    {
        question: 'Why did you _____ that?',
        options: [
            'Said',
            'Tell',
            'Say',
            'Spoke',
            'Talk',
        ],
        rightAnswer: 2
    },
    {
        question: 'She has to work hard to keep the house ... and tidy with three small children.',
        options: [
            'Neat',
            'Smooth',
            'Plain',
            'Well',
            'Ordered',
        ],
        rightAnswer: 0
    },
    {
        question: 'It`s hard to ... the difference between this forgery and the real painting.',
        options: [
            'Speak',
            'Talk',
            'Say',
            'Realise',
            'Tell',
        ],
        rightAnswer: 4
    },
    {
        question: 'It is sometimes difficult for parents ____ whether ___their children for misbehaving.',
        options: [
            'being decided / punish',
            'to decide / to punish',
            'decided / having punished',
            'deciding / to be punishing',
            'having decided / punishing',
        ],
        rightAnswer: 1
    },
    {
        question: 'The Turkish strategy encompassed varying approaches and was _____ that of the English, necessitating a rethinking of traditional counterinsurgency methods.',
        options: [
            'so adaptable as',
            'so adaptable',
            'more adaptable than',
            'the most adaptable',
            'adaptable enough',
        ],
        rightAnswer: 2
    },
    {
        question: 'The economic downfall of the U.S. has affected many countries and Haiti is one of _____ one.',
        options: [
            'the most affecting',
            'more affecting',
            'as affected as',
            'the most affected',
            'more affected than',
        ],
        rightAnswer: 3
    },
    {
        question: 'Insurance companies would spend a lot _____ paying the $10 cost of a flu shot for each employee _____ they would pay to stop the resulting outbreak.',
        options: [
            'less / than',
            'so little / as',
            'such little / that',
            'the least / as',
            'so little / that',
        ],
        rightAnswer: 0
    },
    {
        question: 'Penguins are the most highly specialized of all birds for marine life. They swim entirely by means of their flipperlike wings, using their webbed feet as rudders. Their stiff feathers serve as insulation, and are waterproof when oiled. Since their legs are set far back on their bodies, they waddle awkwardly on land often travel by swinging on their bellies over the ice as they migrate sometimes great distances. Underwater they can swim up to 25 miles (40.3km) per hour as they pursue the fish, squid, and shrimp that form their diet. _____ . This results in weight losses of up to lb (33.8 kg) during the two-month incubation period.',
        options: [
            'They do not eat while on land, subsisting on a layer of fat under the skin',
            'The largest penguins, the emperor and the king (3 -4 f t / 91.5-122 cm in height), incubate their eggs between their feet in a fold of skin',
            'Their chief enemies are the leopard seal, killer whale, and skua gull',
            'Penguins are highly gregarious, and a population density of half a million birds',
            'There are 17 species of penguins, 10 of which are considered endangered or threatened',
        ],
        rightAnswer: 1
    },
    {
        question: 'Benjamin Franklin, one of America’s founding fathers, wrote that “They that can give up essential liberty to obtain a little temporary safety deserve neither liberty nor safety.” _____ . What precisely are the essential liberties which, when given up, make a liberal society unworthy of the name? In Franklin’s own country, as well as in Britain, Australia and elsewhere, these questions are proving particularly vexing to policymakers trying to deal with terrorism.',
        options: [
            'Some of the government`s other proposals are perhaps even more controversial than detention without charge',
            'Ministers had argued that 14 days’ detention without charge was too short to assess lots of complex and classified evidence',
            'The Pentagon issued new guidelines on prisoner interrogations, in an implicit response to the abuses at Baghdad’s prison',
            'Britain`s prime minister, Blair, announced that "the rules of the game are changing” and proposed new security measures to Parliament',
            'He presaged an argument that is raging almost two and a half centuries late',
        ],
        rightAnswer: 4
    },
    {
        question: 'Low levels of hormones can cause a laundry list of health problems______ fatigue, weight gain, and joint pain.',
        options: [
            'Sustaining',
            'Clarifying',
            'Confirming',
            'Including',
            'Excluding',
        ],
        rightAnswer: 3
    },
    {
        question: 'In training it is suggested that an instructor not lay a burden on an individual beyond his_____ .',
        options: [
            'Bearable',
            'Value',
            'Limit',
            'Moral',
            'Deficiency',
        ],
        rightAnswer: 2
    },
    {
        question: 'The company I work for offered me to choose between a better salary and a flat in the city centre and I chose ____.',
        options: [
            'the latter',
            'so late',
            'the later',
            'late',
            'the last',
        ],
        rightAnswer: 0
    },
    {
        question: 'The archaeologist enjoyed the ____ life she led while gathering artifacts; she never stayed at any one site long enough to get bored.',
        options: [
            'Rustic',
            'Clamorous',
            'Stealthy',
            'Indiscreet',
            'Nomadic',
        ],
        rightAnswer: 4
    },
    {
        question: 'Like most students, Emily was juggling a full schedule of classes. But in the middle of her junior year, she became overwhelmed by her normal routine. She rarely went out. Now a 30-year-old retail analyst. "Even though my eating habits hadn`t changed, I kept gaining weight." At first she chalked it up to the winter blues._____ ',
        options: [
            'A butterfly-shaped gland in her neck hasoccured',
            'But then a routine test at her yearly checkup showed something different: hypothyroidism',
            'And then she met Adrian, her husband for the next 20 years',
            'Most women aren`t diagnosed as easily as Emily',
            'Her doctor prescribed a recipe, and within a few weeks her energy levels improved',
        ],
        rightAnswer: 1
    },
    {
        question: 'In the neighbourhood _____ 10 to 14 percent of patients who go to see their doctor have depression.',
        options: [
            'so much as',
            'such as',
            'as many as',
            'as much as',
            'so many that',
        ],
        rightAnswer: 2
    },
    {
        question: 'Biscuit-makers both in Europe and Latin America have not done _____ hoped.',
        options: [
            'so well that',
            'so good as',
            'as good as',
            'as well as',
            'Better',
        ],
        rightAnswer: 3
    },
    {
        question: 'The many land and sea animals provide a source of food _____ income for the locals.',
        options: [
            'as well as',
            'as',
            'such',
            'more than',
            'so well',
        ],
        rightAnswer: 0
    },
    {
        question: 'A study into the `black sheep effect`, shows that children treat disloyalty in their own group _____ within different groups.',
        options: [
            'so harshly that',
            'more harshly than',
            'the most harshly',
            'as harsh as',
            'so harsh as',
        ],
        rightAnswer: 1
    },
    {
        question: 'Heart disease is the leading killer of women and men in the United States, and high blood pressure is a major contributor to _____ problems______ heart attack and stroke.',
        options: [
            'either / or',
            'whether / or',
            'so / that',
            'such / that',
            'such / as',
        ],
        rightAnswer: 4
    },
    {
        question: '“Information wants to be free,” according to a celebrated aphorism from the early days of the internet. ____ . As search-engine firms and others unveil plans to place books online, publishers fear that the services may end up devouring their business, either by bypassing them or because the initiatives threaten to make their copyrights redundant.',
        options: [
            'The cost of digitising a book can be as low as 10 cents per page, and as much as $100 per book',
            'A digitisation initiative dating back to the 1970s, currently boasts over 17,000 books in around 45 languages',
            'This summer, European nations backed a “digital library" plan to place literary works online',
            'Yet this ethos has been creating new headaches recently',
            'For readers, the idea of being able to access the knowledge on a single device seems a benefit of mythic proportions',
        ],
        rightAnswer: 3
    },
    {
        question: 'Pollution from marine shipping causes _____ 60,000 premature cardiopulmonary and lung cancer deaths around the world each year.',
        options: [
            'Apprehensively',
            'Primarily',
            'Approximately',
            'Extensively',
            'Appropriately',
        ],
        rightAnswer: 2
    },
    {
        question: 'Institutions and TOEFL score recipients that note ______ inconsistencies ______ high TOEFL scores and apparent weak English proficiency should refer to the photo on the official score report for evidence of impersonation.',
        options: [
            'such / as',
            'more/ than',
            'so / that',
            'such /that',
            'as / as',
        ],
        rightAnswer: 0
    },
    {
        question: 'Although Rolf is usually quite____ , he was so angered by the salesman’s rude remarks that he insisted on complaining to the manager.',
        options: [
            'Tractable',
            'Diffident',
            'Plucky',
            'Valiant',
            'Timorous',
        ],
        rightAnswer: 4
    },
    {
        question: 'Lisa _____ me a lift because I _____ the bus.',
        options: [
            'gave / was missing',
            'gave / had missed',
            'had gave / missed',
            'had / miss',
            'have given / have missed',
        ],
        rightAnswer: 1
    },
    {
        question: 'He kept his job ... the manager had threatened to dismiss him.',
        options: [
            'Unless',
            'Inspite',
            'Although',
            'Even',
            'Despite',
        ],
        rightAnswer: 2
    },
    {
        question: 'The Finance Minister will be making a ... today about new rates of income tax.',
        options: [
            'Notice',
            'Decision',
            'Declaration',
            'Statement',
            'Talk',
        ],
        rightAnswer: 3
    },
    {
        question: 'The shirt I wore that day was torn but I don`t think anyone ...',
        options: [
            'Noticed',
            'Remarked',
            'Mentioned',
            'Learned',
            'Watched',
        ],
        rightAnswer: 0
    },
    {
        question: 'Yes, I know you`re tired and sleepy, but let me remind you one thing: If you ............... up all night to watch that film, the world would look much brighter this morning, wouldn`t it?!',
        options: [
            'had stayed',
            'hadn`t stayed',
            'would stay',
            'wouldn`t stay',
            'would have stayed',
        ],
        rightAnswer: 1
    },
    {
        question: 'The plane crashed into a bridge because it was flying too ... ',
        options: [
            'Fast',
            'Slow',
            'Deep',
            'High',
            'Low',
        ],
        rightAnswer: 4
    },
    {
        question: 'After they _____ their work, they ___ home.',
        options: [
            'finish / had gone',
            'finished / went',
            'had finished / had gone',
            'had finished / went',
            'finished / had gone',
        ],
        rightAnswer: 3
    },
    {
        question: '.............. , he went to collect his payment',
        options: [
            'The work have been completed',
            'Despite the fact that the work was successfully completed',
            'Having finished his work successfully',
            'Although he had completed his work successfully',
            'As long as the work is completed with success',
        ],
        rightAnswer: 2
    },
    {
        question: 'He said I hadn`t given him his book back, but I was ... sure I had.',
        options: [
            'Quite',
            'Better',
            'Totally',
            'Rather',
            'Entirely',
        ],
        rightAnswer: 0
    },
    {
        question: 'When I got to the office, I _____ that I _____ to lock the front door.',
        options: [
            'had realized / forget',
            'had / forgetting',
            'realized / forget',
            'had realized / had forgotten',
            'realized / had forgotten',
        ],
        rightAnswer: 4
    },
    {
        question: 'I took my family to Paris last year. I _____ there as a student, so I _____ my way around.',
        options: [
            'had been / have known',
            'had been / knew',
            'were / knew',
            'was / know',
            'were / known',
        ],
        rightAnswer: 1
    },
    {
        question: 'You .............. another job pretty soon. I have a feeling that you`re going to get fired before long.',
        options: [
            'would have started to look for',
            'had better to start looking for',
            '`d better start looking for',
            '`d better to start to look for',
            'would start looking for',
        ],
        rightAnswer: 2
    },
    {
        question: 'Look over there. Isn`t that the woman ... son you played tennis with the other day?',
        options: [
            'of which',
            'whom',
            'who',
            'whose',
            'which',
        ],
        rightAnswer: 3
    },
    {
        question: 'He _____ he was at school the day before.',
        options: [
            'Said',
            'Say',
            ' is telling',
            'Told',
            'Tell',
        ],
        rightAnswer: 0
    },
    {
        question: '“The people who I looked after are very well.” She said that the people who she _____ after _____ very well.',
        options: [
            'have looked / are',
            'had looked / were',
            'were looking / are',
            'looked / are',
            'would looked / were',
        ],
        rightAnswer: 1
    },
    {
        question: 'The organizers decided to go ahead with the match ... the bad weather.',
        options: [
            'Although',
            'Unless',
            'Inspite',
            'in order',
            'despite',
        ],
        rightAnswer: 4
    },
    {
        question: 'It was a secret - you weren`t supposed to ... anyone anything.',
        options: [
            'Cheat',
            'Speak',
            'Talk',
            'Tell',
            'Say',
        ],
        rightAnswer: 3
    },
    {
        question: 'As soon as he _____ his driving test, he _____ a car',
        options: [
            'had passed / bring',
            'passed / had bought',
            'had passed / bought',
            'passed / bought',
            'passes / had bought',
        ],
        rightAnswer: 2
    },
    {
        question: 'No matter how hard I tried to make them understand, they just wouldn`t take my word for ............... I said, .............. annoyed me very much.',
        options: [
            'what / which',
            'which / that',
            'which / which',
            'that / that',
            'that / which',
        ],
        rightAnswer: 0
    },
    {
        question: '.............. rich people are, they never seem satisfied with their lot and are always anxious to make ............... more money.',
        options: [
            'Many / much',
            'Although / some',
            'So much / so much',
            'Whoever / that',
            'No matter how / still',
        ],
        rightAnswer: 4
    },
    {
        question: 'One problem with Bing Bang theory is explaining how the stars and galaxies were formed. ____Gravity alone cannot cause this in a smooth universe, and so something had to supply the initial gravity that allowed galaxies to form. Physicists suggests that dark matter WIMPs (weakly interacting massive particles) accomplished this task Since WIMPs only affect ordinary matter gravitionally.',
        options: [
            'Gravity is strong enough to stop the expansion eventually and pull everything back to a single point',
            'If matter initially was distributed .£3 evenly in all directions, what caused it to clump together in some regions and from stars and galaxies?',
            'However, the gravity of the galaxies seen in this image is strong enough to contain the glowing hot gas.',
            'The Bing Bang theory tries to explain how the universe was formed.',
            'Then, a great explosion resulted in the universe being formed',
        ],
        rightAnswer: 1
    },
    {
        question: '_____ . Even as a young man, Patrick Henry had that kind of influence in the American Colonies. Born in 1736, Henry, a natural leader and a brilliant speaker, believed in individual rights and independence from the British government. As a young lawyer, he astonished his courtroom audience in 1763 with an eloquent defense based on the idea of natural rights, the political theory that humans are born with certain inalienable rights.',
        options: [
            'The idea of natural rights is central to the Declaration of Independence',
            'Known as the Bill of Rights, they guarantee certain freedoms, such as the freedom of speech and religion',
            'Have you ever heard someone speak so passionately that the speech moved you-to do something?',
            'With war against Britain looming, Henry proclaimed, "I know not what course others may take, but as for me, give me liberty or give me death!"',
            'As the first governor of Virginia, Henry continued to have profound influence on the development of the new nation.',
        ],
        rightAnswer: 2
    },
    {
        question: 'A new Palestinian state will be more likely to succeed, _____ its territorial contiguity; _____ open its borders, allowing free movement of people.',
        options: [
            'so great / as more',
            'greater than / more',
            'as great / so much',
            'the greater / the more',
            'the greatest / the most',
        ],
        rightAnswer: 3
    },
    {
        question: 'Singapore possesses all the ingredients for traffic disaster. The Island city-state has a large population, a limited land area, booming economic growth and one of the highest automobile densities in the world. _____ . Yet, Singapore’s traffic moves smoothly. Much of the explanation lies in sound urban planning and an effective mass-transit system.',
        options: [
            'In other rapidly Asian metropolises, like Bangkok, such conditions have wreaked bumper -to- pumper in the streets',
            'The Singaporean government doesn’t care about the air pollution caused by traffic',
            'Despite all efforts, car sales in Singapore increased in 1991',
            'All Singaporean citizens face two extra charges or taxes when buying a car',
            'Singaporeans are sympathetic to the government’s goal of keeping traffic moving',
        ],
        rightAnswer: 0
    },
    {
        question: 'These works are of ____ importance _____ they should be published at any cost.',
        options: [
            'such / that',
            'more / than',
            'so / as',
            'as / as',
            'so / that',
        ],
        rightAnswer: 1
    },
    {
        question: 'Midsize organizations producing live performances face the most serious financial strain. Either they will have to become larger and more prestigious -which many lack the resources to do- or they will have to cut their budgets and become more community oriented, using local talent to keep costs down._____ .',
        options: [
            'The population purchasing recorded performances had been growing',
            'Firstly the public that attends live performances has remained stable',
            'The young is comfortable with entertainment delivered by the Internet',
            'These trends could also have affected the quality of performing arts in the future',
            'Those that are not able to adapt may disappear',
        ],
        rightAnswer: 4
    },
    {
        question: 'Since the Song group is going to make a(n) _____ recording in the stadium tomorrow, almost everyone is thought to be there.',
        options: [
            'Alive',
            'Awake',
            'Life',
            'Live',
            'Conscious',
        ],
        rightAnswer: 3
    },
    {
        question: 'The enemy plane crashed some distance away from our trenches, its bombs exploding ............... it hit the ground.',
        options: [
            'Then',
            'so that',
            'as',
            'so',
            'therefore',
        ],
        rightAnswer: 2
    },
    {
        question: 'The success of a Palestinian state is inconceivable in the absence of peace and security for Palestinians and Israelis ______.',
        options: [
            'Alike',
            'Like',
            'As',
            'Similar',
            'Similar',
        ],
        rightAnswer: 0
    },
    {
        question: 'Scientists have discovered that our sense of smell is surprisingly-------, capable of distinguishing thousands of chemical odours.',
        options: [
            'Inanimate',
            'Reckless',
            'Faulty',
            'Rigid',
            'Keen',
        ],
        rightAnswer: 4
    },
    {
        question: 'One study found that nursing home residents 65 and older are three times _____ likely to be hospitalized for influenza ____ people of similar ages who do not live in nursing homes.',
        options: [
            'so / as',
            'more / than',
            'such / that',
            'so / that',
            'too / as',
        ],
        rightAnswer: 1
    },
    {
        question: 'One of the more interesting ideas to emerge from America`s soulsearching after the turn-of-the-century corporate scandals is that its leading business schools may have neglected to teach students about the moral dimension of being a CEO. _____ . Harvard, Stanford and others have since scrambled to introduce business-ethics classes, but for any aspiring boss not fortunate enough to attend.',
        options: [
            'Unlike most of the finger-waggers who berate CEOs these days, Mr Hindery has been one himself',
            'Realistically, it is boards of directors and large shareholders who have the power',
            'Instead, they focus on management mainly as a science of numbers',
            'On the positive side, they argued that CEOs should have tried to make a difference to society beyond making a return for shareholders',
            'The book recounts how Disney .B bullied Miramax, into dropping "Fahrenheit 9/11", a controversial Michael Moore documentary',
        ],
        rightAnswer: 2
    },
    {
        question: 'Many of the misconceptions about Queen Victoria were created by those who_____ her most; in their efforts to depict her as a model of all virtues, they lost sight of the real woman.',
        options: [
            'Impressed',
            'Challenged',
            'Censured',
            'Admired',
            'Esteemed',
        ],
        rightAnswer: 3
    },
    {
        question: '_____ . Some plants, such as cactus, are able to store large amounts of water in their leaves or stems. After a rainfall these plants absorb a large supply of water to last until the mesquite, have extraordinarily deep root systems that allow them to obtain water from far below the desert’s arid surface.',
        options: [
            'Desert plants have a variety of mechanisms for obtaining the water needed for survival',
            'Many kinds of vegetation can survive with little water',
            'Most people think of deserts as dry, flat areas with little vegetation and little or no rainfall',
            'Deserts are dry, flat areas with few plants which need no water',
            'Many deserts have varied geographical formations ranging from soft, rolling hills',
        ],
        rightAnswer: 0
    },
    {
        question: 'Two years after the end of the first world war, America passed the Jones Act. _____ . The war had convinced lawmakers of the need to foster a homegrown fleet for use in times of conflict or national emergency. In 1944, while a more modern war still raged in Europe, governments meeting in Chicago took inspiration from the Jones Act while laying down the regulations that would govern international air transport. These were crafted to safeguard the vital strategic role of each country’s “flag carrying” national airline.',
        options: [
            'And restrictions on foreign ownership of airlines, in the name of national security, have prevented the competition that has preserved the vitality of other industries',
            'This restricted the shipping of goods between home ports to American owned vessels',
            'On Monday November 14th, a new round of “open skies" negotiations is set to begin between Europe and America',
            'This is the latest in a series of attempts in recent years to unpick the anti-competitive -measures that were put in place in Chicago',
            'For decades, arcane rules on routes and frequencies have distorted the market for aviation',
        ],
        rightAnswer: 1
    },
    {
        question: 'Professor Chen believes that the universal character of art refutes the prevailing notion that art is a _____ of civilization, a cultural frill, a social veneer.',
        options: [
            'Depiction',
            'Hallmark',
            'Guarantee',
            'Record',
            'Luxury',
        ],
        rightAnswer: 4
    },
    {
        question: 'Stem cells may turn out to be a/an ______alternative to animal testing.',
        options: [
            'Summary',
            'Luminous',
            'Pensive',
            'Promising',
            'Usual',
        ],
        rightAnswer: 3
    },
    {
        question: 'In denying the convicted felon`s request for a retrial, the judge explained that the evidence demonstrating the man’s guilt was______.',
        options: [
            'Exculpatory',
            'Debatable',
            'Incontrovertible',
            'Auspicious',
            'Irrelevant',
        ],
        rightAnswer: 2
    },
    {
        question: 'The hall was very ... with over fifty people stuck into it.',
        options: [
            'Crowded',
            'Empty',
            'Decorated',
            'Painted',
            'Designed',
        ],
        rightAnswer: 0
    },
    {
        question: 'She lives near me I often speak to her on my ... to work.',
        options: [
            'Travel',
            'Path',
            'Road',
            'Street',
            'Way',
        ],
        rightAnswer: 4
    },
    {
        question: 'The hotel has been built on the ... of a lake.',
        options: [
            'Front',
            'Edge',
            'Boundary',
            'Border',
            'Behind',
        ],
        rightAnswer: 1
    },
    {
        question: 'If the radio isn`t working properly, you should ... to the shop. You`ve just bought it.',
        options: [
            'bring it up',
            'recieve it',
            'take it back',
            'take it out',
            'put it back',
        ],
        rightAnswer: 2
    },
    {
        question: 'The work had ............... under extremely difficult conditions. ',
        options: [
            'been doing',
            'Done',
            'to complete',
            'to be done',
            'completed',
        ],
        rightAnswer: 3
    },
    {
        question: 'If you have any ... concerning this report, please phone the Office.',
        options: [
            'Queries',
            'Wishes',
            'Requests',
            'Investigations',
            'Sayings',
        ],
        rightAnswer: 0
    },
    {
        question: 'I had read the book _____ I saw the film.',
        options: [
            'After',
            'Before',
            'When',
            'Until',
            'until for',
        ],
        rightAnswer: 1
    },
    {
        question: 'The colour of the sweater doesn`t ... so long as it is the right size.',
        options: [
            'Concern',
            'Worry',
            'Affect',
            'Match',
            'Matter',
        ],
        rightAnswer: 4
    },
    {
        question: 'Write to me and tell me ... about your holiday in Switzerland.',
        options: [
            'Every',
            'Few',
            'Much',
            'All',
            'Some',
        ],
        rightAnswer: 3
    },
    {
        question: 'The singer Nick Hucknall has decided ---- a two-year break, but he won’t have any money problems. He has already made enough money ---- a lifetime.',
        options: [
            'taken / to have lasted',
            'having taken / lasted',
            'to take / to last',
            'take / to be lasting',
            'taking / lasting',
        ],
        rightAnswer: 2
    },
    {
        question: 'I _____ her for everything she _____.',
        options: [
            'thanked / had done',
            'have thanked / has done',
            'had thank / done',
            'thanking / did',
            'had thanked / had done',
        ],
        rightAnswer: 0
    },
    {
        question: '_____ I had had a bath I went to bed.',
        options: [
            'Before',
            'For',
            'Soon as',
            'Until',
            'After',
        ],
        rightAnswer: 4
    },
    {
        question: 'I`ll be with you in ... ',
        options: [
            'a quater of hour',
            'a quarter of an hour',
            'a quarter and a half',
            'a quarter to with hour',
            'one quarter of an hours',
        ],
        rightAnswer: 1
    },
    {
        question: 'The child woke up crying because she had ... a nightmare.',
        options: [
            'Sent',
            'Felt',
            'Had',
            'Saw',
            'Dreamt',
        ],
        rightAnswer: 2
    },
    {
        question: 'We started early ... to miss the worst of the traffic.',
        options: [
            'so long as',
            'in so far',
            'in order',
            'so that',
            'in case',
        ],
        rightAnswer: 3
    },
    {
        question: 'Have you heard the great news, Anton? The man, ............... refused your proposal last year, has been arrested for embezzlement of government funds.',
        options: [
            'whose daughter',
            'who have repeatedly',
            'whom',
            'that',
            'when he',
        ],
        rightAnswer: 0
    },
    {
        question: 'The police put the _____ for the accident_____ the driver of the car.',
        options: [
            'charge / with',
            'blame / on',
            'accuse / of',
            'responsibility / for',
            'ticket / for',
        ],
        rightAnswer: 1
    },
    {
        question: 'Wynton Marsalis _____as one of the great trumpeters of the late twentieth century, winning Grammy awards for both his jazz and classical works.',
        options: [
            'Occurred',
            'Fluctuated',
            'Suggested',
            'Settled',
            'Emerged',
        ],
        rightAnswer: 4
    },
    {
        question: 'Don’t you think we should consider ---- the chimney ---- before the winter?',
        options: [
            'to have got / sweep',
            'having got / sweeping',
            'to be getting / to sweep',
            'getting / swept',
            'to get / being swept',
        ],
        rightAnswer: 3
    },
    {
        question: 'In recent weeks, the world’s public health officials have been afflicted with a sort of pandemic of meetings about bird flu. _____ . Plans were hatched for how best to respond to the threat from a virus that is threatening poultry around the world and which, it is feared, may trigger a pandemic of human flu.',
        options: [
            'Everyone seems to agree that the ; best strategy for dealing with the threat of a human pandemic is to control flu in birds',
            'In the short term, international agencies such as the WHO, the FAO and the DIE say they need about $80m to respond',
            'Much of this culminated, this week, in a meeting of officials from nations at the headquarters of the WHO in Geneva',
            'Countries such as Japan have reacted quickly to eliminate outbreaks of highly pathogenic bird flu',
            'It is increasingly clear that the world’s richer nations will have to pay for these countries to raise their capacity in these areas',
        ],
        rightAnswer: 2
    },
    {
        question: 'Last November, a landmark paper showed that stem-cell-like tumor cells with a signature protein are actually _____ to radiation ______ other brain cancer cells.',
        options: [
            'more resistant / than',
            'as resistantly / as',
            'so resistant / as',
            'such resistantly / that',
            'so resistant / that',
        ],
        rightAnswer: 0
    },
    {
        question: 'To Judith, traveling was______her sister, however, looked upon each trip as an interminable experience',
        options: [
            'Stupefying',
            'Confusing',
            'Joyous',
            'Tiring',
            'Exhilarating',
        ],
        rightAnswer: 4
    },
    {
        question: 'No actor in the 20th century broke down _____ barriers in Hollywood _____ did Poitier',
        options: [
            'much / as',
            'more / than',
            'not only / but also',
            'rather / than',
            'either / or',
        ],
        rightAnswer: 1
    },
    {
        question: 'Magic is used to overcome and help the good. However, it is portrayed as a positive element to be used in our daily life.______This emphasizes asserts that can be resolved through human willpower and effort.',
        options: [
            'However, it is implied that black magic is used for murder and death',
            'Children, to- whom we one day will hand over the future, can be saved only in this way',
            'Thus, all daily behaviors are associated with magic',
            'As a result, they use their father’s cars without permission, lie to cover up incidents',
            'There had been a new wave of increasing violence in children’s films, books and toys',
        ],
        rightAnswer: 2
    },
    {
        question: 'Marry is always seeing her doctor, for she doesn’t care_____ her health at all.',
        options: [
            'Of',
            'With',
            'About',
            'For',
            'In',
        ],
        rightAnswer: 3
    },
    {
        question: 'Alice Tyson has Xeroderma Pigmentosum which means exposure _____ sunlight increases her risk _____ getting cancer or going blind.',
        options: [
            'to/of',
            'in / through',
            'by/for',
            'fo r/a t',
            'on / in',
        ],
        rightAnswer: 0
    },
    {
        question: '_____ the danger of a particular insurgency is recognized, _____ likely it is that the military intervention will have to be considered.',
        options: [
            'So early / little',
            'The earlier / the less',
            'Such earlier / less than',
            'The earliest / the least',
            'Much earlier / less',
        ],
        rightAnswer: 1
    },
    {
        question: 'The rumor was of the ____ variety, spreading slowly and almost imperceptibly until, finally, everyone seemed to have heard the story',
        options: [
            'Expeditious',
            'Aggressive',
            'Dilatory',
            'Manifest',
            'Insidious',
        ],
        rightAnswer: 4
    },
    {
        question: 'Scientists are studying the birth and growth of thunderstorms to discover what causes the difference between showers that enable crops to _____ and violent storms that cause floods and erosions.',
        options: [
            'Multiply',
            'Flourish',
            'Parch',
            'Grow',
            'Wither',
        ],
        rightAnswer: 3
    },
    {
        question: 'In English there are many different kinds of expressions that people use to give a name to anything whose name is unknown or momentarily forgotten. The word gatget is one such word.______ . In everyday use, the word has a more general meaning. Other words are also used to give a name to something unnamed or unknown, and these words tend tp be somewhat imaginative.',
        options: [
            'Some words are used to name something when the name is not known',
            'English language has some troublesome words difficult to be pronounced',
            'It was first used by British sailors in the 1850’s and probably from French',
            'The word “Geomorphology” includes the surface of the earth',
            'Not is every language are all words original',
        ],
        rightAnswer: 2
    },
    {
        question: 'The fact that MTV, the cable channel devoted primarily to music, provided extensive coverage of the 1992 presidential race demonstrates how _____ politics and popular music culture have become.',
        options: [
            'Interrelated',
            'Permeated',
            'Contradictory',
            'Enclosed',
            'Obscured',
        ],
        rightAnswer: 0
    },
    {
        question: 'The report benchmarks the number of annual deaths caused globally by pollution from marine vessels, with coastal regions in Asia and Europe ______.',
        options: [
            'more affecting',
            'as affected',
            'Affecting',
            'the most affecting',
            'the most affected',
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