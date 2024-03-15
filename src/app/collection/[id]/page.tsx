export default function CollectionPreview({
    params,
}: {
    params: { id: string };
}) {
    return <div>Collection preview id: {params.id}</div>;
}
