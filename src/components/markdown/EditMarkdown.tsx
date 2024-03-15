import MarkdownEditor from "@uiw/react-markdown-editor";

export default function EditMarkdown({
    value,
    handleOnChange,
}: {
    value: string;
    handleOnChange: (value: string) => void;
}) {
    return (
        <MarkdownEditor
            visible={true}
            className="h-[73vh]"
            value={value}
            onChange={handleOnChange}
        />
    );
}
