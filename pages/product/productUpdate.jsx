import { useEffect, useState } from "react";
import useFetch from "@/components/hooks/useFetch";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Card,
  Page,
  Layout,
  TextField,
  Box,
  HorizontalStack,
  Spinner,
} from "@shopify/polaris";

export default function productCreate() {
  const app = useAppBridge();
  const fetch = useFetch();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsloading] = useState(false);

  async function getProductInfo(ids) {
    var result = await fetch(`/api/product/getProduct?id=${ids[0]}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setTitle(result.data.title);
    setDescription(result.data.description);
    setId(result.data.id);
  }

  async function handleSubmit() {
    setIsloading(true);
    var result = await fetch(`/api/product/updateProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
      }),
    });
    result = await result.json();
    setDescription(result.data.product.descriptionHtml);
    setTitle(result.data.product.title);
    setIsloading(false);
  }

  useEffect(() => {
    const field = "id";
    const queryUrl = window.location.href;
    if (queryUrl.indexOf("?" + field + "=") != -1) {
      getProductInfo(queryUrl.split("id=").slice(-1));
    }
  }, []);

  return (
    <Page
      backAction={{
        content: "Products",
        url: "/product/productList",
      }}
      primaryAction={{
        content: "Update",
        onAction: () => {
          handleSubmit();
        },
      }}
      title="Create Product"
    >
      {!isLoading ? (
        <Layout>
          {/* left */}
          <Layout.Section oneHalf>
            <Card>
              <TextField
                label="Title"
                type=""
                value={title}
                onChange={(e) => setTitle(e)}
                autoComplete="off"
              />
              <br />
              <TextField
                label="Desctiption"
                type=""
                multiline={3}
                value={description}
                onChange={(e) => setDescription(e)}
                autoComplete="off"
              />
            </Card>
          </Layout.Section>
        </Layout>
      ) : (
        <Box padding="6">
          <HorizontalStack align="center" blockAlign="center">
            <Spinner accessibilityLabel="Spinner example" size="large" />
          </HorizontalStack>
        </Box>
      )}
    </Page>
  );
}
