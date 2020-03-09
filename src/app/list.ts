export interface ListItem {
    id: number;
    type: string;
}

export interface ListItems {
    [key: string]: ListItem[];
}
