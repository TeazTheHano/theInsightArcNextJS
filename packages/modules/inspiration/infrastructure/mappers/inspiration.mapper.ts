import { Inspiration } from "../../domain/Inspiration";
import { InspirationContract } from "../../application/contracts/inspiration.contract";

export class InspirationMapper {
    private static cleanString(str: any): string {
        if (typeof str !== 'string') return str || "";
        let cleaned = str.trim();
        if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
            cleaned = cleaned.substring(1, cleaned.length - 1);
        }
        return cleaned.replace(/\\"/g, '"');
    }

    static toDomain(raw: any): Inspiration {
        return {
            id: raw.id || "",
            title: this.cleanString(raw.title) || "Untitled",
            description: this.cleanString(raw.description) || "",
            coverImage: this.cleanString(raw.coverImage),
            link: this.cleanString(raw.link),
            ratio: this.cleanString(raw.ratio),
        };
    }

    static toContract(domain: Inspiration): InspirationContract {
        return { ...domain };
    }
}
