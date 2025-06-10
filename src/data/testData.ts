import { CreateRequestDto, ProductType } from '@/types';

export interface TestRequestData {
    name: string;
    phone: string;
    email: string;
    product: ProductType;
}

export const testData: TestRequestData[] = [
    {
        name: 'Алексей Петров',
        phone: '+123-456-7890',
        email: 'petrov@example.com',
        product: 'course-vue'
    },
    {
        name: 'Андрей Серов',
        phone: '+123-766-7900',
        email: 'serov@example.com',
        product: 'course-html'
    },
    {
        name: 'Евгений Кузнецов',
        phone: '+123-766-7900',
        email: 'kuznetsov@example.com',
        product: 'course-js'
    },
    {
        name: 'Владимир Смирнов',
        phone: '+123-766-7900',
        email: 'smirnov@example.com',
        product: 'course-php'
    },
    {
        name: 'Игорь Тихонов',
        phone: '+123-766-7900',
        email: 'tithonov@example.com',
        product: 'course-wordpress'
    },
    {
        name: 'Сергей Козлов',
        phone: '+123-766-7900',
        email: 'kozlov@example.com',
        product: 'course-js'
    },
    {
        name: 'Алексей Михайлов',
        phone: '+123-766-7900',
        email: 'mihailov@example.com',
        product: 'course-wordpress'
    }
];

export const getRandomTestData = (): CreateRequestDto => {
    const randomIndex = Math.floor(Math.random() * testData.length);
    return testData[randomIndex];
};