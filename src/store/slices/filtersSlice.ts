import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType, ProductType } from '@/types';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils';

interface FiltersState {
    status: StatusType | 'all';
    product: ProductType | 'all';
}

const initialState: FiltersState = {
    status: loadFromLocalStorage('selectedStatus', 'all'),
    product: loadFromLocalStorage('selectedProduct', 'all'),
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStatusFilter: (state, action: PayloadAction<StatusType | 'all'>) => {
            state.status = action.payload;
            saveToLocalStorage('selectedStatus', action.payload);
        },
        setProductFilter: (state, action: PayloadAction<ProductType | 'all'>) => {
            state.product = action.payload;
            saveToLocalStorage('selectedProduct', action.payload);
        },
        resetFilters: (state) => {
            state.status = 'all';
            state.product = 'all';
            saveToLocalStorage('selectedStatus', 'all');
            saveToLocalStorage('selectedProduct', 'all');
        },
    },
});

export const { setStatusFilter, setProductFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;