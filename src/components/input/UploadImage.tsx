import { IoCloudUploadOutline } from "react-icons/io5";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import uploadImage from "@/serverActions/uploadImage";
import { Alert } from "@material-tailwind/react";
import { MdErrorOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import TFolderName from "@/types/imageUpload/TFolderType";

const VALID_FORMAT_FILE = ["image/webp", "image/jpg", "image/png"];
const MAX_SIZE_FILE = 2097152;

export default function UploadImage({
    value,
    setImageUrl,
    folder_name,
}: {
    value: string | null;
    setImageUrl: (value: string) => void;
    folder_name: TFolderName;
}) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        if (event.target.files) {
            const file = event.target.files[0];
            if (!file) {
            } else if (!VALID_FORMAT_FILE.includes(file.type)) {
                setError("Invalid image type, acceptable: PNG, JPG, WEBP");
            } else if (file.size > MAX_SIZE_FILE) {
                setError("Maximum image size 2 MB");
            } else {
                setError(null);
                const fileFormData = new FormData();
                fileFormData.append("file", file);
                const publicImageUrl = await uploadImage(
                    fileFormData,
                    folder_name,
                );
                setImageUrl(publicImageUrl!);
            }
        } else {
            setError("Image not found");
        }
        setLoading(false);
    };

    return (
        <>
            <div
                className={`${error && "border-red-500 border-4 bg-red-500/20"} relative border border-dashed dark:border-white border-black/30 rounded h-56 flex flex-col gap-3 justify-center items-center`}
            >
                <input
                    type="file"
                    className="w-full h-full absolute opacity-0 cursor-pointer z-20"
                    onChange={handleSetImage}
                />
                <IoCloudUploadOutline className="h-10 w-10" />
                <div className="flex flex-col gap-1 items-center">
                    <span className="font-semibold">Drop image here</span>
                    <span className="text-sm text-gray-500">or</span>
                    <span className="font-semibold text-sm bg-black text-white py-2 px-4 rounded-lg dark:bg-white dark:text-black">
                        Choose File
                    </span>
                </div>
                <p className="text-sm text-gray-500 text-center">
                    Maximum upload file size: 2 MB <br />
                    PNG | JPG | WEBP
                </p>
                {value && (
                    <Image
                        src={value}
                        width={200}
                        height={300}
                        alt="upload image"
                        className="absolute bg-white w-full h-full object-contain z-10"
                    />
                )}
                {loading && (
                    <div className="absolute z-30 top-0 left-0 h-full w-full flex items-center justify-center bg-white/70">
                        <ClipLoader />
                    </div>
                )}
            </div>
            {error && (
                <Alert
                    icon={<MdErrorOutline className="h-5 w-5" />}
                    color="red"
                    className="h-9 text-[12px] -mt-3 py-0 flex items-center"
                >
                    {error}
                </Alert>
            )}
        </>
    );
}
