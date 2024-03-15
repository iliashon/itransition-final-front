"use client";

import MarkdownEditor from "@uiw/react-markdown-editor";

export default function PreviewMarkdown({ value }: { value: string }) {
    return (
        <MarkdownEditor.Markdown source={value} className="!bg-transparent" />
    );
}
