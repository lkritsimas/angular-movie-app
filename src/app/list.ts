export interface ListItem {
    id: number;
    image: string;
}

export interface ListItems {
    title: string,
    order?: number;
    movies: ListItem[]
}

// export interface ListItems {
//     [key: string]: ListItem[];
// }
