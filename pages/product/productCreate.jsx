import { useCallback, useState } from "react";
import useFetch from "@/components/hooks/useFetch";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouter } from "next/navigation";
import {
  Card,
  Page,
  Layout,
  TextField,
  Select,
  PageActions,
  DropZone,
  FormLayout,
} from "@shopify/polaris";

export default function productCreate() {
  const app = useAppBridge();
  const fetch = useFetch();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("ACTIVE");

  const statusOptios = [
    { label: "Active (Default)", value: "ACTIVE" },
    { label: "InActive", value: "ARCHIVED," },
  ];

  const handleStatusChange = useCallback(
    (value) => setStatus(Number(value)),
    []
  );

  async function handleSubmit() {
    await fetch(`/api/product/createProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price,
        quantity,
        status
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
        content: "Save",
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

          <br />
          <Card>
            <FormLayout>
              <FormLayout.Group condensed>
                <TextField
                  label="Price"
                  value={price}
                  onChange={handlePriceInput}
                />
                <TextField
                  label="Quantity"
                  value={quantity}
                  onChange={handleQuantityInput}
                />
              </FormLayout.Group>
            </FormLayout>
          </Card>
        </Layout.Section>

        {/* right  */}
        <Layout.Section oneHalf>
          <Card>
            <Select
              label="Status"
              options={statusOptios}
              onChange={handleStatusChange}
              value={status}
            />
          </Card>
          <br />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
