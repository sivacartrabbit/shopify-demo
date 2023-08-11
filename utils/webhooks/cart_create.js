const cartCreateHandler = async (topic, shop, webhookRequestBody) => {
    try {
        const webhookBody = JSON.parse(webhookRequestBody);
        
        console.log("------>> Cart Create WebHook Works");

        console.log(webhookBody);
    } catch (e) {
        console.error(e);
    }
};

export default cartCreateHandler;