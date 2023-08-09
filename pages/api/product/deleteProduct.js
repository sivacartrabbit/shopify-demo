import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
  const DELETE_PRODUCT = `
    mutation productDelete($input: ProductDeleteInput!) {
        productDelete(input: $input) {
        	deletedProductId
      }
    }
    `;

  if (req.method === "DELETE") {
    try {
      const { client } = await clientProvider.graphqlClient({
        req,
        res,
        isOnline: true,
      });

      req.body.map(async (id) => {
        if (id) {
          await client.query({
            data: {
              query: DELETE_PRODUCT,
              variables: {
                input: {
                  id: id,
                },
              },
            },
          });
        }
      });

      return res.status(200).send({ result: "success" });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).send({ result: false });
  }
};

export default withMiddleware("verifyRequest")(handler);
