import { useState } from "react";
import { Schema } from "./schema";
import { Property } from "../types";

interface Props {
    schema: Schema,
    onUpdate: (schema: Schema) => void,
}

export function KeyCreator(props: Props) {
    const [properties, setProperties] = useState<Property[]>(props.schema.getProperties());

    function toggleCheckBox(key: string, checked: boolean) {
        console.log(checked);
        props.schema.setRequired(key, checked);
        props.onUpdate(props.schema);
        setProperties(props.schema.getProperties())
    }

    return (
        <>
            <div className="flex flex-col m-5 items-center">
                <div className="secondary-color-bg rounded-sm mb-1 select-none w-80 sm:w-100">
                    {properties.map((property) =>
                        <div className="flex text-lg relative p-2" key={property.name}>
                            <h3 className="font-bold mr-1">{property.name}</h3>

                            <p className="text-blue-400 mr-1">type </p>
                            {property.arrayOf ? (
                                <p className="mr-25"><span className="text-red-400">{property.type}</span> of <span className="text-green-400">{property.arrayOf}</span></p>
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
                <button className="bg-blue-500 rounded-sm text-white text-xl cursor-pointer w-80 sm:w-100">Add new key</button>
            </div>
        </>
    );
}