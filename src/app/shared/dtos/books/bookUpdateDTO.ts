export interface BookUpdateDTO {
    isbn: string;
    title: string;
    releaseDate?: Date;
    stock: number;
    genre: string;
    author:string;
}