import { useState } from "react";
import { KeyCreator } from "../components/KeyCreator";
import { Schema } from "../components/schema";
import { ShowCode } from "../components/ShowCode";

export function Home() {
    const ident = 4;
    const [schema, setSchema] = useState(new Schema());

    const [formattedSchema, setFormattedSchema] = useState(schema.convertToJson(ident));

    function onSchemaUpdate(newSchema: Schema) {
        setSchema(newSchema);
        setFormattedSchema(newSchema.convertToJson(ident));
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-1">Json Schema Creator</h1>
                <div className="flex flex-row justify-center flex-wrap">
                    <KeyCreator onUpdate={onSchemaUpdate} schema={schema}></KeyCreator>
                    <ShowCode code={formattedSchema} programmingLanguage="json"></ShowCode>
                </div>
            </div>
        </>
    );
}
