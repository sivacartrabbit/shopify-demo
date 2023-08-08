import React, { useEffect, useState } from "react";
import useFetch from "@/components/hooks/useFetch";
import { useAppBridge } from "@shopify/app-bridge-react";

// component

import {
  IndexTable,
  Page,
  LegacyCard,
  useIndexResourceState,
  Text,
} from "@shopify/polaris";

export default function productList() {
  const app = useAppBridge();
  const fetch = useFetch();

  const [productList, setproductList] = useState([]);

  async function getProductsList() {
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
        console.log(data);
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

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productList);

  const productRows = productList?.map(
    ({ id, title, description, price, totalInventory }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>{price}</IndexTable.Cell>
        <IndexTable.Cell>{totalInventory}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Page title="Products"
    // backAction={{ content: "Products", url: "/" }}
    //   secondaryActions={[
    //     {
    //       content: "Duplicate",
          
    //       accessibilityLabel: "Secondary action label",
    //       onAction: () => alert("Duplicate action"),
    //     },
    //     {
    //       content: "Archive",
          
    //       accessibilityLabel: "Secondary action label",
    //       onAction: () => alert("Archive action"),
    //     },
    //     {
    //       content: "Delete",
          
    //       destructive: true,
    //       accessibilityLabel: "Secondary action label",
    //       onAction: () => alert("Delete action"),
    //     },
    //   ]}
    fullWidth>
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
            { title: "Description" },
            { title: "Price" },
            { title: "totalInventory" },
          ]}
        >
          {productRows}
        </IndexTable>
      </LegacyCard>
    </Page>
  );
}
