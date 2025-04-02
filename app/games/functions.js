export const getBetPayload = (gameId, clientSeed, betData) => {
    switch (gameId) {
        case 'mines':
            return {
                gameId: '1',
                clientSeed,
                mines: betData.mines,
                betAmount: parseFloat(betData.amount).toFixed(2)
            };
        default:
            return {};
    }
};

export const getResultFromResponse = (response) => {
    switch (response.gameId) {
        case '1': // mines
            return {
                isPlaying: true,
                placingBet: false,
                roundId: response?.roundId,
                betId: response?._id,
                betAmount: response?.betAmount,
                multipliers: response?.multipliers,
            };
        default:
            return {};
    }
};
