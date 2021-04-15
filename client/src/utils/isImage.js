const isImage = (mediaUrl) => {
    const fileExt = mediaUrl.split(".").pop().toLowerCase();
    if (["mp4", "mov"].includes(fileExt)) {
        return false;
    }
    return true;
};

export default isImage;