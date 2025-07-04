export interface PenaltyDTO {
    id: number;
    description: string;
    justificationPenalty: string;
    fulfilled: boolean;
    forgived: boolean;
    creationDate: Date;
    type: string;
    bookTitle:string;
    clientName:string;
}