import { makeAutoObservable, runInAction } from "mobx";
import { store } from "../../main/appStore";
import { proPartnerData } from "../../models/logisfi-pro/partner";
import { RegisterProPartnerModel } from "../../models/logisfi-pro/partner";
import { BaseModel } from "../../models/shared";

export class proPartnerStore {
  partners: proPartnerData[] = [];
  apiUrl = "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Partners";

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

  async getAllPartners(pageNumber: number = 1, pageSize: number = 50) {
    try {
      const data = (await this.fetchData(
        `GetPartners?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )) as BaseModel<proPartnerData>;

      runInAction(() => {
        this.partners = data.responseDetails;
      });
    } catch (error) {
      throw error;
    }
  }

  async createPartner(values: RegisterProPartnerModel) {
    try {
      await this.fetchData("CreatePartner", "POST", values);
      this.getAllPartners();
      store.commonStore.setSuccess("New Partner Added ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }
  async updatePartner(values: RegisterProPartnerModel) {
    try {
      await this.fetchData(`UpdatePartner`, "PUT", values);
      this.getAllPartners();
      store.commonStore.setSuccess("Partner Updated successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }

  async deletePartner(itemId: string) {
    try {
      await this.fetchData(`DeletePartner/${itemId}`, "DELETE");
      this.getAllPartners();
      store.commonStore.setSuccess("Partner removed successfully");
    } catch (error) {
      throw error;
    }
  }
}

// export class partnerStore {
//   partners: PartnerData[] = [];

//   constructor() {
//     makeAutoObservable(this);
//   }

//   getAllPartners = async () => {
//     try {
//       window.scrollTo(0, 0);
//       store.commonStore.setLoading(true);
//       const response = await fetch(
//         "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Partners/GetPartners?PageNumber=1&PageSize=10"
//       );
//       //check if the request was successful
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       //Parse the response JSON
//       const data = await response.json();
//       // Process the retrieved data
//       console.log("Data from the API:", data);
//       const result = data.responseDetails;
//       runInAction(() => {
//         this.partners = result;
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
