import { HealthcareEntity } from "@azure/ai-text-analytics";
import { ResultEntity } from "./ResultEntry";
import { v4 as uuidv4 } from "uuid";

class ResultEntityParser {
    parse(text: string, result: HealthcareEntity[]): ResultEntity[] {
        const data = [...result].reverse();
        let cur_text = text;
        const parts: ResultEntity[] = [];

        data.forEach((d, i) => {
            parts.unshift({
                key: `${uuidv4()}_${i}`,
                text: cur_text.substring(d.offset + d.length),
                entity: undefined,
            });
            parts.unshift({
                key: `${uuidv4()}_${i}`,
                text: cur_text.substring(d.offset, d.offset + d.length),
                entity: d,
            });
            cur_text = cur_text.substring(0, d.offset);
        });
        if (cur_text) {
            parts.unshift({
                key: `${uuidv4()}_${parts.length}`,
                text: cur_text,
                entity: undefined,
            });
        }

        return parts;
    }
}

export default ResultEntityParser;
