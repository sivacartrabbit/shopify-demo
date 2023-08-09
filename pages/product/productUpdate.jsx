import { useCallback, useEffect, useState } from "react";
import useFetch from "@/components/hooks/useFetch";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouter } from "next/navigation";
import {
  Card,
  Page,
  Layout,
  TextField,
  Select,
  FormLayout,
} from "@shopify/polaris";

export default function productCreate() {
  const app = useAppBridge();
  const fetch = useFetch();
  const router = useRouter();

  const [id, setId] = useState('')
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  async function getProductInfo(ids) {
    var result = await fetch(`/api/product/getProduct?id=${ids[0]}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result.data);
    setTitle(result.data.title);
    setDescription(result.data.description);
    setId(result.data.id)
  }

  async function handleSubmit() {
    await fetch(`/api/product/updateProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id : id,
        title : title,
        description : description,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.error(e));
  }

  const handleQuantityInput = useCallback((newValue) => {
    if (!isNaN(newValue) && newValue >= 0) {
      const val = newValue.replace(/^0+/, "");
      setQuantity(val);
    }
  });

  const handlePriceInput = useCallback((newValue) => {
    if (!isNaN(newValue) && newValue >= 0) {
      const val = newValue.replace(/^0+/, "");
      setPrice(val);
    }
  });

  const handleStatusChange = useCallback(
    (value) => setStatus(Number(value)),
    []
  );

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
        url: "/products",
        onAction: () => {
          router.back();
        },
      }}
      primaryAction={{
        content: "Update",
        onAction: () => {
          handleSubmit();
        },
      }}
      title="Create Product"
    >
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
    </Page>
  );
}
