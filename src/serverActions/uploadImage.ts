"use server";
export default async function uploadImage(
    file: FormData,
): Promise<string | Error> {
    try {
        const fileData = file.get("file") as File;
        const fileName = `${Date.now()}.${fileData.type.split("/")[1]}`;
        await fetch("https://content.dropboxapi.com/2/files/upload", {
            method: "POST",
            body: fileData,
            headers: {
                Authorization: `Bearer ${process.env.DROPBOX_TOKEN}`,
                "Content-Type": "application/octet-stream",
                "Dropbox-API-Arg": JSON.stringify({
                    path: `/user-images/${fileName}`,
                }),
            },
        });
        const publicLink = await fetch(
            "https://api.dropboxapi.com/2/files/get_temporary_link",
            {
                method: "POST",
                body: JSON.stringify({ path: `/user-images/${fileName}` }),
                headers: {
                    Authorization: `Bearer ${process.env.DROPBOX_TOKEN}`,
                    "Content-Type": "application/json",
                },
            },
        ).then((res) => res.json());
        return publicLink.link;
    } catch (err) {
        return new Error();
    }
}
