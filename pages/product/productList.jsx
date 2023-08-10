import React, { useEffect, useState } from "react";
import useFetch from "@/components/hooks/useFetch";
import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { useRouter } from "next/router";

// component

import {
  IndexTable,
  Page,
  LegacyCard,
  useIndexResourceState,
  Text,
  Spinner,
  Box,
  HorizontalStack,
  Link,
  Icon,
} from "@shopify/polaris";

export default function productList() {
  const app = useAppBridge();
  const router = useRouter();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [productList, setproductList] = useState([]);

  async function getProductsList() {
    setproductList([]);
    await fetch(`/api/product/getProducts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setproductList(data.data);
        console.log(data.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }

  useEffect(() => {
    getProductsList();
  }, []);

  const resourceName = {
    singular: "productList",
    plural: "productLists",
  };

  const onDeleteProduct = async () => {
    const deleteIds = selectedResources.map((index) => {
      const product = productList.find((data) => data.id === index);
      return product.id;
    });
    await fetch("/api/product/deleteProduct", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(deleteIds),
    }).then((res) => {
      getProductsList();
    });
  };

  const handleUpdateClick = (id) => {
    const data = id.split("/Product/")[1];
    router.push(`/product/productUpdate?id=${data}`);
  };

  const handleViewProduct = (uri) => {
    console.log(uri);
    window.open(uri, "_blank");
  };

  const deleteProduct = [
    {
      content: "Delete Product",
      onAction: () => onDeleteProduct(),
    },
  ];

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productList);

  const productRows = productList?.map(
    ({ id, title, description, price, totalInventory, onlineUrl }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Link onClick={() => handleUpdateClick(String(id))}>
            <Text variant="bodyMd" fontWeight="bold" as="span" padding={4}>
              {title}
            </Text>
          </Link>
          <br />
          <Link onClick={() => handleViewProduct(onlineUrl)}>View</Link>
        </IndexTable.Cell>

        <IndexTable.Cell>{price}</IndexTable.Cell>
        <IndexTable.Cell>{totalInventory}</IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Page
      title="Products"
      primaryAction={{
        content: "Create Product",
        onAction: () => {
          navigate("/product/productCreate");
        },
      }}
      fullWidth
    >
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={productList.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Title" },
            { title: "Price" },
            { title: "totalInventory" },
            { title: "Description" },
          ]}
          promotedBulkActions={deleteProduct}
          emptyState={
            <Box padding="6">
              <HorizontalStack align="center" blockAlign="center">
                <Spinner accessibilityLabel="Spinner example" size="large" />
              </HorizontalStack>
            </Box>
          }
        >
          {productRows}
        </IndexTable>
      </LegacyCard>
    </Page>
  );
}
