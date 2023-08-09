import withMiddleware from "@/utils/middleware/withMiddleware.js";
import clientProvider from "@/utils/clientProvider";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    console.log("Serve this only if the request method is GET");
    return res.status(401).send({ error: true });
  }

  const PRODUCT_LIST = `
        query products($first: Int){
            products(first: $first){
                nodes {
                    description
                    id
                    title
                    totalInventory
                    priceRangeV2 {
                      maxVariantPrice {
                        amount
                      }
                    }
                  }
            }
        }
    `;

  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: true,
    })

    const responce = await client.query({
      data: {
        query: PRODUCT_LIST,
        variables: {
          first: 70,
        },
      },
    });

    // const alignedResult = {
    //   id : responce.body.data.products.nodes.
    // }

    var resultNodes = []

    responce.body.data.products.nodes.map((data) => {
      resultNodes.push({
        id : data.id,
        description: data.description,
        title : data.title,
        totalInventory : data.totalInventory,
        price : data.priceRangeV2.maxVariantPrice.amount
      })
    })

    

    

    return res.status(200).send({ data: resultNodes });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ error: true });
  }
};

export default withMiddleware("verifyRequest")(handler);
