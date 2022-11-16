import "antd/dist/antd.min.css";
import React from "react";
import "./App.css";
import Service from "./Service";
import { Button, message, PageHeader, Space, Spin, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";

import ResultEntityParser from "./ResultEntryParser";
import AnalyzedResult from "./AnalyzedResult";

const { Paragraph } = Typography;

class App extends React.Component {
    text = "";
    state = {
        processing: false,
        text: "",
        result: null,
    };
    async analyze() {
        this.setState({ processing: true });
        if (this.text) {
            const svc = new Service();
            const result = await svc.analyze([this.text]);
            message.info(`Found ${result.length} entities.`);
            const parts = new ResultEntityParser().parse(this.text, result);

            this.setState({
                processing: false,
                result: (
                    <div>
                        {parts.map((p) => {
                            return <AnalyzedResult key={p.key} entity={p} />;
                        })}
                    </div>
                ),
            });
        }
    }
    captureText(text: string) {
        this.text = text.trim();
    }
    render(): JSX.Element {
        return (
            <div className="App">
                <PageHeader
                    className="site-page-header"
                    backIcon={false}
                    title="Azure Text Analytic for Healthcare"
                    subTitle="Demo"
                />
                <Space
                    direction="vertical"
                    style={{ width: "100%", textAlign: "right" }}
                >
                    <TextArea
                        onChange={(e) => this.captureText(e.target.value)}
                    ></TextArea>
                    <Button
                        title="Analyze"
                        type="primary"
                        onClick={async () => await this.analyze()}
                    >
                        Analyze
                    </Button>
                </Space>
                <div className="result-view">
                    <Paragraph>{this.state.result}</Paragraph>
                    <Spin
                        size="large"
                        style={{
                            display: this.state.processing ? "block" : "none",
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default App;
