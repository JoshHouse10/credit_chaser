import client from './client.js';

export const fetchDueInvoicesNext7Days = async () => {
    try {
        const response = await client.get("invoices/next_7_days");
        if(response.data) return response.data;
        else return [];
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

export const fetchHomePageStatistics = async () => {
    try {
        const response = await client.get("/dashboard/statistic_cards");
        if(response.data) return response.data;
        else return {};
    }
    catch(error) {
    console.error(error);
    throw error;
    }
}

export const fetchTopRankedReceivables = async () => {
    try {
    const response = await client.get("/dashboard/largest_value");
    if(response.data) return response.data;
    else return [];
    }
    catch(error) {
    console.error(error);
    throw error;
    }
    }

export const fetchInvoices = async (page, limit) => {
    try {
        const response = await client.get("/invoices",{
            params : {
                page,
                limit
                }
            })
            return response.data;
        }
        catch(error) {
        console.error(error)
        }
    }
