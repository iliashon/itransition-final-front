type TAttributeValue = {
    atr_id: number;
    type: "text" | "boolean" | "varchar" | "integer" | "date";
    value: Date | string | number | boolean | undefined;
    name: string;
    require: boolean;
};

export default TAttributeValue;
