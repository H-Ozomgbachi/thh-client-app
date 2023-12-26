import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";

const testData = [
  {
    id: 1,
    truckNumber: "XXX-TGBR",
    destination: "Ekpom",
    shipperName: "Ok Foods",
    transporterName: "Qudus Adeyemi",
    dateOfFulfillment: "17/12/2023",
    wayBillNo: "THH234",
  },
  {
    id: 2,
    truckNumber: "XXX-TGBR",
    destination: "Ekpom",
    shipperName: "Ok Foods",
    transporterName: "Qudus Adeyemi",
    dateOfFulfillment: "17/12/2023",
    wayBillNo: "THH234",
  },
  {
    id: 3,
    truckNumber: "XXX-TGBR",
    destination: "Ekpom",
    shipperName: "Ok Foods",
    transporterName: "Qudus Adeyemi",
    dateOfFulfillment: "17/12/2023",
    wayBillNo: "THH234",
  },
  {
    id: 4,
    truckNumber: "XXX-TGBR",
    destination: "Ekpom",
    shipperName: "Ok Foods",
    transporterName: "Qudus Adeyemi",
    dateOfFulfillment: "17/12/2023",
    wayBillNo: "THH234",
  },
];

export default observer(function TruckInTransit() {
  const [data] = useState(testData);
  return (
    <>
      <CustomDefaultTabHeading content="Truck in Transit" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "Truck No.",
            "Destination",
            "Shipper Name",
            "Transporter Name",
            "Date Fufilled",
            "Waybill No.",
            "",
          ]}
          data={data}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.truckNumber}</td>
              <td>{el.destination}</td>
              <td>{el.shipperName}</td>
              <td>{el.transporterName}</td>
              <td>{el.dateOfFulfillment}</td>
              <td>{el.wayBillNo}</td>
              <td>
                <Button color="blue" size="tiny" content="Send Truck Update" />

                <Button size="tiny" content="Delivered" color="vk" />
              </td>
            </tr>
          )}
        />
      </div>
    </>
  );
});
