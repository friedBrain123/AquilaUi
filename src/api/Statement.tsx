import axios from "axios";

const BookingApi = axios.create({
    baseURL: `https://localhost:44328/v3/location/358dfed5-9584-45e7-98e6-925994b50bfc`,
    headers: {
        "X-API-KEY": "OKH4VX6KEUQQXS9RE5UUE66DEGNSRYON",
    },
});

export const getStatements = async () => {
    const reponse = await BookingApi.get(`statement`);
    return reponse.data;
};

export const getPendingStatements = async () => {
    const reponse = await BookingApi.get(`statement/pending`);
    return reponse.data;
};


export const getSummary = async () => {
    const reponse = await BookingApi.get(`statement/summary`);
    return reponse.data;
};