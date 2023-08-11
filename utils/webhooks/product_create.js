const prodcutCreateHandler = async (topic, shop, webhookRequestBody, webhookId, apiVersion) => {
    try {
        const webhookBody = JSON.parse(webhookRequestBody);

        console.log("-------->> Product create webhook Called");

        console.log(webhookBody);
        
    } catch (e) {
        console.error(e);
    }
};

export default prodcutCreateHandler;