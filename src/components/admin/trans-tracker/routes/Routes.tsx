import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import { RouteModel } from "../../../../api/models/trans-tracker/routes";
import AddOrEditRoute from "./AddOrEditRoute";
import { useStore } from "../../../../api/main/appStore";
import ModalDecisionContent from "../../../shared/modal/ModalDecisionContent";
import { Button } from "semantic-ui-react";

interface Props {
  routes: RouteModel[];
}

export default observer(function Routes({ routes }: Props) {
  const { commonStore } = useStore();

  useEffect(() => {
    (async function getData() {})();
  }, []);

  return (
    <>
      <CustomDefaultTabHeading content="Routes Manager" />

      <div className="shadow-card p-3">
        <SimpleTable
          titles={[
            "Origin State",
            "Origin City",
            "Destination State",
            "Destination City",
            "",
          ]}
          data={routes}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.originState}</td>
              <td>{el.originCity}</td>
              <td>{el.destinationState}</td>
              <td>{el.destinationCity}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(<AddOrEditRoute route={el} />)
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
                        actionName={`delete ${el.originState} - ${el.originCity}`}
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
          content="Add New Route"
          color="vk"
          className=" official-form-btn"
          onClick={() =>
            commonStore.setModalContent(<AddOrEditRoute route={null} />)
          }
        />
      </div>
    </>
  );
});
