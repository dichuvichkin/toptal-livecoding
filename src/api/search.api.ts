import {request} from "./request";

export interface IBook {
    key: string;
    author_name?: string[];
    first_publish_year?: number;
    title?: string;
}

interface IResponse {
    docs: IBook[];
}

export async function searchBooks(query: string) {
    return request<IResponse>('get', `search.json?q=${query}`)
}
