const rows = [
    {
        1: '.,?',
        2: 'abc',
        3: 'def',
    },
    {
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
    },
    {
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    },
    {
        0: ' ',
    }
];

function numsToLetters(nums) {
    const keys = nums.split('');
    const numToLettersMap = {...rows[0], ...rows[1], ...rows[2], ...rows[3]}
    return keys.map(key => numToLettersMap[parseInt(key)]);
}

export { rows, numsToLetters };