import { useState } from "react";
import { Schema } from "./schema";
import { Property } from "../types";
import { CreateOverlay } from "./CreateOverlay";

interface Props {
    schema: Schema,
    onUpdate: (schema: Schema) => void,
}

export function KeyCreator(props: Props) {
    const [properties, setProperties] = useState<Property[]>(props.schema.getProperties());
    const [overlayVisible, setOverlayVisibility] = useState<boolean>(false);
    const [schema, setSchema] = useState<Schema>(props.schema);

    function updateSchema() {
        props.onUpdate(schema);
        setProperties(schema.getProperties());
    }

    function toggleCheckBox(key: string, checked: boolean) {
        schema.setRequired(key, checked);
        updateSchema();
    }

    function onCreate(newSchema: Schema) {
        setSchema(newSchema);
        updateSchema();
        setOverlayVisibility(false);
    }

    function deleteKey(keyname: string) {
        schema.removeKey(keyname);
        updateSchema();
    }

    return (
        <>
            <div className="flex flex-col m-5 items-center">
                <div className="secondary-color-bg rounded-sm mb-1 select-none w-80 sm:w-100">
                    {properties.map((property) =>
                        <div className="flex text-sm md:text-lg relative p-3" key={property.name}>
                            <button onClick={() => deleteKey(property.name)} className="text-red-500 font-bold text-sm cursor-pointer absolute top-0 left-0">X</button>
                            <h3 className="font-bold mr-1">{property.name}</h3>
                            <p className="text-blue-400 mr-1">type </p>
                            {property.arrayOf ? (
                                <p className="mr-25">
                                    <span className="text-green-400 mr-1">{property.arrayOf}</span>
                                    <span className="text-red-400">{property.type}</span></p>
                            ) : (
                                <p className="text-green-400 mr-25">{property.type}</p>
                            )}

                            <p className="absolute right-0 mr-1">
                                <span className="font-bold m-1">required</span>
                                <input className="cursor-pointer" onChange={(e) => toggleCheckBox(property.name, e.target.checked)} type="checkbox" defaultChecked={property.required}></input>
                            </p>
                        </div>
                    )}
                </div>
                <button className="bg-blue-500 rounded-sm text-white p-3 text-xl cursor-pointer w-80 sm:w-100" onClick={() => setOverlayVisibility(true)}>Add new key</button>
            </div>
            {overlayVisible && <CreateOverlay schema={props.schema} onSubmit={onCreate}></CreateOverlay>}
        </>
    );
}