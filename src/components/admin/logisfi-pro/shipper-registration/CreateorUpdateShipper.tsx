import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { useStore } from "../../../../api/main/appStore";
import { proShipperData } from "../../../../api/models/logisfi-pro/shipper";

interface Props {
  currentShipper: proShipperData | null;
}
export default observer(function CreateorUpdateProShipper({
  currentShipper,
}: Props) {
  const { proShipperStore } = useStore();

  const INITIAL_VALUES: proShipperData = {
    shipperCode: currentShipper?.shipperCode ?? "",
    name: currentShipper?.name ?? "",
    address: currentShipper?.address ?? "",
    city: currentShipper?.city ?? "",
    state: currentShipper?.state ?? "",
    approverEmail: currentShipper?.approverEmail ?? "",
    contactEmail: currentShipper?.contactEmail ?? "",
    contactPhone: currentShipper?.contactPhone ?? "",
    dateCreated: currentShipper?.dateCreated ?? "",
  };
  return (
    <>
      <h5 className="text-secondary">
        {currentShipper ? "Update shipper data" : "Create new shipper"}
      </h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { setErrors }) => {
          currentShipper
            ? proShipperStore.updateShipper(values, currentShipper!.shipperCode)
            : proShipperStore.createShipper(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {currentShipper ? null : (
              <CustomTextInput
                name="shipperCode"
                placeholder="Enter shipper code"
                label="Shipper Code"
                required
              />
            )}

            <CustomTextInput
              name="name"
              placeholder="Enter shipper name"
              label="Name"
              required
            />
            <CustomTextInput
              name="address"
              placeholder="Enter shipper address"
              label="Address"
              required
            />

            <CustomTextInput
              name="city"
              placeholder="Enter shipper city"
              label="city"
              required
            />
            <CustomTextInput
              name="state"
              placeholder="Enter shipper state"
              label="State"
              required
            />

            <CustomTextInput
              name="approverEmail"
              placeholder="Enter approver email"
              label="Approver Email"
              required
            />
            <CustomTextInput
              name="contactEmail"
              placeholder="Enter contact email"
              label="Contact email"
              required
            />
            <CustomTextInput
              name="contactPhone"
              placeholder="Enter contact phone"
              label="contact phone"
              required
            />

            <Button
              loading={isSubmitting}
              content={currentShipper ? "Continue" : "Add new shipper"}
              type="submit"
              color="vk"
              className="official-form-btn"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});
