import { clientCredentialAxios } from './AxiosInstance';


export const labels = () => {
    return clientCredentialAxios.get('labels')
}

export const shows = () => {
    return clientCredentialAxios.get('shows')
}

export const showsToday = () => {
    return clientCredentialAxios.get('shows/today')
}

export const showOne = (id) => {
    return clientCredentialAxios.get(`show/${id}`)
}

export const createShow = (data) => {
    return clientCredentialAxios.post('show/create', data);
}

export const editShow = (id, data) => {
    return clientCredentialAxios.post(`show/edit/${id}`, data);
}

export const deleteShow = (id) => {
    return clientCredentialAxios.delete(`show/delete/${id}`);
}


