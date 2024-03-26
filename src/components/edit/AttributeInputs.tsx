import { Checkbox } from "@material-tailwind/react";
import TCreateItemData from "@/types/item/TCreateItemData";
import { Dispatch, SetStateAction } from "react";

export default function AttributeInputs({
    state,
    setState,
}: {
    state: TCreateItemData;
    setState: Dispatch<SetStateAction<TCreateItemData>>;
}) {
    const handleSetValue = (
        index: number,
        value: string | boolean | number | Date,
    ) => {
        const newAtr = [...state.attributes];
        newAtr[index].value = value;
        setState({
            ...state,
            attributes: newAtr,
        });
    };

    const handleSetBoolean = (index: number, value: boolean) => {
        const newAtr = [...state.attributes];
        newAtr[index].value = value;
        setState({
            ...state,
            attributes: newAtr,
        });
    };

    return (
        <div>
            <h2 className="font-semibold text-xl">Attributes:</h2>
            <ul className="flex flex-col gap-3 items-start">
                {state.attributes.map((atr, index) => {
                    switch (atr.type) {
                        case "boolean":
                            return (
                                <label
                                    className="flex items-center"
                                    key={atr.atr_id}
                                >
                                    {atr.name}
                                    <Checkbox
                                        checked={!!atr.value}
                                        onChange={(event) =>
                                            handleSetValue(
                                                index,
                                                event.target.checked,
                                            )
                                        }
                                    />
                                </label>
                            );
                        case "text":
                            return (
                                <label
                                    className="flex flex-col w-full"
                                    key={atr.atr_id}
                                >
                                    {atr.name}
                                    <textarea
                                        placeholder="Text"
                                        className="h-40 resize-none border focus:outline-none p-3 text-sm dark:border-white border-black/30 bg-transparent rounded"
                                        value={atr.value as string}
                                        onChange={(event) =>
                                            handleSetValue(
                                                index,
                                                event.target.value,
                                            )
                                        }
                                    />
                                </label>
                            );
                        case "integer":
                            return (
                                <label
                                    className="flex flex-col w-full"
                                    key={atr.atr_id}
                                >
                                    {atr.name}
                                    <input
                                        placeholder="Number"
                                        type="number"
                                        className="border dark:border-white border-black/30 bg-transparent rounded w-full px-3 py-2 focus:outline-none"
                                        value={Number(atr.value)}
                                        onChange={(event) =>
                                            handleSetValue(
                                                index,
                                                event.target.value,
                                            )
                                        }
                                    />
                                </label>
                            );
                        case "varchar":
                            return (
                                <label
                                    className="flex flex-col w-full"
                                    key={atr.atr_id}
                                >
                                    {atr.name}
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        className="border dark:border-white border-black/30 bg-transparent rounded w-full px-3 py-2 focus:outline-none"
                                        value={atr.value as string}
                                        onChange={(event) =>
                                            handleSetValue(
                                                index,
                                                event.target.value,
                                            )
                                        }
                                    />
                                </label>
                            );
                        case "date":
                            return (
                                <label
                                    className="flex flex-col w-full"
                                    key={atr.atr_id}
                                >
                                    {atr.name}
                                    <input
                                        type="date"
                                        className="border dark:border-white border-black/30 bg-transparent rounded w-full px-3 py-2 focus:outline-none"
                                        value={atr.value as string}
                                        onChange={(event) =>
                                            handleSetValue(
                                                index,
                                                event.target.value,
                                            )
                                        }
                                    />
                                </label>
                            );
                    }
                })}
            </ul>
        </div>
    );
}
