import HomeView from "@/components/home/HomeView";
import TagService from "@/services/tag.service";
import CollectionService from "@/services/collection.service";
import ItemService from "@/services/item.service";

export default async function Home() {
    const tagsCloud = await TagService.getTagsCloud().then((res) => res.data);
    const topCollection = await CollectionService.getTop().then(
        (res) => res.data,
    );
    const lastItems = await ItemService.getLastItems().then((res) => res.data);

    return (
        <HomeView
            tagsCloud={tagsCloud}
            lastItems={lastItems}
            topCollection={topCollection}
        />
    );
}
