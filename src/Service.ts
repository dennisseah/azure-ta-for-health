import {
    AzureKeyCredential,
    HealthcareEntity,
    TextAnalyticsClient,
} from "@azure/ai-text-analytics";

class Service {
    client: TextAnalyticsClient;
    constructor() {
        if (!process.env.REACT_APP_AZURE_LANG_KEY) {
            throw Error("AZURE_LANG_KEY is missing");
        }
        if (!process.env.REACT_APP_AZURE_LANG_ENDPOINT) {
            throw Error("AZURE_LANG_ENDPOINT is missing");
        }

        const cred = new AzureKeyCredential(
            process.env.REACT_APP_AZURE_LANG_KEY
        );
        this.client = new TextAnalyticsClient(
            process.env.REACT_APP_AZURE_LANG_ENDPOINT,
            cred
        );
    }

    public async analyze(text: string[]): Promise<HealthcareEntity[]> {
        const poller = await this.client.beginAnalyzeHealthcareEntities(text);
        const results = await poller.pollUntilDone();
        const next = await results.next();
        const result = next.value;

        if (!result.error) {
            return result.entities;
        }
        throw new Error(result.error.message);
    }
}

export default Service;
