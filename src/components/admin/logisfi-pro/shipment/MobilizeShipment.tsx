import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import { RegisterDisbursementModel } from "../../../../api/models/logisfi-pro/disbursements";
import { proShipmentsData } from "../../../../api/models/logisfi-pro/shipments";
import * as Yup from "yup";
interface Props {
  currentShipment: proShipmentsData;
}
export default observer(function MobilizeShipment({ currentShipment }: Props) {
  const { disbursementStore } = useStore();
  return (
    <div>
      <h4 className="request-modal-title">Enter Mobilization Fee</h4>
      <p className="request-modal-text">
        Enter the amount to mobilize the shipment.
      </p>

      <Formik
        initialValues={{
          shipmentId: currentShipment?.id ?? "",
          amount: 0,
        }}
        validationSchema={Yup.object({
          amount: Yup.number()
            .min(1000, "Mobilization fee must not be less than 1000 ")
            .max(
              currentShipment.vendorPrice,
              "You have exceeded the shipment price"
            ),
        })}
        onSubmit={(values: RegisterDisbursementModel) => {
          values.amount = Number(values.amount);
          console.log(values);
          disbursementStore.createDisbursement(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="amount"
              type="text"
              placeholder="Enter amount to mobilize the shipment "
              required
              label="Mobilization fee"
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
