export default function SkeletonLoadingHome() {
    return (
        <div className="px-0 h-[600px] lg:px-10 pt-10 grid lg:grid-cols-3 lg:grid-rows-2 grid-cols-1 gap-5 animate-pulse">
            <div className="row-span-2 h-60 lg:h-full w-full overflow-hidden relative rounded-lg bg-gray-300"></div>
            <div className="h-60 lg:h-full w-full rounded-lg bg-gray-300"></div>
            <div className="h-60 lg:h-full w-full rounded-lg bg-gray-300"></div>
            <div className="h-60 lg:h-full w-full rounded-lg bg-gray-300"></div>
            <div className="h-60 lg:h-full w-full rounded-lg bg-gray-300"></div>
        </div>
    );
}
