import { useCallback, useState } from "react";
import useFetch from "@/components/hooks/useFetch";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Card,
  Page,
  Layout,
  TextField,
  Select,
  PageActions,
} from "@shopify/polaris";

export default function productCreate() {
  //   const app = useAppBridge();
  //   const fetch = useFetch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  const [status, setStatus] = useState("active");

  const statusOptios = [
    { label: "Active (Default)", value: "active" },
    { label: "InActive", value: "inActive" },
  ];

  const handleStatusChange = useCallback((value) => setStatus(value), []);

  function handleSubmit() {
    console.log(title);
  }

  return (
    <Page>
      <Layout>
        <Layout.Section >
          <Card >
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
              value={title}
              onChange={(e) => setTitle(e)}
              autoComplete="off"
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Select
              label="Status"
              options={statusOptios}
              onChange={handleStatusChange}
              value={status}
            />
          </Card>
        </Layout.Section>
      </Layout>

      <PageActions
        primaryAction={{
          content: "Save",
          onAction: { handleSubmit },
        }}
        secondaryActions={[
          {
            content: "Back",
            destructive: true,
            onAction: {},
          },
        ]}
      />
    </Page>
  );
}
