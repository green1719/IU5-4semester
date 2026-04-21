class StatsUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stats`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stats/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stats`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stats/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stats/${id}`;
    }
}

export const statsUrls = new StatsUrls();
