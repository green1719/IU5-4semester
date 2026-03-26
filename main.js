import {MainPage} from "./pages/main/index.js";

const root = document.getElementById('root');
const mainPage = new MainPage(root);
mainPage.render();

let arr = [1, 1, 2, 3, 5, 8, 13, 21, 44, 65];

/* задача 1.3 */
function sumOfSquares(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i] * arr[i];
    }
    return sum;
}

/* задача 1.4 */
function getSumAndMultOfArray(arr) {
    let sum = 0;
    let mult = 1;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
        mult = mult * arr[i];
    }
    return { sum, mult };
}

let arr1 = [1, 1, 2, 3, 5, 8, 13, 21, 44, 65];
let arr2 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

/* задача 2.4 */
function diff(arr1, arr2){
    let repeats = [];
    for (let i = 0; i < arr1.length; i++){
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                repeats.push(arr1[i]);
                break;
            }
        }
    }
    let result = [];
    for (let i = 0; i < arr1.length; i++){
        if (!repeats.includes(arr1[i])){
            result.push(arr1[i]);
        }
    }
    return result;
}

let str = "qwerewq";

/* задача 3.8 */
function isPalindrom1(str) {
    const cleaned = String(str).toLowerCase();
    let reversed = '';
    for (let i = cleaned.length - 1; i >= 0; i--) {
        reversed += cleaned[i];
    }
    return cleaned === reversed;
}

function isPalindrom2(str) {
    const cleaned = String(str).toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}

const results = {
    '1.3': `sumOfSquares([${arr}]) = ${sumOfSquares(arr)}`,
    '1.4': `getSumAndMultOfArray([${arr}]):\nсумма = ${getSumAndMultOfArray(arr).sum}\nпроизведение = ${getSumAndMultOfArray(arr).mult}`,
    '2.4': `diff([${arr1}], [${arr2}]) = [${diff(arr1, arr2)}]`,
    '3.8': `isPalindrom1("${str}") = ${isPalindrom1(str)}\nisPalindrom2("${str}") = ${isPalindrom2(str)}`
}

// document.querySelectorAll('[data-task]').forEach(button => {
//     button.addEventListener('click', () => {
//         const task = button.dataset.task
//         alert(`Задача ${task}:\n\n${results[task]}`)
//     })
// })

document.querySelectorAll('[data-task]').forEach(button => {
    button.addEventListener('click', () => {
        const task = button.dataset.task
        document.getElementById('task-result').innerText = `Задача ${task}:\n\n${results[task]}`
    })
})