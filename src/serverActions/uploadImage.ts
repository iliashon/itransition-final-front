"use server";
import TFolderName from "@/types/imageUpload/TFolderType";

export default async function uploadImage(
    data: FormData,
    folder_name: TFolderName,
): Promise<string | null> {
    try {
        data.append("upload_preset", process.env.CLOUDINARY_PRESET!);
        data.append("folder", folder_name);
        data.append("public_id", Date.now().toString());
        const { url } = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: data,
            },
        ).then((res) => res.json());
        return url;
    } catch (err) {
        return null;
    }
}
