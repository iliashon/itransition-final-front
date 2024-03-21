import { Tag } from "react-tag-input";
import Link from "next/link";

export default function TagsView({ tags }: { tags: Tag[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => {
                return (
                    <Link
                        key={tag.id}
                        href={`?tag=${tag.text}`}
                        className="border dark:border-white/50 border-black/50 rounded-lg px-2"
                    >
                        #{tag.text}
                    </Link>
                );
            })}
        </div>
    );
}
