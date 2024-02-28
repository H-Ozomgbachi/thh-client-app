import { observer } from "mobx-react-lite";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateorUpdatePartner from "./CreateorUpdatePartner";
import { useEffect } from "react";

export default observer(function Partners() {
  const { proPartnerStore, commonStore } = useStore();
  useEffect(() => {
    (async function getData() {
      await proPartnerStore.getAllPartners();
    })();
  }, [proPartnerStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Partners" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "partner code",
            "partner name",
            "account name",
            "account number",
            "",
          ]}
          data={proPartnerStore.partners}
          tableBodyBuilder={(el, id) => (
            <tr key={id}>
              <td>{el.partnerCode}</td>
              <td>{el.name}</td>
              <td>{el.accountName}</td>
              <td>{el.accountNumber}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateorUpdatePartner currentPartner={el} />
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
                        actionName={`delete ${el.name} ${el.accountName} ${el.accountNumber}`}
                        actionCallback={() =>
                          proPartnerStore.deletePartner(el.partnerCode)
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
          content="Add New Partner"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() =>
            commonStore.setModalContent(
              <CreateorUpdatePartner currentPartner={null} />
            )
          }
        />
      </div>
    </>
  );
});
