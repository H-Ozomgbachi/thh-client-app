import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import SimpleTable from "../../../shared/table/SimpleTable";
import { useStore } from "../../../../api/main/appStore";
import FulfillShipment from "./FulfillShipment";
import { useEffect } from "react";
export default observer(function PendingWaybill() {
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
            "truck no.",
            "shipment price",
            "vendor price",
            "",
          ]}
          data={proShipmentStore.shipments}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.origin}</td>
              <td>{el.destination}</td>
              <td>{el.shipperCode}</td>
              <td>{el.vendorCode}</td>
              <td>{el.partnerCode}</td>
              <td>{el.truckNumber}</td>
              <td>{el.shipmentPrice}</td>
              <td>{el.vendorPrice}</td>

              <td>
                {el.status === "NotConfirmed" ? (
                  <Button
                    color="blue"
                    content="Add waybill no."
                    size="tiny"
                    icon="plus circle"
                    onClick={() =>
                      commonStore.setModalContent(
                        <FulfillShipment currentShipment={el} />
                      )
                    }
                  />
                ) : (
                  <Button color="green" content="waybilled" size="tiny" />
                )}
              </td>
            </tr>
          )}
        />
      </div>
    </>
  );
});
