import axiosInstance from "@/api/axios";

const sweetService = {
    // Add a new sweet (Admin only)
    addSweet: async (sweetData) => {
        const response = await axiosInstance.post("/sweets", sweetData);
        return response.data;
    },

    // Get all sweets
    getAllSweets: async () => {
        const response = await axiosInstance.get("/sweets");
        return response.data;
    },

    // Search sweets by filters
    searchSweets: async (filters) => {
        const params = new URLSearchParams(filters).toString();
        const response = await axiosInstance.get(`/sweets/search?${params}`);
        return response.data;
    },

    // Update sweet (Admin only)
    updateSweet: async (id, updatedData) => {
        const response = await axiosInstance.put(`/sweets/${id}`, updatedData);
        return response.data;
    },

    // Delete sweet (Admin only)
    deleteSweet: async (id) => {
        const response = await axiosInstance.delete(`/sweets/${id}`);
        return response.data;
    },

    // Purchase a sweet
    purchaseSweet: async (id, quantity = 1) => {
        const response = await axiosInstance.post(`/sweets/${id}/purchase`, { quantity });
        return response.data;
    },

    // Restock a sweet (Admin only)
    restockSweet: async (id, quantity) => {
        const response = await axiosInstance.post(`/sweets/${id}/restock`, { quantity });
        return response.data;
    },
};

export default sweetService;
