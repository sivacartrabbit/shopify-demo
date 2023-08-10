import withMiddleware from "@/utils/middleware/withMiddleware.js";
import clientProvider from "@/utils/clientProvider";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    //GET, POST, PUT, DELETE
    console.log("Serve this only if the request method is POST");
    return res.status(401).send({ error: true });
  }

  try {
    const UPDATE_PRODUCT = `mutation productUpdate($input: ProductInput!) {
            productUpdate(input: $input) {
              product{
                id
                title
                descriptionHtml
              }
             
            }
          }`;

    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: true,
    });

    const result = await client.query({
      data: {
        query: UPDATE_PRODUCT,
        variables: {
          input: {
            id: req.body.id,
            title: req.body.title,
            descriptionHtml: req.body.description,
          },
        },
      },
    });

    console.log(result);

    return res.status(200).send({ data: result });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ error: "error" });
  }
};

export default withMiddleware("verifyRequest")(handler);
