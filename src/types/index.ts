export interface Request {
    id: number;
    name: string;
    phone: string;
    email: string;
    product: ProductType;
    date: string;
    status: StatusType;
}

export interface RequestWithNames extends Request {
    productName: string;
    statusName: string;
}

export type ProductType =
    | 'course-html'
    | 'course-js'
    | 'course-vue'
    | 'course-php'
    | 'course-wordpress';

export type StatusType = 'new' | 'inwork' | 'complete';

export interface CreateRequestDto {
    name: string;
    phone: string;
    email: string;
    product: ProductType;
}

export interface UpdateRequestDto {
    id: number;
    name: string;
    phone: string;
    email: string;
    product: ProductType;
    status: StatusType;
}

export interface FilterParams {
    status: StatusType | 'all';
    product: ProductType | 'all';
}

export interface RequestsStats {
    total: number;
    new: number;
    inwork: number;
    complete: number;
}

export const PRODUCTS: Record<ProductType, string> = {
    'course-html': 'Курс по верстке',
    'course-js': 'Курс по JavaScript',
    'course-vue': 'Курс по VUE JS',
    'course-php': 'Курс по PHP',
    'course-wordpress': 'Курс по WordPress'
};

export const STATUSES: Record<StatusType, string> = {
    'new': 'Новые',
    'inwork': 'В работе',
    'complete': 'Завершенные'
};

export const STATUS_BADGES: Record<StatusType, string> = {
    'new': 'badge-danger',
    'inwork': 'badge-warning',
    'complete': 'badge-success'
};