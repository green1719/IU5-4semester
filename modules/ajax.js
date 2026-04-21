class Api {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async get(url) {
        // fetch возвращает промис, await приостанавливает выполнение метода
        // до тех пор пока сервер не ответит — но браузер при этом не замирает
        const response = await fetch(url);

        // response.json() тоже возвращает промис — парсит тело ответа как JSON
        return response.json();
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async post(url, data) {
        // fetch принимает вторым аргументом объект настроек запроса
        const response = await fetch(url, {
            method: 'POST',
            // говорим серверу что отправляем JSON
            headers: { 'Content-Type': 'application/json' },
            // сериализуем объект data в строку JSON для отправки
            body: JSON.stringify(data),
        });

        return response.json();
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async patch(url, data) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        return response.json();
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        // У DELETE тело ответа может быть пустым (статус 204)
        // В таком случае .json() упадёт с ошибкой — возвращаем null
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }
}

// Экспортируем экземпляр класса — называем api вместо ajax
export const api = new Api();
