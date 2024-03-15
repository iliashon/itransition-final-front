export default function CollectionPreview({
    params,
}: {
    params: { id: string };
}) {
    return <div>Collection edit id: {params.id}</div>;
}
