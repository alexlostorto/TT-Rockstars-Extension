startButton = document.querySelector('#start');

startButton.addEventListener('click', function() {
    minElement = document.querySelector('.min');
    maxElement = document.querySelector('.max');

    let min = 0
    let max = 0

    if ((minElement.value != '') && (maxElement.value != '')) {
        min = minElement.value;
        max = maxElement.value;
    } else {
        min = 300;
        max = 500;
    }

    console.log(min);
    console.log(max);

    if (startButton.textContent == 'Start') {
        startButton.textContent = 'Stop';
    } else {
        startButton.textContent = 'Start';
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "Start", min: min, max: max});
      });
});
