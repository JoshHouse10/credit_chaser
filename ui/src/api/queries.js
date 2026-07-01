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

export const topRankedReceivables = async () => {
    try {
    const response = await client.get("/dashboard/top_receivables");
    if(response.data) return response.data;
    else return [];
    }
    catch(error) {
    console.error(error);
    throw error;
    }
}