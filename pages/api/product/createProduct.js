import withMiddleware from "@/utils/middleware/withMiddleware.js";
import clientProvider from "@/utils/clientProvider";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    //GET, POST, PUT, DELETE
    console.log("Serve this only if the request method is POST");
    return res.status(401).send({ error: true });
  }

  const CREATE_PRODUCT = `mutation productCreate($input:ProductInput!)  {
        productCreate(input:$input) {
          product {
            id
          }
        }
      }`;

  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: true,
    });

    const { title, description, price, quantity, status } = req.body

    const result = await client.query({
      data: {
        query: CREATE_PRODUCT,
        variables: {
          input: {
            title: title,
            descriptionHtml: description,
            status: status,
            variants: [
              {
                compareAtPrice: Number(price) + (Number(price) / 100) * 15,
                price: price,
                title: "Varitent1",
                inventoryQuantities: {
                  availableQuantity: Number(quantity),
                  locationId : 'gid://shopify/Location/89494192449'
                },
              },
            ],
          },
        },
      },
    });

    return res.status(200).send({ text: "Success!", data: result });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ error: true });
  }
};

export default withMiddleware("verifyRequest")(handler);
