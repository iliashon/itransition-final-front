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

    return (
        <div>
            <h2 className="text-base font-semibold text-gray-900 mb-5">
                Attributes:
            </h2>
            <ul className="flex flex-col gap-5">
                {state.attributes.map((atr, index) => {
                    switch (atr.type) {
                        case "boolean":
                            return (
                                <>
                                    <hr />
                                    <label
                                        className="grid grid-cols-3 text-sm font-medium text-gray-900"
                                        key={atr.atr_id}
                                    >
                                        {atr.require ? (
                                            <div>
                                                {atr.name}
                                                <span className="text-red-500 text-lg">
                                                    *
                                                </span>
                                            </div>
                                        ) : (
                                            atr.name
                                        )}
                                        <Checkbox
                                            className="col-span-2"
                                            checked={
                                                atr.value === undefined
                                                    ? undefined
                                                    : !!atr.value
                                            }
                                            onChange={(event) =>
                                                handleSetValue(
                                                    index,
                                                    event.target.checked,
                                                )
                                            }
                                        />
                                    </label>
                                </>
                            );
                        case "text":
                            return (
                                <>
                                    <hr />
                                    <label
                                        className="grid grid-cols-3 text-sm font-medium text-gray-900"
                                        key={atr.atr_id}
                                    >
                                        {atr.require ? (
                                            <div>
                                                {atr.name}
                                                <span className="text-red-500 text-lg">
                                                    *
                                                </span>
                                            </div>
                                        ) : (
                                            atr.name
                                        )}
                                        <textarea
                                            placeholder="Text"
                                            className="col-span-2 h-40 resize-none border focus:outline-none p-3 text-sm dark:border-white border-black/30 bg-transparent rounded"
                                            value={atr.value as string}
                                            onChange={(event) =>
                                                handleSetValue(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </label>
                                </>
                            );
                        case "integer":
                            return (
                                <>
                                    <hr />
                                    <label
                                        className="grid grid-cols-3 text-sm font-medium text-gray-900"
                                        key={atr.atr_id}
                                    >
                                        {atr.require ? (
                                            <div>
                                                {atr.name}
                                                <span className="text-red-500 text-lg">
                                                    *
                                                </span>
                                            </div>
                                        ) : (
                                            atr.name
                                        )}
                                        <input
                                            placeholder="Number"
                                            type="number"
                                            className="col-span-2 border dark:border-white border-black/30 bg-transparent rounded w-full px-3 py-2 focus:outline-none"
                                            value={atr.value as string}
                                            onChange={(event) =>
                                                handleSetValue(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </label>
                                </>
                            );
                        case "varchar":
                            return (
                                <>
                                    <hr />
                                    <label
                                        className="grid grid-cols-3 text-sm font-medium text-gray-900"
                                        key={atr.atr_id}
                                    >
                                        {atr.require ? (
                                            <div>
                                                {atr.name}
                                                <span className="text-red-500 text-lg">
                                                    *
                                                </span>
                                            </div>
                                        ) : (
                                            atr.name
                                        )}
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            className="col-span-2 border dark:border-white border-black/30 bg-transparent rounded w-full px-3 py-2 focus:outline-none"
                                            value={atr.value as string}
                                            onChange={(event) =>
                                                handleSetValue(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </label>
                                </>
                            );
                        case "date":
                            return (
                                <>
                                    <hr />
                                    <label
                                        className="grid grid-cols-3 text-sm font-medium text-gray-900"
                                        key={atr.atr_id}
                                    >
                                        {atr.require ? (
                                            <div>
                                                {atr.name}
                                                <span className="text-red-500 text-lg">
                                                    *
                                                </span>
                                            </div>
                                        ) : (
                                            atr.name
                                        )}
                                        <input
                                            type="date"
                                            className="col-span-2 border dark:border-white border-black/30 bg-transparent rounded w-full px-3 py-2 focus:outline-none"
                                            value={atr.value as string}
                                            onChange={(event) =>
                                                handleSetValue(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </label>
                                </>
                            );
                    }
                })}
            </ul>
        </div>
    );
}
