"use server";

export default async function uploadImage(file: FormData) {
    try {
        const fileData = file.get("file") as File;
        await fetch("https://content.dropboxapi.com/2/files/upload", {
            method: "POST",
            body: fileData,
            headers: {
                Authorization: `Bearer ${process.env.DROPBOX_TOKEN}`,
                "Content-Type": "application/octet-stream",
                "Dropbox-API-Arg": JSON.stringify({
                    path: `/user-images/${fileData.name}`,
                }),
            },
        }).then((res) => console.log(res));
    } catch (err) {
        console.log(err);
    }
}
