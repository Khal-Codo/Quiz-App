import Question from "./Questions.js";
import Quiz from "./Quiz.js"

const App = (() =>{
    //  cache DOM
    const quizEl = document.querySelector(".jabquiz");
    const quizquestionEl = document.querySelector(".jabquiz__question");
    const trackerEl = document.querySelector(".jabquiz__tracker");
    const taglineEl = document.querySelector(".jabquiz__tagline");
    const choicesEl = document.querySelector(".jabquiz__choices");
    const progressInnerEl = document.querySelector(".progress__inner");
    const nextBtnEl = document.querySelector(".next");
    const restartBtnEl = document.querySelector(".restart");

    const q1 = new Question(
        "What is a nickname DeAndre Hopkins in known by?",
        ["Megatron","Cheetah","Nuk","Prime Time"],
        2
        )

    const q2 = new Question(
        "What uniform number did Denver retire for NFL great John Elway?",
        ["7","3","2","10"],
        0
        )
    const q3 = new Question(
        "Who was the Baltimore Ravens' backup quarterback for Joe Flacco in the 2011 NFL season?",
        ["Lamar Jackson","Brock Osweiller","Brody Bronson","Tyrod Taylor"],
        3
        )

    const q4 = new Question(
        "Which player won the most Fedex Air QB of the week awards during the 2011 NFL season?",
        ["Drew Brees","Tom Brady","Aaron Rodgers","Matt Ryan"],
        2
        )
    const q5 = new Question(
        "Which NFL team won the superbowl in 2009?",
        ["Greenbay Packers","New England Patriots","Pittsburgh Steelers","New Orleans Saints"],
        3
        )
        
        const myQuiz = new Quiz([q1,q2,q3,q4,q5]);

        const listeners = _ => {

            nextBtnEl.addEventListener("click",function() {
                const selectedRadioElem = document.querySelector("input[name='choices']:checked");
                
                if (selectedRadioElem) {
                    const key = Number(selectedRadioElem.getAttribute("data-order"));
                    myQuiz.guess(key);
                    renderAll();
                }
            })

            restartBtnEl.addEventListener("click",function(){
                // reset the quiz
                myQuiz.reset();
                // renderAll
                renderAll();
                // Restore next btn
                nextBtnEl.style.opacity = 1;
            })
        }
        const setValue = (elem, value) => {
            elem.innerHTML = value;
        }

        const renderQuestion = _ => {
            const question = myQuiz.getCurrentQuestion().question;
            setValue(quizquestionEl, question);
        }
        
        const renderChoicesElements = _ => {
            let markup = "";
            const currentChoices = myQuiz.getCurrentQuestion().choices;
            currentChoices.forEach((elem,index) => {
                markup +=  `
                <li class="jabquiz__choice">
                            <input type="radio" name="choices" class="jabquiz__input" data-order="${index}" id="choice${index}">
                            <label for="choice${index}" class="jabquiz__label">
                            <i></i>
                            <span>${elem}</span>
                        </label>
                        </li>
                `
            });
                setValue(choicesEl,markup);
        }
        
        const renderTracker = _ => {
            const index = myQuiz.currentIndex;
            setValue(trackerEl,`${index+1} of ${myQuiz.questions.length}`)
        }
            
        const getPercentage = (num1, num2) => {
            return Math.round((num1/num2) * 100);
        }

        const launch = (width, maxPercent) => {
            let loadingBar = setInterval(function(){
                if(width > maxPercent){
                    clearInterval(loadingBar)
                } else {
                    width++;
                    progressInnerEl.style.width = `${width}%`
                }
            }, 3)
        }
        
        const renderProgress = _ => {
            // 1. width
            const currentWidth = getPercentage(myQuiz.currentIndex,myQuiz.questions.length);
            // 2. launch(0,width)
            launch(0,currentWidth);
        }

        const renderEndScreen = _ => {
            setValue(quizquestionEl, `Great Job!`);
            setValue(taglineEl, `Complete`);
            setValue(trackerEl, `Your Score is ${getPercentage(myQuiz.score,myQuiz.questions.length)}%`);
            nextBtnEl.style.opacity = 0;
            renderProgress();
        }


        const renderAll = _ => {
            if (myQuiz.hasEnded()) {
                // render end screen
                renderEndScreen();
            } else {
                // 1. render question
                renderQuestion();
                // 2. render choices
                renderChoicesElements();
                // 3. render Tracker
                renderTracker();
                // 4. Render progress
                renderProgress();
            }
        }

        return {
            renderAll: renderAll,
            listeners: listeners
        }
})();

        App.renderAll();
        App.listeners();


