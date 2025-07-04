import { PenaltyDTO } from "./penaltyDTO";

export interface TemporaryPeriodPenaltyDTO {
    penaltyDTO: PenaltyDTO;
    endDate: Date;
    temporaryPeriodRuleName: string;
}