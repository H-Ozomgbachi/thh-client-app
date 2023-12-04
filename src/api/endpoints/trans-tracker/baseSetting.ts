import { transTrackerBackendUrl } from "../../../urls";

export function TransTrackerUrl(specificUrl: string) {
  return transTrackerBackendUrl + specificUrl;
}
