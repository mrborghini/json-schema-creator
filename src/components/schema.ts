import { AvailableTypes, Property } from "../types";

export class Schema {
    private properties: Property[] = [];

    public addKey(property: Property) {
        if (this.isDuplicate(property.name)) {
            throw new Error("Cannot have duplicate key names.")
        }
        this.properties.push({
            name: property.name,
            type: property.type,
            arrayOf: property.arrayOf,
            required: property.required
        });
    }

    public removeKey(name: string) {
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i].name === name) {
                this.properties.splice(i, 1);
                return;
            }
        }
    }

    public setRequired(name: string, required: boolean) {
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i].name === name) {
                this.properties[i].required = required;
                return;
            }
        }
    }

    public getProperties() {
        return this.properties;
    }

    public isDuplicate(name: string) {
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i].name === name) {
                return true;
            }
        }
        return false;
    }

    public convertToJson(ident: number) {
        let jsonString = "{\"type\":\"object\",\"properties\":{";
        for (let i = 0; i < this.properties.length; i++) {
            const property = this.properties[i];
            jsonString += `"${property.name}":`;
            if (property.type !== AvailableTypes.Array) {
                jsonString += `{"type": "${property.type}"}`;
            } else {
                jsonString += `{"type":"${property.type}","items":{"type":"${property.arrayOf}"}}`
            }

            if (i !== this.properties.length - 1) {
                jsonString += ","
            } else {
                jsonString += "},\"required\":["
                for (let j = 0; j < this.properties.length; j++) {
                    const property = this.properties[j];
                    if (!property.required) {
                        continue;
                    }
                    jsonString += `"${property.name}"`;

                    if (j !== this.properties.length - 1) {
                        jsonString += ",";
                    }
                }

                if (jsonString.endsWith(",")) {
                    jsonString = jsonString.substring(0, jsonString.length - 1);
                }
                jsonString += "]"
            }
        }
        jsonString += "}";

        if (jsonString.endsWith("{}")) {
            jsonString += "}";
        }

        try {
            const identedJson = JSON.stringify(JSON.parse(jsonString), null, ident)
            return identedJson;
        } catch (error) {
            throw new Error(`${jsonString} is not valid json`)
        }

    }
}