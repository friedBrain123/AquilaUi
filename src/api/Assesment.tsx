import axios from "axios";

const BookingApi = axios.create({
    baseURL: `https://localhost:44328/v3/location/358dfed5-9584-45e7-98e6-925994b50bfc`,
    headers: {
        "X-API-KEY": "OKH4VX6KEUQQXS9RE5UUE66DEGNSRYON",
    },
});

export const getAssesments = async () => {
    const reponse = await BookingApi.get(`development/2b7ffd0c-c6e2-4217-9dc8-e88b580dd7f5/assessments`);
    return reponse.data;
};

export const prmoteGrade = async (programmeId, memberId) => {
    const reponse = await BookingApi.post(`development/${programmeId}/member/${memberId}/grade/promote`);
    return reponse.data;
};

export const assignGrade = async (programmeId, memberId, gradeId) => {
    console.log(programmeId, memberId, gradeId);
    const reponse = await BookingApi.post(`development/${programmeId}/member/${memberId}/grade/${gradeId}/assign`);
    return reponse.data;
};

const programmeApi = axios.create({
    baseURL: `https://localhost:44328/v3/location/358dfed5-9584-45e7-98e6-925994b50bfc`,
    headers: {
        "X-API-KEY": "OKH4VX6KEUQQXS9RE5UUE66DEGNSRYON",
    },
});

export const getProgrammes = async () => {
    const reponse = await programmeApi.get(`programmes?accountId=eea17034-59d1-421e-ad15-ba0c6bdfb046/detailed`);
    return reponse.data;
};

export const getmembers = async () => {
    const members = axios.create({
        baseURL: `https://dev.api.efcaquila.co.uk/v3/location/358dfed5-9584-45e7-98e6-925994b50bfc/members/query`,
        headers: {
            "X-API-KEY": "OKH4VX6KEUQQXS9RE5UUE66DEGNSRYON",
        },
    });

    const reponse = await members.get("");
    return reponse.data;
};

export const UpdateMember = async (member, propertyNum) => {

    let value:string = `custom_Property_${propertyNum}`
    
    const members = axios.create({
        baseURL: `https://dev.api.efcaquila.co.uk/v3/location/358dfed5-9584-45e7-98e6-925994b50bfc/members/${member.id}`,
        headers: {
            "X-API-KEY": "OKH4VX6KEUQQXS9RE5UUE66DEGNSRYON",
        },
    });

    const reponse = await members.put("",{
            "title": member.title,
            "firstName": member.firstName,
            "lastName": member.lastName,
            "contactTitle": member.contactTitle,
            "contactFirstName": member.contactFirstName,
            "contactLastName": member.contactLastName,
            value: "175",
    });
    return reponse.data;
};
