export interface Movie {
    adult: boolean;
    backdrop_path?: string;
    budget?: number;
    credits?: {
        cast: Cast[],
        crew: Crew[]
    }
    genres?: Genre[];
    id: number;
    original_language?: string;
    original_title?: string;
    overview: string;
    poster_path?: string;
    release_date?: string;
    release_dates?: {
        results: {
            iso_3166_1: string,
            release_dates: ReleaseDates[]
        }[]
    };
    revenue?: number;
    runtime?: number;
    similar?: {
        results: Movie[]
    };
    tagline?: string;
    title: string;
    vote_average?: number;
    vote_count?: number;
}

export interface ReleaseDates {
    certification: string;
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
}

export interface Genre {
    id?: number,
    name: string
}

export interface Cast {
    id: number;
    cast_id: number;
    name: string;
    character: string;
    order: number;
    profile_path?: string;
}

export interface Crew {
    id: number;
    credit_id: number;
    name: string;
    job: string;
    department: string;
    order: number;
    profile_path?: string;
}

export interface Credits {
    cast: Cast[],
    crew: Crew[]
}
