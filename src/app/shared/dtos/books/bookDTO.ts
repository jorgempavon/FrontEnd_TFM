export interface BookDTO {
    id: number;
    isbn: string;
    title: string;
    qr: string;
    releaseDate: Date;
    stock: number;
    genre: string;
    author:string;
}