import { DeliveryMethod, LogSeverity, shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/node";

// webHooks Handlers
import appUninstallHandler from "./webhooks/app_uninstalled";
import cartCreateHandler from "./webhooks/cart_create";
import prodcutCreateHandler from "./webhooks/product_create";

const isDev = process.env.NODE_ENV === "development";

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_API_SCOPES,
  hostName: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
  hostScheme: "https",
  apiVersion: process.env.SHOPIFY_API_VERSION,
  isEmbeddedApp: true,
  logger: { level: isDev ? 0 : 0 },
  // Error = 0,Warning = 1,Info = 2,Debug = 3
  // logger: { level: LogSeverity.Debug, httpRequests: true }, //For insane levels of debugging
});

shopify.webhooks.addHandlers({
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks/app_uninstalled",
    callback: appUninstallHandler,
  },
  CARTS_CREATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks/cart_create",
    callback: cartCreateHandler,
  },
  PRODUCTS_CREATE : {
    deliveryMethod : DeliveryMethod.Http,
    callbackUrl : "/api/webhooks/product_create",
    callback: prodcutCreateHandler
  }
});

export default shopify;
