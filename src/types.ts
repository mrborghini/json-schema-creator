export enum AvailableTypes {
    String = "string",
    Integer = "integer",
    Object = "object",
    Array = "array",
    Enum = "enum",
    AnyOf = "anyOf",
    Number = "number",
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