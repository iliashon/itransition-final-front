const style = {
    grid_item:
        "border h-32 rounded-2xl dark:border-white/30 border-black/30 shadow",
};

export default function BasicIndicators() {
    return (
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className={style.grid_item}></div>
            <div className={style.grid_item}></div>
            <div className={style.grid_item}></div>
            <div className={style.grid_item}></div>
        </div>
    );
}
