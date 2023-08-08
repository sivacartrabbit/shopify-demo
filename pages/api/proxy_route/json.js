import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
  const { client } = await clientProvider.offline.graphqlClient({
    shop: req.user_shop,
  });
  res.status(200).send({ content: "Proxy Be Working" });
};

export default withMiddleware("verifyProxy")(handler);
