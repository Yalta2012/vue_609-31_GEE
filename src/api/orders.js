import { apiClient } from "./http";

export const ordersApi = {
    getByIser(userId){
        return apiClient.get('/orders', {params:{userId}});
    },

    create(userId, orderData){
        return apiClient.post('/orders', {userId, orderData});
    }
}