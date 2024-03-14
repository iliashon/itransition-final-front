import MarkdownEditor from "@uiw/react-markdown-editor";

export default function EditMarkdown({
    value,
    setValue,
}: {
    value: string;
    setValue: (value: string) => void;
}) {
    return (
        <MarkdownEditor
            visible={true}
            className="h-[73vh]"
            value={value}
            onChange={setValue}
        />
    );
}
