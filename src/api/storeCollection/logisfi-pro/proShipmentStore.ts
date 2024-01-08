import { makeAutoObservable, runInAction } from "mobx";
import { store } from "../../main/appStore";
import { BaseModel } from "../../models/shared";
import TOKEN from "./token";
import {
  RegisterProShipmentModel,
  proShipmentsData,
  shipmentWaybilled,
} from "../../models/logisfi-pro/shipments";

export class proShipmentStore {
  shipments: proShipmentsData[] = [];
  singleShipment: proShipmentsData = {
    dateCreated: "2024-01-07T06:48:36.244Z",
    id: "string",
    shipperCode: "string",
    vendorCode: "string",
    partnerCode: "string",
    truckNumber: "string",
    driverName: "string",
    driverPhone: "string",
    driverLicenseNo: "string",
    origin: "string",
    destination: "string",
    shipmentPrice: 0,
    vendorPrice: 0,
    waybillNo: "string",
    shipperEmailApproval: true,
    status: "string",
  };
  apiUrl = "https://demo-logisfipro-api.thehaulagehub.com/api/v1/Shipments";

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

  async getAllShipments(pageNumber: number = 1, pageSize: number = 50) {
    try {
      const data = (await this.fetchData(
        `GetShipments?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )) as BaseModel<proShipmentsData>;

      runInAction(() => {
        this.shipments = data.responseDetails;
      });
    } catch (error) {
      throw error;
    }
  }
  async getShipment(itemId: string) {
    try {
      const data = await this.fetchData(`GetShipment/${itemId}`);

      runInAction(() => {
        this.singleShipment = data.responseDetails;
      }); //skeptical
    } catch (error) {
      throw error;
    }
  }
  async createShipment(values: RegisterProShipmentModel) {
    try {
      await this.fetchData("CreateShipment", "POST", values);
      this.getAllShipments();
      store.commonStore.setSuccess("New Shipment Added ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }
  async uploadShipmentWaybill(values: shipmentWaybilled) {
    try {
      await this.fetchData(`ShipmentWaybilled`, "POST", values);
      this.getAllShipments();
      store.commonStore.setSuccess("Waybill uploaded successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  }

  async deleteShipment(itemId: string) {
    try {
      await this.fetchData(`DeleteShipment/${itemId}`, "DELETE");
      this.getAllShipments();
      store.commonStore.setSuccess("Shipment removed successfully");
    } catch (error) {
      throw error;
    }
  }
}
