import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import { useEffect } from "react";
import CreateorUpdateProVendor from "./CreateorUpdateVendor";

export default observer(function Vendors() {
  const { proVendorStore, commonStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await proVendorStore.getAllVendors();
    })();
  }, [proVendorStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Vendors" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "vendor code",
            "vendor name",
            "contact email",
            "contact phone",
            "",
          ]}
          data={proVendorStore.vendors}
          tableBodyBuilder={(el, id) => (
            <tr key={id}>
              <td>{el.vendorCode}</td>
              <td>{el.name}</td>
              <td>{el.contactEmail}</td>
              <td>{el.contactPhone}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateorUpdateProVendor currentVendor={el} />
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
                        actionName={`delete ${el.name}`}
                        actionCallback={() =>
                          proVendorStore.deleteProVendor(el.vendorCode)
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
          content="Add New Vendor"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() =>
            commonStore.setModalContent(
              <CreateorUpdateProVendor currentVendor={null} />
            )
          }
        />
      </div>
    </>
  );
});
