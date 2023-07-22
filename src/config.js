export const SERVER = 'http://localhost:5000';

export function createURL(path){
    return `${SERVER}/${path}`
}