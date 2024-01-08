import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { useStore } from "../../../../api/main/appStore";
import { proShipmentsData } from "../../../../api/models/logisfi-pro/shipments";

interface Props {
  currentShipment: proShipmentsData;
}
export default observer(function FulfillShipment({ currentShipment }: Props) {
  const { proShipmentStore } = useStore();
  return (
    <div>
      <h4 className="request-modal-title">
        Enter Sales Order Number of Waybill Number
      </h4>
      <p className="request-modal-text">
        Enter the Sales Order Number or Waybill Number below for this
        transaction for confirmation.
      </p>

      <Formik
        initialValues={{
          shipmentId: currentShipment.id,
          waybillNo: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          proShipmentStore.uploadShipmentWaybill(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="waybillNo"
              type="text"
              placeholder="Enter Sales Order Number or Waybill Number "
              required
              label="Waybill No"
            />

            <Button
              loading={isSubmitting}
              content="Proceed"
              type="submit"
              color="vk"
              fluid
              className="available-trucks-btn"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});
