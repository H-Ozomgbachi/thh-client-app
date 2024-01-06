export interface disbursementData {
  dateCreated: string;
  id: string;
  shipmentId: string;
  waybillNo: string;
  origin: string;
  destination: string;
  truckNumber: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  totalAmount: number;
  amountPaid: number;
  remainingAmount: number;
  disburseComplete: boolean;
}

export interface RegisterDisbursementModel {
  shipmentId: string;
  amount: number;
}

export interface UpdateDisbursementModel {
  disburseId: string;
  amount: number;
}
