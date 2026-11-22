import burgundyAsset from "@/assets/tryuniq_logo_burgundy.png.asset.json";
import ivoryAsset from "@/assets/tryuniq_logo_ivory.png.asset.json";

// Local exports do not include Lovable's /__l5e asset-serving endpoint.
// Keep the pointer files authoritative, but resolve them on the hosted origin.
const assetOrigin = "https://id-preview--9b150e50-b10d-4b62-b38d-9fbb6efe0b76.lovable.app";

export const logoBurgundyUrl = new URL(burgundyAsset.url, assetOrigin).href;
export const logoIvoryUrl = new URL(ivoryAsset.url, assetOrigin).href;