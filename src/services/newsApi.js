const newsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
    'X-RapidAPI-Key': 'cc35e07ca1mshfe3b03d0f23516cp131845jsn0f68829d3a1d'
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

export const fetchCryptoNews = async () => {
    const endpoint = '/v1/cryptodaily';
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: newsHeaders,
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
};