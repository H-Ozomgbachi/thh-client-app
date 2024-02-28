export interface proShipmentsData {
  dateCreated: string;
  id: string;
  shipperCode: string;
  vendorCode: string;
  partnerCode: string;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
  driverLicenseNo: string;
  origin: string;
  destination: string;
  shipmentPrice: number;
  vendorPrice: number;
  waybillNo: string;
  shipperEmailApproval: boolean;
  status: string;
}

export interface RegisterProShipmentModel {
  shipperCode: string;
  vendorCode: string;
  partnerCode: string;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
  driverLicenseNo: string;
  origin: string;
  destination: string;
  shipmentPrice: number;
  vendorPrice: number;
  allowShipperApprove: boolean;
}

export interface shipmentWaybilled {
  shipmentId: string;
  waybillNo: string;
}
