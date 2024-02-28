import { makeAutoObservable, runInAction } from "mobx";
import { store } from "../../main/appStore";
import { proVendorData } from "../../models/logisfi-pro/vendor";
import { BaseModel } from "../../models/shared";
// export class proVendorStore {
//   vendors: proVendorData[] = [];

//   constructor() {
//     makeAutoObservable(this);
//   }
//   getAllVendors = async () => {
//     try {
//       window.scrollTo(0, 0);
//       store.commonStore.setLoading(true);
//       const response = await fetch(
//         "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Vendors/GetVendors?PageNumber=1&PageSize=10"
//       );
//       //check
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       //Parse the response JSON
//       const data = await response.json();

//       // Process the retrieved data
//       console.log("Data from the API:", data);
//       const result = data.responseDetails;

//       runInAction(() => {
//         this.vendors = result;
//       });
//     } catch (error) {
//       //handle errors
//       console.log("Error fetching data:", error);
//       throw error;
//     } finally {
//       store.commonStore.setLoading(false);
//     }
//   };
// }

export class proVendorStore {
  vendors: proVendorData[] = [];
  apiUrl = "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Vendors";

  constructor() {
    makeAutoObservable(this);
  }

  private async fetchData(path: string, method: string = "GET", body?: object) {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.apiUrl}/${path}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error handling data:", error);
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  }

  async getAllVendors(pageNumber: number = 1, pageSize: number = 50) {
    try {
      const data = (await this.fetchData(
        `GetVendors?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )) as BaseModel<proVendorData>;

      runInAction(() => {
        this.vendors = data.responseDetails;
      });
    } catch (error) {
      throw error;
    }
  }

  async createVendor(data: proVendorData) {
    try {
      (await this.fetchData(
        "CreateVendor",
        "POST",
        data
      )) as BaseModel<proVendorData>;
      this.getAllVendors();
      store.commonStore.setSuccess("New Vendor Added ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }

  async updateVendor(data: proVendorData, itemId: string) {
    try {
      await this.fetchData(`UpdateVendor`, "PUT", data);
      this.getAllVendors();
      store.commonStore.setSuccess("Vendor Updated successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }

  async deleteProVendor(itemId: string) {
    try {
      await this.fetchData(`DeleteVendor/${itemId}`, "DELETE");
      this.getAllVendors();
      store.commonStore.setSuccess("Vendor removed successfully");
    } catch (error) {
      throw error;
    }
  }
}
