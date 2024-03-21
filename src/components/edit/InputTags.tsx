import { WithContext, Tag } from "react-tag-input";
import { useEffect, useState } from "react";
import TagService from "@/services/tag.service";
import { TiDeleteOutline } from "react-icons/ti";

export default function InputTags({
    setTags,
    tags,
}: {
    setTags: (value: Tag[]) => void;
    tags: Tag[] | undefined;
}) {
    const [suggestions, setSuggestions] = useState<Tag[]>([]);

    const [selected, setSelected] = useState<Tag[]>(tags || []);

    const handleDelete = (i: number) => {
        setSelected(selected.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag: Tag) => {
        if (!suggestions.find((item) => tag.text === item.text)) {
            tag.id = "";
        }
        setSelected([...selected, tag]);
    };

    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
        const newTags = selected.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setSelected(newTags);
    };

    useEffect(() => {
        TagService.getAll().then((res) => {
            setSuggestions(
                res.data.map((tag) => {
                    return {
                        id: tag.id.toString(),
                        text: tag.text,
                    };
                }),
            );
        });
    }, []);

    useEffect(() => {
        setTags(selected);
    }, [selected]);

    return (
        <div className="">
            <WithContext
                tags={selected}
                minQueryLength={1}
                suggestions={suggestions}
                handleAddition={handleAddition}
                handleDelete={handleDelete}
                handleDrag={handleDrag}
                autocomplete
                inputFieldPosition="top"
                classNames={{
                    tag: "border dark:border-white/50 border-black rounded-lg flex gap-2 items-center px-2",
                    remove: "text-2xl opacity-50 hover:opacity-100 duration-200",
                    tagInput:
                        "border dark:border-white border-black/30 h-10 mb-3 rounded overflow-hidden",
                    tagInputField:
                        "w-full h-full px-2 py-1 focus:outline-none bg-transparent",
                    selected: "flex flex-wrap gap-2",
                }}
            />
        </div>
    );
}
