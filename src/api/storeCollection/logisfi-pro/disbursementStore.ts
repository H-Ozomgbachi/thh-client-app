import { makeAutoObservable, runInAction } from "mobx";
import { store } from "../../main/appStore";
import {
  RegisterDisbursementModel,
  disbursementData,
  UpdateDisbursementModel,
} from "../../models/logisfi-pro/disbursements";
import { BaseModel } from "../../models/shared";
import TOKEN from "./token";
export class disbursementStore {
  disbursements: disbursementData[] = [];
  apiUrl = "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Disbursements";

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
          Authorization: `Bearer ${TOKEN}`,
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
  async getAllDisbursements(
    status: boolean = false,
    pageNumber: number = 1,
    pageSize: number = 50
  ) {
    try {
      const data = (await this.fetchData(
        `GetDisbursements?DisburseComplete=${status}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )) as BaseModel<disbursementData>;

      runInAction(() => {
        this.disbursements = data.responseDetails;
      });
    } catch (error) {
      throw error;
    }
  }

  async createDisbursement(values: RegisterDisbursementModel) {
    try {
      await this.fetchData("CreateDisbursement", "POST", values);
      this.getAllDisbursements();
      store.commonStore.setSuccess("Shipment Mobilized ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }
  async updateDisbursement(values: UpdateDisbursementModel) {
    try {
      await this.fetchData(`UpdateDisbursement`, "POST", values);
      this.getAllDisbursements();
      store.commonStore.setSuccess("payment completed");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }
}
