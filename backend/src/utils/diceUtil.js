function findWinner(input) {
    const players = input.map(player => player.map(Number));
    
    const patterns = [
        { name: '5 of a kind', check: isFiveOfAKind },
        { name: '4 of a kind', check: isFourOfAKind },
        { name: 'Full House', check: isFullHouse },
        { name: 'Straight', check: isStraight },
        { name: 'Pair', check: isPair }
    ];

    let maxScore = -1;
    let winner = -1;

    for (let i = 0; i < players.length; i++) {
        const playerScore = calculateScore(players[i]);
        if (playerScore > maxScore) {
            maxScore = playerScore;
            winner = i + 1;
        } else if (playerScore === maxScore) {
            const currentSum = players[i].reduce((sum, value) => sum + value, 0);
            const winnerSum = players[winner - 1].reduce((sum, value) => sum + value, 0);

            if (currentSum > winnerSum) {
                winner = i + 1;
            }
        }
    }

    return `Winner is player ${winner} - ${patterns[maxScore - 1].name}`;
}

function calculateScore(dice) {
    const patterns = [
        { check: isFiveOfAKind, score: 5 },
        { check: isFourOfAKind, score: 4 },
        { check: isFullHouse, score: 3 },
        { check: isStraight, score: 2 },
        { check: isPair, score: 1 }
    ];

    for (const pattern of patterns) {
        if (pattern.check(dice)) {
            return pattern.score;
        }
    }
    return 0;
}

function isFiveOfAKind(dice) {
    return new Set(dice).size === 1;
}

function isFourOfAKind(dice) {
    const counts = countOccurrences(dice);
    return Object.values(counts).includes(4);
}

function isFullHouse(dice) {
    const counts = countOccurrences(dice);
    return Object.values(counts).includes(3) && Object.values(counts).includes(2);
}

function isStraight(dice) {
    return new Set(dice).size === 5 && Math.max(...dice) - Math.min(...dice) === 4;
}

function isPair(dice) {
    const counts = countOccurrences(dice);
    return Object.values(counts).includes(2);
}

function countOccurrences(arr) {
    return arr.reduce((count, value) => {
        count[value] = (count[value] || 0) + 1;
        return count;
    }, {});
}

const validateInput = (playersInput) => {
    return Array.isArray(playersInput) && playersInput.every(Array.isArray);
};

const parseInputString = (inputString) => {
    const playerStrings = inputString.split('|').map((playerString) => playerString.trim());
    
    const playersInput = playerStrings.map((playerString) => {
      const rolls = playerString.match(/\d+/g);
      return rolls ? rolls.map(Number) : [];
    });
  
    return playersInput;
  };

module.exports = {
    findWinner,
    validateInput,
    parseInputString
}