export enum AvailableTypes {
    String = "string",
    Integer = "integer",
    Number = "number",
    // Object = "object",
    Array = "array",
    // Enum = "enum",
    AnyOf = "anyOf",
    Boolean = "boolean",
}

export interface Property {
    name: string,
    type: AvailableTypes,
    arrayOf: AvailableTypes | null,
    required: boolean
}

export interface Object {
    properties: Property[]
}