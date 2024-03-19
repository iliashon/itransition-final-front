type TCommentList = {
    id: number;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        image_url: string | null;
    };
    text: string;
    item_id: number;
    created_at: string;
};

export default TCommentList;
