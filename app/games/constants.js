const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const apiEndPoints = {
    place_bet: `${API_URL}/api/games/place-bet`,
    choose_option: `${API_URL}/api/games/choose-option`,
    cashout: `${API_URL}/api/games/cashout`,
    balance: `${API_URL}/api/user/balance`,
};
