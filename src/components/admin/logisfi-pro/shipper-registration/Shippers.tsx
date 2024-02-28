import { observer } from "mobx-react-lite";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateorUpdateProShipper from "./CreateorUpdateShipper";
import { useEffect } from "react";

export default observer(function Shippers() {
  const { proShipperStore, commonStore } = useStore();
  useEffect(() => {
    (async function getData() {
      await proShipperStore.getAllShippers();
    })();
  }, [proShipperStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Shippers" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "shipper code",
            "shipper name",
            "contact email",
            "contact phone",
            "approver email",
            "",
          ]}
          data={proShipperStore.shippers}
          tableBodyBuilder={(el, id) => (
            <tr key={id}>
              <td>{el.shipperCode}</td>
              <td>{el.name}</td>
              <td>{el.contactEmail}</td>
              <td>{el.contactPhone}</td>
              <td>{el.approverEmail}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateorUpdateProShipper currentShipper={el} />
                    )
                  }
                >
                  Edit
                </button>{" "}
                &nbsp;&nbsp;
                <button
                  className="btn btn-danger btn-sm "
                  onClick={() =>
                    commonStore.setModalContent(
                      <ModalDecisionContent
                        actionName={`delete ${el.name}'s data on the system.`}
                        actionCallback={() =>
                          proShipperStore.deleteProShipper(el.shipperCode)
                        }
                      />
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />

        <Button
          content="Add New Shipper"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() =>
            commonStore.setModalContent(
              <CreateorUpdateProShipper currentShipper={null} />
            )
          }
        />
      </div>
    </>
  );
});
