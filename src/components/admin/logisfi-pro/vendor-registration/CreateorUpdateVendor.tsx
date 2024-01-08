import { Formik, Form } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { useStore } from "../../../../api/main/appStore";
import { proVendorData } from "../../../../api/models/logisfi-pro/vendor";

interface Props {
  currentVendor: proVendorData | null;
}

export default observer(function CreateorUpdateProVendor({
  currentVendor,
}: Props) {
  const { proVendorStore } = useStore();

  const INITIAL_VALUES: proVendorData = {
    vendorCode: currentVendor?.vendorCode ?? "",
    name: currentVendor?.name ?? "",
    contactEmail: currentVendor?.contactEmail ?? "",
    contactPhone: currentVendor?.contactPhone ?? "",
    address: currentVendor?.address ?? "",
    city: currentVendor?.city ?? "",
    state: currentVendor?.state ?? "",
    accountName: currentVendor?.accountName ?? "",
    accountNumber: currentVendor?.accountNumber ?? "",
    bankName: currentVendor?.bankName ?? "",
    bankCode: currentVendor?.bankCode ?? "",
    dateCreated: currentVendor?.dateCreated ?? "",
  };

  return (
    <>
      <h5 className="text-secondary">
        {currentVendor ? "Update vendor data" : "Create new vendor"}
      </h5>

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { setErrors }) => {
          currentVendor
            ? proVendorStore.updateVendor(values, currentVendor!.vendorCode)
            : proVendorStore.createVendor(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {currentVendor ? null : (
              <CustomTextInput
                name="vendorCode"
                placeholder="Enter vendor code"
                label="Vendor Code"
                required
              />
            )}
            <CustomTextInput
              name="name"
              placeholder="Enter vendor name"
              label="name"
            />
            <CustomTextInput
              name="contactEmail"
              placeholder="Enter contact email"
              label="contact email"
            />
            <CustomTextInput
              name="contactPhone"
              placeholder="Enter contact number"
              label="contact number"
            />
            <CustomTextInput
              name="address"
              placeholder="Enter vendor address"
              label="Address"
            />
            <CustomTextInput
              name="city"
              placeholder="Enter vendor city"
              label="city"
            />
            <CustomTextInput
              name="state"
              placeholder="Enter vendor state"
              label="state"
            />
            <CustomTextInput
              name="accountName"
              placeholder="Enter account name"
              label="account name"
            />
            <CustomTextInput
              name="accountNumber"
              placeholder="Enter account number"
              label="account number"
            />
            <CustomTextInput
              name="bankName"
              placeholder="Enter bank name"
              label="bank name"
            />
            <CustomTextInput
              name="bankCode"
              placeholder="Enter bank code"
              label="bank code"
            />

            <Button
              loading={isSubmitting}
              content={currentVendor ? "Continue" : "Add new vendor"}
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
