import { WithContext, Tag } from "react-tag-input";
import { useEffect, useState } from "react";
import TagService from "@/services/tag.service";

export default function Tags({
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
        <div>
            <WithContext
                tags={selected}
                minQueryLength={1}
                suggestions={suggestions}
                handleAddition={handleAddition}
                handleDelete={handleDelete}
                autocomplete={true}
            />
        </div>
    );
}
