import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import { useStore } from "../../../../api/main/appStore";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import { TruckSizeModel } from "../../../../api/models/trans-tracker/truckSize";
import AddOrEditTruckSize from "./AddOrEditTruckSize";
import { Button } from "semantic-ui-react";

interface Props {
  truckSizes: TruckSizeModel[];
}

export default observer(function TruckSize({ truckSizes }: Props) {
  const { commonStore } = useStore();

  useEffect(() => {
    (async function getData() {})();
  }, []);

  return (
    <>
      <CustomDefaultTabHeading content="Truck Size Manager" />

      <div className="shadow-card p-3">
        <SimpleTable
          titles={["Size", "Unit", ""]}
          data={truckSizes}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.size}</td>
              <td>{el.unit}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <AddOrEditTruckSize truckSize={el} />
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
                        actionName={`delete ${el.size} - ${el.unit}`}
                        actionCallback={() => console.log(el.id)}
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
          content="Add New Truck Size"
          color="vk"
          className=" official-form-btn"
          onClick={() =>
            commonStore.setModalContent(<AddOrEditTruckSize truckSize={null} />)
          }
        />
      </div>
    </>
  );
});
