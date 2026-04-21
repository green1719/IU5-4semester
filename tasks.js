/* задача 1.3 — сумма квадратов числовых кодов букв (строка "14,1,20,...") */
export function sumOfSquares(codesStr) {
    const nums = codesStr.split(',').map(Number);
    return nums.reduce((sum, n) => sum + n * n, 0);
}

/* задача 1.4 — сумма и произведение числовых кодов букв */
export function getSumAndMult(codesStr) {
    const nums = codesStr.split(',').map(Number);
    let sum = 0, mult = 1;
    for (const n of nums) {
        sum += n;
        mult *= n;
    }
    return { sum, mult };
}

/* задача 2.4 — коды из первой половины, которых нет во второй половине */
export function diff(s1, s2) {
    const arr1 = s1.split(',').map(Number);
    const arr2 = s2.split(',').map(Number);
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
        let found = false;
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) { found = true; break; }
        }
        if (!found) result.push(arr1[i]);
    }
    return result;
}

/* задача 3.8 — проверка строки на палиндром */
export function isPalindrome(str) {
    const s = str.toLowerCase().replace(/[^а-яёa-z]/g, '');
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++; right--;
    }
    return true;
}
