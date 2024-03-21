import { useRouter } from "next/navigation";

export default function redirectRefresh(path: string) {
    const router = useRouter();
    router.push(path);
    router.refresh();
}
