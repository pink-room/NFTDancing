export default (data: string) => {
    return (encodeURI(data).split(/%..|./).length - 1) / 1048576;
};
