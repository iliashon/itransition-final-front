import { IoCloudUploadOutline } from "react-icons/io5";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

const VALID_FORMAT_FILE = ["image/webp", "image/jpg", "image/png"];
const MAX_SIZE_FILE = 2097152;

export default function UploadImage() {
    const [image, setImage] = useState<string | undefined>();
    const [isError, setIsError] = useState<boolean>(false);

    const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            console.log(file.size);
            if (
                !VALID_FORMAT_FILE.includes(file.type) ||
                file.size > MAX_SIZE_FILE
            ) {
                setIsError(true);
            } else {
                setIsError(false);
                setImage(URL.createObjectURL(file));
            }
        } else {
            setIsError(true);
        }
    };

    return (
        <div
            className={`${isError && "border-red-500 border-4 bg-red-500/20"} relative border border-dashed dark:border-white border-black/30 rounded h-56 flex flex-col gap-3 justify-center items-center`}
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
                <span className="font-semibold text-sm bg-black text-white py-2 px-4 rounded-lg">
                    Choose File
                </span>
            </div>
            <p className="text-sm text-gray-500 text-center">
                Maximum upload file size: 2 MB <br />
                PNG | JPG | WEBP
            </p>
            {image && (
                <Image
                    src={image}
                    width={100}
                    height={100}
                    alt="upload image"
                    className="absolute bg-white w-full h-full object-contain z-10"
                />
            )}
        </div>
    );
}
