type TReadAttributes = {
    id: number;
    name: string;
    value: string | boolean | Date | number;
    atr_id: number;
    type: "text" | "boolean" | "varchar" | "integer" | "date";
};

export default TReadAttributes;
