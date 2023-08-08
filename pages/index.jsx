import isShopAvailable from "@/utils/middleware/isShopAvailable";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Page } from "@shopify/polaris";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  return await isShopAvailable(context);
}

const HomePage = () => {
  const router = useRouter();
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  return (
    <Page fullWidth>
      <h1>Hello World</h1>
    </Page>
  );
};

export default HomePage;
