export interface BookingLoanDTO {
    id: number;
    beginDate: Date;
    endDate: Date;
    returned: boolean;
    collected: boolean;
    bookTitle: string;
    clientName: string;
}