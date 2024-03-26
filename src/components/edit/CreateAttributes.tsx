import {
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemSuffix,
    Option,
    Select,
} from "@material-tailwind/react";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { TTypeAtr } from "@/types/collection/TAttributeData";
import TCreateCollectionData from "@/types/collection/TCreateCollectionData";

export default function CreateAttributes({
    state,
    setState,
}: {
    state: TCreateCollectionData;
    setState: Dispatch<SetStateAction<TCreateCollectionData>>;
}) {
    const handleAddAttribute = () => {
        setState({
            ...state,
            attributes: state.attributes.concat({
                name: "",
                require: false,
                is_show_on_grid: false,
                type: undefined,
            }),
        });
    };

    const handleSetValue = (index: number, name: string) => {
        const newAtr = [...state.attributes];
        newAtr[index].name = name;
        setState({
            ...state,
            attributes: newAtr,
        });
    };

    const handleSetType = (index: number, type: TTypeAtr) => {
        const newAtr = [...state.attributes];
        newAtr[index].type = type;
        setState({
            ...state,
            attributes: newAtr,
        });
    };

    const handleSetRequire = (index: number, value: boolean) => {
        const newAtr = [...state.attributes];
        newAtr[index].require = value;
        setState({
            ...state,
            attributes: newAtr,
        });
    };

    const handleSetIsShowOnGrid = (index: number, value: boolean) => {
        const newAtr = [...state.attributes];
        newAtr[index].is_show_on_grid = value;
        setState({
            ...state,
            attributes: newAtr,
        });
    };

    const handleDeleteAttribute = (index: number) => {
        const newAtr = [...state.attributes];
        newAtr.splice(index, 1);
        setState({
            ...state,
            attributes: newAtr,
        });
    };

    return (
        <Card>
            <CardHeader
                floated={false}
                shadow={false}
                className="flex justify-between items-center gap-3 z-20"
            >
                <span className="font-semibold">Attributes</span>
                <FaCirclePlus
                    onClick={handleAddAttribute}
                    className="h-7 w-7 cursor-pointer text-green-500 opacity-50 hover:opacity-100 duration-300"
                />
            </CardHeader>
            <CardBody className="p-0">
                <List className="h-80 overflow-scroll">
                    {state.attributes.map((atr, index) => {
                        return (
                            <ListItem
                                key={atr.name}
                                className="flex flex-col gap-3 !overflow-visible"
                                ripple={false}
                            >
                                <div className="flex justify-between w-full gap-3">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="h-full focus:outline-none px-3 border-b dark:border-b-white/30 border-b-black/30 bg-transparent"
                                        value={atr.name}
                                        onChange={(event) => {
                                            handleSetValue(
                                                index,
                                                event.target.value,
                                            );
                                        }}
                                    />
                                    <Select
                                        variant="static"
                                        label="Select type"
                                        className="!min-w-[100px]"
                                        containerProps={{
                                            className: "min-w-[100px]",
                                        }}
                                        value={atr.type}
                                        onChange={(value) =>
                                            handleSetType(
                                                index,
                                                value as TTypeAtr,
                                            )
                                        }
                                    >
                                        <Option value="text">Text</Option>
                                        <Option value="boolean">Boolean</Option>
                                        <Option value="varchar">
                                            VarChar 256
                                        </Option>
                                        <Option value="integer">Integer</Option>
                                        <Option value="date">Date</Option>
                                    </Select>
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="flex gap-4">
                                        <label
                                            htmlFor="require-checkbox"
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            Require
                                            <Checkbox
                                                id="require-checkbox"
                                                ripple={false}
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                    className: "p-0",
                                                }}
                                                onChange={(event) =>
                                                    handleSetRequire(
                                                        index,
                                                        event.target.checked,
                                                    )
                                                }
                                                checked={atr.require}
                                            />
                                        </label>
                                        <label
                                            htmlFor="show-grid-checkbox"
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            Show on table
                                            <Checkbox
                                                id="show-grid-checkbox"
                                                ripple={false}
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                    className: "p-0",
                                                }}
                                                checked={atr.is_show_on_grid}
                                                onChange={(event) =>
                                                    handleSetIsShowOnGrid(
                                                        index,
                                                        event.target.checked,
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                    <ListItemSuffix>
                                        <IconButton
                                            variant="text"
                                            className="group"
                                            onClick={() =>
                                                handleDeleteAttribute(index)
                                            }
                                        >
                                            <MdDelete className="h-6 w-6 opacity-50 text-red-500 group-hover:opacity-100 duration-300" />
                                        </IconButton>
                                    </ListItemSuffix>
                                </div>
                            </ListItem>
                        );
                    })}
                </List>
            </CardBody>
        </Card>
    );
}
