console.log("Working");

let execute = "Stop";
let min = 0;
let max = 0;
let runner = '';

chrome.runtime.onMessage.addListener(
    function(request) {
        if (!request.message === "Start") {return}

    try {
        clearInterval(runner);
    } catch(err) {}

    min = request.min;
    max = request.max;

    console.log(min);
    console.log(max);

    if (execute == 'Stop') {
        execute = 'Start';
    } else {
        execute = 'Stop';
    }

    console.log(execute);

    runner = setInterval(main, randomIntFromInterval(min,max));
});

const observer = new MutationObserver(function() {
    restart();
    checkShop();
    console.log("Change occurred")
});

observer.observe(document, {
  subtree: true,
  childList: true
});

function checkShop() {
    // Total cost: 927575 (for the rest of the costumes)
    let costList = []
    let total = 0
    costElements = document.querySelectorAll('.text-gray-500.text-xs.flex.items-center.gap-2.ng-star-inserted > span')
    if (costElements !== null) {
        for (let i = 0; i < costElements.length; i++) {
            cost = costElements[i].textContent;
            cost = cost.replace(' to complete', '');
            cost = cost.replace(',', '');
            cost = parseInt(cost);
            console.log(cost);
            costList.push(cost);
            total = total + cost;
        }
        console.log(costList.length);
        console.log(`Total cost: ${total}`);
    }
}

function restart() {
    againButton = document.querySelector('.mat-focus-indicator.margin-5.play-button.stamp.mat-raised-button.mat-button-base.mat-accent.ng-star-inserted')
    if (againButton !== null) {
        againButton.click();
    }
}

function main() {
    if (execute == 'Stop') {return}
    try {
    questionElement = document.querySelector('.current-game-question.center');
    if (questionElement !== null) {
        let question = questionElement.textContent;
        let answer = 0;
        question = question.replace(/ /g, '');
        console.log(question)
        if (question.includes('×')) {
            question = question.split('×');
            answer = question[0]*question[1].toString();
            console.log(answer)
        } else if (question.includes('÷')) {
            question = question.split('÷');
            answer = question[0]/question[1].toString();
            console.log(answer)
        }

        answer = answer.toString();

        button1 = document. querySelector('[aria-label="1"]');
        button2 = document. querySelector('[aria-label="2"]');
        button3 = document. querySelector('[aria-label="3"]');
        button4 = document. querySelector('[aria-label="4"]');
        button5 = document. querySelector('[aria-label="5"]');
        button6 = document. querySelector('[aria-label="6"]');
        button7 = document. querySelector('[aria-label="7"]');
        button8 = document. querySelector('[aria-label="8"]');
        button9 = document. querySelector('[aria-label="9"]');
        button0 = document. querySelector('[aria-label="0"]');

        enterButton = document.querySelector('.key-ent');

        for (let i = 0; i < answer.length; i++) {
            if (answer[i] == '1') {
                button1.click();
            } else if (answer[i] == '2') {
                button2.click();
            } else if (answer[i] == '3') {
                button3.click();
            } else if (answer[i] == '4') {
                button4.click();
            } else if (answer[i] == '5') {
                button5.click();
            } else if (answer[i] == '6') {
                button6.click();
            } else if (answer[i] == '7') {
                button7.click();
            } else if (answer[i] == '8') {
                button8.click();
            } else if (answer[i] == '9') {
                button9.click();
            } else if (answer[i] == '0') {
                button0.click();
            }
        }

        enterButton.click();
    } else {return}
    } catch(err) {console.log(err)}
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}  

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}
