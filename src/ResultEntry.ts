import { HealthcareEntity } from "@azure/ai-text-analytics";

export type ResultEntity = {
    key: string;
    text: string;
    entity: HealthcareEntity | undefined;
};
