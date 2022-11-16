import { Popover, Tag } from "antd";
import React from "react";
import { ResultEntity } from "./ResultEntry";
import { v4 as uuidv4 } from "uuid";

type Props = {
    key: string;
    entity: ResultEntity;
};

class AnalyzedResult extends React.Component<Props> {
    render() {
        const entry = this.props.entity;

        if (!entry.entity) {
            return <span>{entry.text}</span>;
        }

        return (
            <Popover
                placement="bottom"
                content=<div
                    className={
                        entry.entity.dataSources.length > 0
                            ? "pop-wide"
                            : ""
                    }
                >{entry.entity.dataSources.map((d) => {
                    return (
                        <Tag
                            key={`${entry.key}-${d.entityId}-${uuidv4()}`}
                            color="green"
                        >{`${d.entityId} | ${d.name}`}</Tag>
                    );
                })}</div>
                title={`${entry.entity.category} (confidence: ${entry.entity.confidenceScore})`}
            >
                
                    <span className="health-info">
                        {entry.text}
                    </span>
            </Popover>
        );
    }
}

export default AnalyzedResult;
