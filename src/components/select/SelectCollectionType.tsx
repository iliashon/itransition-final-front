import { Option, Select } from "@material-tailwind/react";
import TCollectionType from "@/types/collection/TCollectionType";
import { useEffect, useState } from "react";
import CollectionService from "@/services/collection.service";

export default function SelectCollectionType({
    value,
    setValue,
}: {
    value: string | undefined;
    setValue: (value: string) => void;
}) {
    const [collectionTypes, setCollectionTypes] = useState<TCollectionType[]>();

    useEffect(() => {
        CollectionService.getAllType().then((res) =>
            setCollectionTypes(res.data),
        );
    }, []);

    return (
        <>
            {collectionTypes && (
                <Select
                    label="Collection type"
                    className="dark:text-white"
                    labelProps={{
                        className: "dark:text-white",
                    }}
                    color="gray"
                    value={value}
                    onChange={(value) => setValue(value!)}
                >
                    {collectionTypes.map((type) => {
                        return (
                            <Option key={type.id} value={type.name}>
                                {type.name}
                            </Option>
                        );
                    })}
                </Select>
            )}
        </>
    );
}
