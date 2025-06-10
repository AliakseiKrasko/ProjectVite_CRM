import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Request, CreateRequestDto, UpdateRequestDto, FilterParams, RequestsStats } from '@/types';
import { getFormattedDate, getNextId, saveToLocalStorage, loadFromLocalStorage } from '@/utils';

// Симуляция LocalStorage API с помощью RTK Query
export const requestsApi = createApi({
    reducerPath: 'requestsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Request'],
    endpoints: (builder) => ({
        getRequests: builder.query<Request[], FilterParams>({
            queryFn: (filters) => {
                try {
                    let requests: Request[] = loadFromLocalStorage('requests', []);

                    // Применяем фильтры
                    if (filters.status !== 'all') {
                        requests = requests.filter(request => request.status === filters.status);
                    }

                    if (filters.product !== 'all') {
                        requests = requests.filter(request => request.product === filters.product);
                    }

                    return { data: requests };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', data: 'Failed to load requests' } };
                }
            },
            providesTags: ['Request'],
        }),

        getAllRequests: builder.query<Request[], void>({
            queryFn: () => {
                try {
                    const requests: Request[] = loadFromLocalStorage('requests', []);
                    return { data: requests };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', data: 'Failed to load requests' } };
                }
            },
            providesTags: ['Request'],
        }),

        getRequestById: builder.query<Request, number>({
            queryFn: (id) => {
                try {
                    const requests: Request[] = loadFromLocalStorage('requests', []);
                    const request = requests.find(r => r.id === id);

                    if (!request) {
                        return { error: { status: 'NOT_FOUND', data: 'Request not found' } };
                    }

                    return { data: request };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', data: 'Failed to load request' } };
                }
            },
            providesTags: (result, error, id) => [{ type: 'Request', id }],
        }),

        getRequestsStats: builder.query<RequestsStats, void>({
            queryFn: () => {
                try {
                    const requests: Request[] = loadFromLocalStorage('requests', []);

                    const stats: RequestsStats = {
                        total: requests.length,
                        new: requests.filter(r => r.status === 'new').length,
                        inwork: requests.filter(r => r.status === 'inwork').length,
                        complete: requests.filter(r => r.status === 'complete').length,
                    };

                    return { data: stats };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', data: 'Failed to load stats' } };
                }
            },
            providesTags: ['Request'],
        }),

        createRequest: builder.mutation<Request, CreateRequestDto>({
            queryFn: (newRequest) => {
                try {
                    const requests: Request[] = loadFromLocalStorage('requests', []);

                    const request: Request = {
                        id: getNextId(requests),
                        ...newRequest,
                        date: getFormattedDate(),
                        status: 'new',
                    };

                    const updatedRequests = [...requests, request];
                    saveToLocalStorage('requests', updatedRequests);

                    return { data: request };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', data: 'Failed to create request' } };
                }
            },
            invalidatesTags: ['Request'],
        }),

        updateRequest: builder.mutation<Request, UpdateRequestDto>({
            queryFn: (updatedRequest) => {
                try {
                    const requests: Request[] = loadFromLocalStorage('requests', []);
                    const index = requests.findIndex(r => r.id === updatedRequest.id);

                    if (index === -1) {
                        return { error: { status: 'NOT_FOUND', data: 'Request not found' } };
                    }

                    const request: Request = {
                        ...requests[index],
                        ...updatedRequest,
                    };

                    requests[index] = request;
                    saveToLocalStorage('requests', requests);

                    return { data: request };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', data: 'Failed to update request' } };
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Request', id }, 'Request'],
        }),

        deleteRequest: builder.mutation<{ id: number }, number>({
            queryFn: (id) => {
                try {
                    const requests: Request[] = loadFromLocalStorage('requests', []);
                    const filteredRequests = requests.filter(r => r.id !== id);

                    if (filteredRequests.length === requests.length) {
                        return { error: { status: 'NOT_FOUND', data: 'Request not found' } };
                    }

                    saveToLocalStorage('requests', filteredRequests);

                    return { data: { id } };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', data: 'Failed to delete request' } };
                }
            },
            invalidatesTags: ['Request'],
        }),
    }),
});

export const {
    useGetRequestsQuery,
    useGetAllRequestsQuery,
    useGetRequestByIdQuery,
    useGetRequestsStatsQuery,
    useCreateRequestMutation,
    useUpdateRequestMutation,
    useDeleteRequestMutation,
} = requestsApi;