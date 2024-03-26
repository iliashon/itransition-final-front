type TAttributeValue = {
    atr_id: number;
    type: "text" | "boolean" | "varchar" | "integer" | "date";
    value: Date | string | number | boolean;
    name: string;
};

export default TAttributeValue;
