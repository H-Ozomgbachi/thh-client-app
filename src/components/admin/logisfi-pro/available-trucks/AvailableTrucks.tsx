import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import FulfilTruck from "./FulfilTruck";
import { useStore } from "../../../../api/main/appStore";

const testData = [
  {
    id: 1,
    shipperName: "Ok Foods",
    vendorName: "Qudus Adeyemi",
    truckNumber: "XXX-TGBR",
    driverName: "Henry Ozomgbachi",
    dateLogged: "17/12/2023",
    destination: "Ekpom",
  },
  {
    id: 2,
    shipperName: "Ok Foods",
    vendorName: "Qudus Adeyemi",
    truckNumber: "XXX-TGBR",
    driverName: "Henry Ozomgbachi",
    dateLogged: "17/12/2023",
    destination: "Ekpom",
  },
  {
    id: 3,
    shipperName: "Ok Foods",
    vendorName: "Qudus Adeyemi",
    truckNumber: "XXX-TGBR",
    driverName: "Henry Ozomgbachi",
    dateLogged: "17/12/2023",
    destination: "Ekpom",
  },
  {
    id: 4,
    shipperName: "Ok Foods",
    vendorName: "Qudus Adeyemi",
    truckNumber: "XXX-TGBR",
    driverName: "Henry Ozomgbachi",
    dateLogged: "17/12/2023",
    destination: "Ekpom",
  },
];

export default observer(function AvailableTrucks() {
  const [data] = useState(testData);
  const { commonStore } = useStore();

  return (
    <>
      <CustomDefaultTabHeading content="Available Trucks" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "Shipper Name",
            "Vendor Name",
            "Truck Number",
            "Driver Name",
            "Date Logged",
            "Destination",
            "",
          ]}
          data={data}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.shipperName}</td>
              <td>{el.vendorName}</td>
              <td>{el.truckNumber}</td>
              <td>{el.driverName}</td>
              <td>{el.dateLogged}</td>
              <td>{el.destination}</td>
              <td>
                <Button
                  content="Fulfil this Truck"
                  type="submit"
                  color="vk"
                  className="official-form-btn"
                  onClick={() =>
                    commonStore.setModalContent(<FulfilTruck data={el} />)
                  }
                />
              </td>
            </tr>
          )}
        />
      </div>
    </>
  );
});
