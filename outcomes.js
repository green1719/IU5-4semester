window.onload = function(){

    // outcomes — значения
    let firstOutcome = ''
    let secondOutcome = ''
    let outcomeResult = ''
    let selectedOperation = null
    let outcomeDataset = []

    const outcomesDisplay = document.getElementById("outcomes-display-output")

    // outcomes — кнопки ввода цифр
    const outcomeInputBtns = document.querySelectorAll('.outcomes-input-btn')

    function onOutcomeInput(inputSample) {
        if (selectedOperation === 'variance') {
            if ((inputSample != '.') || (inputSample == '.' && !secondOutcome.includes(inputSample))) {
                secondOutcome += inputSample;
            }
            outcomesDisplay.innerHTML = secondOutcome;
            return;
        }
        if (!selectedOperation) {
            if ((inputSample != '.') || (inputSample == '.' && !firstOutcome.includes(inputSample))) {
                firstOutcome += inputSample;
            }
            outcomesDisplay.innerHTML = firstOutcome;
        } else {
            if ((inputSample != '.') || (inputSample == '.' && !secondOutcome.includes(inputSample))) {
                secondOutcome += inputSample;
                outcomesDisplay.innerHTML = secondOutcome;
            }
        }
    }

    outcomeInputBtns.forEach(button => {
        button.onclick = function() {
            const sampleValue = button.innerHTML;
            onOutcomeInput(sampleValue);
        }
    });

    // outcomes — операции
    document.getElementById("outcomes-op-multiply").onclick = function() {
        if (firstOutcome === '') return;
        selectedOperation = 'x';
    }

    document.getElementById("outcomes-op-variance").onclick = function() {
        if (firstOutcome === '' && outcomeDataset.length === 0) return;

        if (selectedOperation !== 'variance') {
            outcomeDataset = [+firstOutcome];
            firstOutcome = '';
            secondOutcome = '';
            selectedOperation = 'variance';
            outcomesDisplay.innerHTML = 'введи следующее число';
            return;
        }

        if (secondOutcome !== '') {
            outcomeDataset.push(+secondOutcome);
            secondOutcome = '';
            outcomesDisplay.innerHTML = 'введи следующее число или =';
        }
    }

    document.getElementById("outcomes-op-add").onclick = function() {
        if (firstOutcome === '') return;
        if (secondOutcome !== '') {
            firstOutcome = ((+firstOutcome) + (+secondOutcome)).toString();
            secondOutcome = '';
            outcomesDisplay.innerHTML = firstOutcome;
        }
        selectedOperation = '+';
    }

    document.getElementById("outcomes-op-subtract").onclick = function() {
        if (firstOutcome === '') return;
        if (secondOutcome !== '') {
            firstOutcome = ((+firstOutcome) - (+secondOutcome)).toString();
            secondOutcome = '';
            outcomesDisplay.innerHTML = firstOutcome;
        }
        selectedOperation = '-';
    }

    document.getElementById("outcomes-op-divide").onclick = function() {
        if (firstOutcome === '') return;
        selectedOperation = '/';
    }

    document.getElementById("outcomes-op-negate").onclick = function() {
        if (!selectedOperation) {
            if (firstOutcome === '') {
                firstOutcome = '-';
                outcomesDisplay.innerHTML = firstOutcome;
                return;
            }
            firstOutcome = ((+firstOutcome) * -1).toString();
            outcomesDisplay.innerHTML = firstOutcome;
        } else {
            if (secondOutcome === '') {
                secondOutcome = '-';
                outcomesDisplay.innerHTML = secondOutcome;
                return;
            }
            secondOutcome = ((+secondOutcome) * -1).toString();
            outcomesDisplay.innerHTML = secondOutcome;
        }
    }

    document.getElementById("outcomes-op-percent").onclick = function() {
        if (!selectedOperation) {
            if (firstOutcome === '') return;
            firstOutcome = ((+firstOutcome) / 100).toString();
            outcomesDisplay.innerHTML = firstOutcome;
        } else {
            if (secondOutcome === '') return;
            secondOutcome = ((+secondOutcome) / 100).toString();
            outcomesDisplay.innerHTML = secondOutcome;
        }
    }

    document.getElementById("outcomes-op-backspace").onclick = function() {
        if (selectedOperation === 'variance') {
            secondOutcome = secondOutcome.slice(0, -1);
            outcomesDisplay.innerHTML = secondOutcome === '' ? 'введи следующее число' : secondOutcome;
            return;
        }
        if (!selectedOperation) {
            firstOutcome = firstOutcome.slice(0, -1);
            outcomesDisplay.innerHTML = firstOutcome === '' ? 0 : firstOutcome;
        } else {
            secondOutcome = secondOutcome.slice(0, -1);
            outcomesDisplay.innerHTML = secondOutcome === '' ? 0 : secondOutcome;
        }
    }

    document.getElementById("outcomes-op-std-dev").onclick = function() {
        if (!selectedOperation) {
            if (firstOutcome === '') return;
            firstOutcome = Math.sqrt(+firstOutcome).toString();
            outcomesDisplay.innerHTML = firstOutcome;
        } else {
            if (secondOutcome === '') return;
            secondOutcome = Math.sqrt(+secondOutcome).toString();
            outcomesDisplay.innerHTML = secondOutcome;
        }
    }

    document.getElementById("outcomes-op-clear").onclick = function() {
        firstOutcome = '';
        secondOutcome = '';
        outcomeResult = '';
        selectedOperation = null;
        outcomeDataset = [];
        outcomesDisplay.innerHTML = 0;
    }

    document.getElementById("outcomes-op-square").onclick = function() {
        if (!selectedOperation) {
            if (firstOutcome === '') return;
            firstOutcome = ((+firstOutcome) * (+firstOutcome)).toString();
            outcomesDisplay.innerHTML = firstOutcome;
        } else {
            if (secondOutcome === '') return;
            secondOutcome = ((+secondOutcome) * (+secondOutcome)).toString();
            outcomesDisplay.innerHTML = secondOutcome;
        }
    }

    // outcomes — смена темы
    document.getElementById("outcomes-ctrl-theme").onclick = function() {
        if (document.body.style.backgroundColor === 'rgb(235, 239, 244)') {
            document.body.style.backgroundColor = '#0F141E';
        } else {
            document.body.style.backgroundColor = '#EBEFF4';
        }
    }

    // outcomes — комбинаторика (факториал)
    function computeFactorial(n) {
        if (n < 0) return 'Ошибка';
        if (n === 0 || n === 1) return 1;
        return n * computeFactorial(n - 1);
    }

    document.getElementById("outcomes-op-factorial").onclick = function() {
        if (!selectedOperation) {
            if (firstOutcome === '') return;
            firstOutcome = computeFactorial(+firstOutcome).toString();
            outcomesDisplay.innerHTML = firstOutcome;
        } else {
            if (secondOutcome === '') return;
            secondOutcome = computeFactorial(+secondOutcome).toString();
            outcomesDisplay.innerHTML = secondOutcome;
        }
    }

    // outcomes — вычислить результат
    document.getElementById("outcomes-op-compute").onclick = function() {

        if (selectedOperation === 'variance') {
            if (secondOutcome !== '') {
                outcomeDataset.push(+secondOutcome);
                secondOutcome = '';
            }
            if (outcomeDataset.length < 2) return;

            const outcomeMean = outcomeDataset.reduce((sum, val) => sum + val, 0) / outcomeDataset.length;
            const outcomeVariance = outcomeDataset.reduce((sum, val) => sum + Math.pow(val - outcomeMean, 2), 0) / outcomeDataset.length;

            firstOutcome = outcomeVariance.toString();
            selectedOperation = null;
            outcomeDataset = [];
            outcomesDisplay.innerHTML = firstOutcome;
            return;
        }

        if (firstOutcome === '' || secondOutcome === '' || !selectedOperation) return;

        switch(selectedOperation) {
            case 'x':
                outcomeResult = (+firstOutcome) * (+secondOutcome);
                break;
            case '+':
                outcomeResult = (+firstOutcome) + (+secondOutcome);
                break;
            case '-':
                outcomeResult = (+firstOutcome) - (+secondOutcome);
                break;
            case '/':
                outcomeResult = (+firstOutcome) / (+secondOutcome);
                break;
            default:
                break;
        }

        firstOutcome = outcomeResult.toString();
        secondOutcome = '';
        selectedOperation = null;
        outcomesDisplay.innerHTML = firstOutcome;
    }

    // outcomes — переключить стиль дисплея
    document.getElementById("outcomes-ctrl-display").onclick = function() {
        outcomesDisplay.classList.toggle('dark');
    }
};
