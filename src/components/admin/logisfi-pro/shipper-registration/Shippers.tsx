import { observer } from "mobx-react-lite";

import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateShipperForm from "./CreateShipperForm";
import { testData } from "./data";
export default observer(function Shippers() {
  const { commonStore } = useStore();

  return (
    <>
      <CustomDefaultTabHeading content="Shipper Registration" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={["name", "email"]}
          data={testData}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.email}</td>
            </tr>
          )}
        />

        <Button
          content="Add New Shipper"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() => commonStore.setModalContent(<CreateShipperForm />)}
        />
      </div>
    </>
  );
});
