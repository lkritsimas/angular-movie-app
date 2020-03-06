export interface Person {
    adult: boolean;
    also_known_as: string[];
    birthday: string | null;
    deathday: null | string;
    gender: number;
    homepage: null | string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth?: string;
    profile_path: string | null;
}

export interface Cast {
    adult: boolean;
    backdrop_path: string | null;
    character: string;
    credit_id: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Crew {
    adult: boolean;
    backdrop_path: string | null;
    credit_id: string;
    department: string;
    genre_ids: number[];
    id: number;
    job: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
