import HomeView from "@/components/home/HomeView";
import TagService from "@/services/tag.service";

export default async function Home() {
    const tagsCloud = await TagService.getTagsCloud().then((res) => res.data);

    return <HomeView tagsCloud={tagsCloud} />;
}
