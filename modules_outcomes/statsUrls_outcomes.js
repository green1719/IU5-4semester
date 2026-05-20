class StatsUrlsOutcomes {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/outcomes`;
    }

    getStockById(id) {
        return `${this.baseUrl}/outcomes/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/outcomes`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/outcomes/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/outcomes/${id}`;
    }
}

export const statsUrlsOutcomes = new StatsUrlsOutcomes();
