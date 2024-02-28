import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import SimpleTable from "../../../shared/table/SimpleTable";
// import { CommonStore } from "../../../../api/storeCollection/commonStore";
import { useStore } from "../../../../api/main/appStore";
import MobilizeShipment from "./MobilizeShipment";
import { useEffect } from "react";

export default observer(function PendingMobilization() {
  const { proShipmentStore, commonStore } = useStore();
  useEffect(() => {
    (async function getData() {
      await proShipmentStore.getAllShipments();
    })();
  }, [proShipmentStore]);

  return (
    <>
      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "origin",
            "destination",
            "shipper code",
            "vendor code",
            "partner code",
            "shipment price",
            "vendor price",
            "waybill no.",
            "status",
            "",
          ]}
          data={proShipmentStore.shipments.filter(
            (shipment) =>
              !shipment.shipperEmailApproval && shipment.status === "Confirmed"
          )}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.origin}</td>
              <td>{el.destination}</td>
              <td>{el.shipperCode}</td>
              <td>{el.vendorCode}</td>
              <td>{el.partnerCode}</td>
              <td>{el.shipmentPrice}</td>
              <td>{el.vendorPrice}</td>
              <td>{el.waybillNo}</td>
              <td>{el.status}</td>

              <td>
                <Button
                  color="blue"
                  content="Mobilize"
                  size="tiny"
                  onClick={() =>
                    commonStore.setModalContent(
                      <MobilizeShipment currentShipment={el} />
                    )
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
