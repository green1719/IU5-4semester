window.onload = function(){

    // значения
    let firstOperand = ''
    let secondOperand = ''
    let computedResult = ''
    let selectedOperation = null
    let varianceValues = []

    const displayOutputResult = document.getElementById("display-output-result")

    // цифры
    const sampleButtons = document.querySelectorAll('[id ^= "st_calc_btn_sample_"]')

    function onSampleButtonClicked(digit) {
        if (selectedOperation === 'variance') {
            if ((digit != '.') || (digit == '.' && !secondOperand.includes(digit))) {
                secondOperand += digit;
            }
            displayOutputResult.innerHTML = secondOperand;
            return;
        }
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !firstOperand.includes(digit))) {
                firstOperand += digit;
            }
            displayOutputResult.innerHTML = firstOperand;
        } else {
            if ((digit != '.') || (digit == '.' && !secondOperand.includes(digit))) {
                secondOperand += digit;
                displayOutputResult.innerHTML = secondOperand;
            }
        }
    }

    sampleButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onSampleButtonClicked(digitValue);
        }
    });

    // операции
    document.getElementById("st_calc_btn_op_multiply").onclick = function() {
        if (firstOperand === '') return;
        selectedOperation = 'x';
    }

    document.getElementById("st_calc_btn_op_variance").onclick = function() {
        if (firstOperand === '' && varianceValues.length === 0) return;

        if (selectedOperation !== 'variance') {
            varianceValues = [+firstOperand];
            firstOperand = '';
            secondOperand = '';
            selectedOperation = 'variance';
            displayOutputResult.innerHTML = 'введи следующее число';
            return;
        }

        if (secondOperand !== '') {
            varianceValues.push(+secondOperand);
            secondOperand = '';
            displayOutputResult.innerHTML = 'введи следующее число или =';
        }
    }

    document.getElementById("st_calc_btn_op_add").onclick = function() {
        if (firstOperand === '') return;
        if (secondOperand !== '') {
            firstOperand = ((+firstOperand) + (+secondOperand)).toString();
            secondOperand = '';
            displayOutputResult.innerHTML = firstOperand;
        }
        selectedOperation = '+';
    }

    document.getElementById("st_calc_btn_op_subtract").onclick = function() {
        if (firstOperand === '') return;
        if (secondOperand !== '') {
            firstOperand = ((+firstOperand) - (+secondOperand)).toString();
            secondOperand = '';
            displayOutputResult.innerHTML = firstOperand;
        }
        selectedOperation = '-';
    }

    document.getElementById("st_calc_btn_op_divide").onclick = function() {
        if (firstOperand === '') return;
        selectedOperation = '/';
    }

    document.getElementById("st_calc_btn_op_negate").onclick = function() {
        if (!selectedOperation) {
            if (firstOperand === '') {
                firstOperand = '-';
                displayOutputResult.innerHTML = firstOperand;
                return;
            }
            firstOperand = ((+firstOperand) * -1).toString();
            displayOutputResult.innerHTML = firstOperand;
        } else {
            if (secondOperand === '') {
                secondOperand = '-';
                displayOutputResult.innerHTML = secondOperand;
                return;
            }
            secondOperand = ((+secondOperand) * -1).toString();
            displayOutputResult.innerHTML = secondOperand;
        }
    }

    document.getElementById("st_calc_btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (firstOperand === '') return;
            firstOperand = ((+firstOperand) / 100).toString();
            displayOutputResult.innerHTML = firstOperand;
        } else {
            if (secondOperand === '') return;
            secondOperand = ((+secondOperand) / 100).toString();
            displayOutputResult.innerHTML = secondOperand;
        }
    }

    document.getElementById("st_calc_btn_op_remove_observation").onclick = function() {
        if (selectedOperation === 'variance') {
            secondOperand = secondOperand.slice(0, -1);
            displayOutputResult.innerHTML = secondOperand === '' ? 'введи следующее число' : secondOperand;
            return;
        }
        if (!selectedOperation) {
            firstOperand = firstOperand.slice(0, -1);
            displayOutputResult.innerHTML = firstOperand === '' ? 0 : firstOperand;
        } else {
            secondOperand = secondOperand.slice(0, -1);
            displayOutputResult.innerHTML = secondOperand === '' ? 0 : secondOperand;
        }
    }

    document.getElementById("st_calc_btn_op_std_dev").onclick = function() {
        if (!selectedOperation) {
            if (firstOperand === '') return;
            firstOperand = Math.sqrt(+firstOperand).toString();
            displayOutputResult.innerHTML = firstOperand;
        } else {
            if (secondOperand === '') return;
            secondOperand = Math.sqrt(+secondOperand).toString();
            displayOutputResult.innerHTML = secondOperand;
        }
    }

    document.getElementById("st_calc_btn_op_clear_dataset").onclick = function() {
        firstOperand = '';
        secondOperand = '';
        computedResult = '';
        selectedOperation = null;
        varianceValues = [];
        displayOutputResult.innerHTML = 0;
    }

    document.getElementById("st_calc_btn_op_sum_of_squares").onclick = function() {
        if (!selectedOperation) {
            if (firstOperand === '') return;
            firstOperand = ((+firstOperand) * (+firstOperand)).toString();
            displayOutputResult.innerHTML = firstOperand;
        } else {
            if (secondOperand === '') return;
            secondOperand = ((+secondOperand) * (+secondOperand)).toString();
            displayOutputResult.innerHTML = secondOperand;
        }
    }

    // тема
    document.getElementById("st_calc_btn_toggle_theme").onclick = function() {
        if (document.body.style.backgroundColor === 'rgb(235, 239, 244)') {
            document.body.style.backgroundColor = '#0F141E';
        } else {
            document.body.style.backgroundColor = '#EBEFF4';
        }
    }

    // цифры — пакетный ввод
    document.getElementById("st_calc_btn_sample_batch_input").onclick = function() {
        if (selectedOperation === 'variance') {
            secondOperand += '000';
            displayOutputResult.innerHTML = secondOperand;
            return;
        }
        if (!selectedOperation) {
            if (firstOperand === '') return;
            firstOperand += '000';
            displayOutputResult.innerHTML = firstOperand;
        } else {
            if (secondOperand === '') return;
            secondOperand += '000';
            displayOutputResult.innerHTML = secondOperand;
        }
    }

    // комбинаторика
    function factorial(n) {
        if (n < 0) return 'Ошибка';
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    document.getElementById("st_calc_btn_op_combinatorics").onclick = function() {
        if (!selectedOperation) {
            if (firstOperand === '') return;
            firstOperand = factorial(+firstOperand).toString();
            displayOutputResult.innerHTML = firstOperand;
        } else {
            if (secondOperand === '') return;
            secondOperand = factorial(+secondOperand).toString();
            displayOutputResult.innerHTML = secondOperand;
        }
    }

    // вычислить
    document.getElementById("st_calc_btn_op_compute_result").onclick = function() {

        if (selectedOperation === 'variance') {
            if (secondOperand !== '') {
                varianceValues.push(+secondOperand);
                secondOperand = '';
            }
            if (varianceValues.length < 2) return;

            const mean = varianceValues.reduce((sum, val) => sum + val, 0) / varianceValues.length;
            const variance = varianceValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / varianceValues.length;

            firstOperand = variance.toString();
            selectedOperation = null;
            varianceValues = [];
            displayOutputResult.innerHTML = firstOperand;
            return;
        }

        if (firstOperand === '' || secondOperand === '' || !selectedOperation) return;

        switch(selectedOperation) {
            case 'x':
                computedResult = (+firstOperand) * (+secondOperand);
                break;
            case '+':
                computedResult = (+firstOperand) + (+secondOperand);
                break;
            case '-':
                computedResult = (+firstOperand) - (+secondOperand);
                break;
            case '/':
                computedResult = (+firstOperand) / (+secondOperand);
                break;
            default:
                break;
        }

        firstOperand = computedResult.toString();
        secondOperand = '';
        selectedOperation = null;
        displayOutputResult.innerHTML = firstOperand;
    }

    // переключить экран
    document.getElementById("st_calc_btn_toggle_display").onclick = function() {
        displayOutputResult.classList.toggle('dark');
    }
};