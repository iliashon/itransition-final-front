type TAttributeData = {
    id: number;
    name: string;
    type: "text" | "boolean" | "varchar" | "integer" | "date";
    require: boolean;
    is_show_on_grid: boolean;
};

export type TCreateAttributeData = {
    name: string;
    type: TTypeAtr;
    require: boolean;
    is_show_on_grid: boolean;
};

export type TTypeAtr =
    | "text"
    | "boolean"
    | "varchar"
    | "integer"
    | "date"
    | undefined;

export default TAttributeData;
