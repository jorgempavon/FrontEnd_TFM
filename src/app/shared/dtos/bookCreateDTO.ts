export interface BookCreateDTO {
    isbn: string;
    title: string;
    releaseDate?: Date;
    stock: number;
    genre: string;
    author:string;
}