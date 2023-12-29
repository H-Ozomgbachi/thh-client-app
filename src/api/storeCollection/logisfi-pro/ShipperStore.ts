import { makeAutoObservable, runInAction } from "mobx";
import { store } from "../../main/appStore";
import { ShipperData } from "../../models/logisfi-pro/shipper";

export class ShipperStore {
  url = "demo-logisfipro-api.thehaulagehub.com";
  shippers: ShipperData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllShippers = async () => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      const response = await fetch(
        "https://{{url}}/api/v1/Vendors/GetVendors?PageNumber=1&PageSize=10"
      );
      //check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      //Parse the response JSON
      const result = await response.json();
      // Process the retrieved data
      console.log("Data from the API:", result);

      runInAction(() => {
        this.shippers = result;
      });
    } catch (error) {
      //handle errors
      console.log("Error fetching data:", error);
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
