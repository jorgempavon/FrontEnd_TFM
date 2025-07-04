import { PenaltyDTO } from "./penaltyDTO";

export interface BookingPeriodPenaltyDTO {
    penaltyDTO: PenaltyDTO;
    days: number;
    bookingPeriodRuleName: string;
}