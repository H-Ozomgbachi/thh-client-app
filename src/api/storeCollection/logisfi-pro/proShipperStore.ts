import { makeAutoObservable, runInAction } from "mobx";
import { store } from "../../main/appStore";
import { proShipperData } from "../../models/logisfi-pro/shipper";
import { BaseModel } from "../../models/shared";

export class proShipperStore {
  shippers: proShipperData[] = [];
  apiUrl = "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Shippers";

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

  async getAllShippers(pageNumber: number = 1, pageSize: number = 50) {
    try {
      const data = (await this.fetchData(
        `GetShippers?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )) as BaseModel<proShipperData>;

      runInAction(() => {
        this.shippers = data.responseDetails;
      });
    } catch (error) {
      throw error;
    }
  }

  async createShipper(data: proShipperData) {
    try {
      (await this.fetchData(
        "CreateShipper",
        "POST",
        data
      )) as BaseModel<proShipperData>;
      this.getAllShippers();
      store.commonStore.setSuccess("New Shipper Added ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }

  async updateShipper(data: proShipperData, itemId: string) {
    try {
      await this.fetchData(`UpdateShipper`, "PUT", data);
      this.getAllShippers();
      store.commonStore.setSuccess("Shipper Updated successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }

  async deleteProShipper(itemId: string) {
    try {
      await this.fetchData(`DeleteShipper/${itemId}`, "DELETE");
      this.getAllShippers();
      store.commonStore.setSuccess("Shipper removed successfully");
    } catch (error) {
      throw error;
    }
  }
}

// export class proShipperStore {
//   shippers: proShipperData[] = [];

//   constructor() {
//     makeAutoObservable(this);
//   }

//   getAllShippers = async () => {
//     try {
//       window.scrollTo(0, 0);
//       store.commonStore.setLoading(true);
//       const response = await fetch(
//         "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Shippers/GetShippers?PageNumber=1&PageSize=50"
//       );
//       //check if the request was successful
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       //Parse the response JSON
//       const data = (await response.json()) as BaseModel<proShipperData>;
//       // Process the retrieved data
//       console.log("Data from the API:", data);
//       const result = data.responseDetails;

//       runInAction(() => {
//         this.shippers = result;
//       });
//     } catch (error) {
//       //handle errors
//       console.log("Error fetching data:", error);
//       throw error;
//     } finally {
//       store.commonStore.setLoading(false);
//     }
//   };

//   createShipper = async (data: proShipperData) => {
//     try {
//       window.scrollTo(0, 0);
//       store.commonStore.setLoading(true);
//       const response = await fetch(
//         "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Shippers/CreateShipper",
//         {
//           method: "POST", // or 'PUT'
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       //check if the request was successful
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const result = await response.json();
//       console.log("Success:", result);
//       this.getAllShippers();
//     } catch (error) {
//       throw error;
//     } finally {
//       store.commonStore.setLoading(false);
//       store.commonStore.setModalVisible(false);
//     }
//   };
//   updateShipper = async (data: any, itemId: string) => {
//     try {
//       const response = await fetch(
//         `https://demo-logisfipro-api.thehaulagehub.com/api/v1/Shippers/UpdateShipper`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       //Check if the request was successful
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       store.commonStore.setSuccess("Shipper Updated successfully");
//       this.getAllShippers();
//     } catch (error) {
//       throw error;
//     } finally {
//       store.commonStore.setLoading(false);
//     }
//   };
//   deleteProShipper = async (itemId: string) => {
//     try {
//       const response = await fetch(
//         `https://demo-logisfipro-api.thehaulagehub.com/api/v1/Shippers/DeleteShipper/${itemId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       //Check if the request was successful
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       store.commonStore.setSuccess("Shipper removed successfully");
//       this.getAllShippers();
//     } catch (error) {
//       throw error;
//     } finally {
//       store.commonStore.setLoading(false);
//     }
//   };
// }
