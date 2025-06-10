import { Request, RequestWithNames, PRODUCTS, STATUSES } from '@/types';

export const getFormattedDate = (): string => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export const addProductAndStatusNames = (requests: Request[]): RequestWithNames[] => {
    return requests.map(request => ({
        ...request,
        productName: PRODUCTS[request.product],
        statusName: STATUSES[request.status]
    }));
};

export const getNextId = (requests: Request[]): number => {
    return requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
};

export const saveToLocalStorage = (key: string, data: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};