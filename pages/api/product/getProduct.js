import withMiddleware from "@/utils/middleware/withMiddleware.js";
import clientProvider from "@/utils/clientProvider";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    //GET, POST, PUT, DELETE
    console.log("Serve this only if the request method is GET");
    return res.status(401).send({ error: true });
  }

  try {
    const GET_PRODUCT = `query product($id : ID!) {
            product(id: $id) {
              title
              description
              onlineStoreUrl
            }
          }`;

    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: true,
    });
    console.log(req.query);

    const product = await client.query({
      data: {
        query: GET_PRODUCT,
        variables: {
          id: `gid://shopify/Product/${req.query.id}`,
        },
      },
    });

    //console.log(product.body.data.product);

    return res.status(200).send({ data: product });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ error: e });
  }
};

export default withMiddleware("verifyRequest")(handler);
