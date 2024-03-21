import { Avatar as AvatarMTR } from "@material-tailwind/react";

export default function Avatar({
    image_url,
    fullName,
}: {
    image_url: string | null;
    fullName: {
        firstName: string;
        lastName: string;
    };
}) {
    if (!image_url) {
        return (
            <div className="rounded-full flex-shrink-0 border dark:border-white/70 border-black/30 h-10 w-10 text-sm flex items-center justify-center">
                {`${fullName.firstName.slice(0, 1)}${fullName.lastName.slice(0, 1)}`}
            </div>
        );
    } else {
        return <AvatarMTR src={image_url} className="w-10" />;
    }
}
