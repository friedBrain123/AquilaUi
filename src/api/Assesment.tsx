import axios from "axios";

const BookingApi = axios.create({
    baseURL: `https://localhost:44328/v3/location/358dfed5-9584-45e7-98e6-925994b50bfc`,
    headers: {
        "X-API-KEY": "OKH4VX6KEUQQXS9RE5UUE66DEGNSRYON",
    },
});

export const getAssesments = async () => {
    const reponse = await BookingApi.get(`development/e93c2680-080d-471f-91a2-618f3c42a272/assessments`);
    return reponse.data;
};

export const prmoteGrade = async (programmeId, memberId) => {
    const reponse = await BookingApi.post(`development/${programmeId}/member/${memberId}/grade/promote`);
    return reponse.data;
};
