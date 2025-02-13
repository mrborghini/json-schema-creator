import { useState } from "react";
import { AvailableTypes } from "../types";
import { Schema } from "./schema";

interface Props {
    onSubmit: (schema: Schema) => void,
    schema: Schema
}

export function CreateOverlay(props: Props) {
    const [keyName, setKeyName] = useState<string>("");
    const [selectedType, setSelectedType] = useState<AvailableTypes>(AvailableTypes.String);
    const [selectedArrayType, setSelectedArrayType] = useState<AvailableTypes>(AvailableTypes.String);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function makeStringJsonCompatible(input: string): string {
        input = input.replace(/ /g, "_");
        input = input.toLowerCase();
        return input;
    }

    function onClick() {
        if (!keyName) {
            setErrorMessage("Error: No key name has been set");
            return;
        }

        if (!selectedArrayType && selectedType === AvailableTypes.Array) {
            setErrorMessage("Error: No array type has been selected");
            return;
        }

        let arrayType: AvailableTypes | null = null;
        if (selectedType === AvailableTypes.Array) {
            arrayType = selectedArrayType;
        }

        try {
            props.schema.addKey({
                name: makeStringJsonCompatible(keyName),
                type: selectedType,
                arrayOf: arrayType,
                required: true
            });
            props.onSubmit(props.schema);
        } catch (error) {
            setErrorMessage(`${error}`)
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-opacity-50 z-50 backdrop-blur-xl flex items-center flex-col">
                <h2 className="font-bold text-lg">Add new item</h2>
                <input required className="border-2 rounded-sm p-2 w-50 mb-1" type="text" onChange={(e) => setKeyName(e.target.value)} value={keyName} placeholder="Type the key name here" />
                <div>
                    <label className="mr-2" htmlFor="type-selector">Select a type:</label>
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as AvailableTypes)} name="type-selector" id="type-selector" className="mb-1 secondary-color-bg">
                        {Object.values(AvailableTypes).sort().map((type) =>
                            <option key={type} className="secondary-color-bg text-white" value={type}>{type}</option>
                        )}
                    </select>
                </div>
                {selectedType === AvailableTypes.Array &&
                    <div>
                        <label className="mr-2" htmlFor="type-selector">Select an array type:</label>
                        <select value={selectedArrayType} onChange={(e) => setSelectedArrayType(e.target.value as AvailableTypes)} name="type-selector" id="type-selector" className="mb-1 secondary-color-bg">
                            {Object.values(AvailableTypes).sort().map((type) =>
                                type !== AvailableTypes.Array && <option key={type} className="secondary-color-bg text-white" value={type}>{type}</option>
                            )}
                        </select>
                    </div>
                }
                <button onClick={onClick} className="bg-blue-500 mt-5 mb-5 cursor-pointer text-white text-xl rounded-sm w-50">Add key</button>
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </div>
        </>
    )
}