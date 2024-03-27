import TReadAttributes from "@/types/item/TReadAttributes";

export default function AttributesView({
    attributes,
}: {
    attributes: TReadAttributes[];
}) {
    return (
        <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900 mb-5">
                {attributes.length > 0 && "Attributes"}
            </h2>
            <ul className="flex flex-col gap-5">
                {attributes.map((atr) => {
                    switch (atr.type) {
                        case "text":
                            return (
                                <>
                                    <hr />
                                    <li
                                        className="grid grid-cols-3"
                                        key={atr.id}
                                    >
                                        <h4 className="text-sm font-medium leading-6 text-gray-900">
                                            {atr.name}
                                        </h4>
                                        <p className="col-span-2 text-sm text-gray-700 overflow-hidden">
                                            {atr.value.toString()}
                                        </p>
                                    </li>
                                </>
                            );
                        case "boolean":
                            return (
                                <>
                                    <hr />
                                    <li
                                        className="grid grid-cols-3"
                                        key={atr.id}
                                    >
                                        <h4 className="text-sm font-medium leading-6 text-gray-900">
                                            {atr.name}
                                        </h4>
                                        <p className="col-span-2 text-sm text-gray-700">
                                            {atr.value ? "Yes" : "No"}
                                        </p>
                                    </li>
                                </>
                            );
                        case "integer":
                            return (
                                <>
                                    <hr />
                                    <li
                                        className="grid grid-cols-3"
                                        key={atr.id}
                                    >
                                        <h4 className="text-sm font-medium leading-6 text-gray-900">
                                            {atr.name}
                                        </h4>
                                        <p className="col-span-2 text-sm text-gray-700">
                                            {atr.value.toString()}
                                        </p>
                                    </li>
                                </>
                            );
                        case "date":
                            return (
                                <>
                                    <hr />
                                    <li
                                        className="grid grid-cols-3"
                                        key={atr.id}
                                    >
                                        <h4 className="text-sm font-medium leading-6 text-gray-900">
                                            {atr.name}
                                        </h4>
                                        <p className="col-span-2 text-sm text-gray-700">
                                            {new Date(
                                                atr.value.toString(),
                                            ).toLocaleString("en-GB", {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </li>
                                </>
                            );
                        case "varchar":
                            return (
                                <>
                                    <hr />
                                    <li
                                        className="grid grid-cols-3"
                                        key={atr.id}
                                    >
                                        <h4 className="text-sm font-medium leading-6 text-gray-900">
                                            {atr.name}
                                        </h4>
                                        <p className="col-span-2 text-sm text-gray-700">
                                            {atr.value.toString()}
                                        </p>
                                    </li>
                                </>
                            );
                    }
                })}
            </ul>
        </div>
    );
}
