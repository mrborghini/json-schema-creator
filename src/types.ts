export enum AvailableTypes {
    String = "string",
    Integer = "integer",
    Object = "object",
    Array = "array",
    Enum = "enum",
    AnyOf = "anyOf",
}

export interface Property {
    name: string,
    type: AvailableTypes
}

export interface Object {
    properties: Property[]
}