import { Formik, Form } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { useStore } from "../../../../api/main/appStore";
import { proVendorData } from "../../../../api/models/logisfi-pro/vendor";
import * as Yup from "yup";
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
  };

  return (
    <>
      <div className="vendor-form">
        <h5 className="text-secondary ">
          {currentVendor ? "Update vendor data" : "Create new vendor"}
        </h5>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={Yup.object({
            contactEmail: Yup.string()
              .email("Invalid email address")
              .required("Required"),
          })}
          onSubmit={(values, { setErrors }) => {
            console.log(values);
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
                label="Name"
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
                placeholder="Enter contact number"
                label="Contact number"
                required
              />
              <CustomTextInput
                name="address"
                placeholder="Enter vendor address"
                label="Address"
                required
              />
              <CustomTextInput
                name="city"
                placeholder="Enter vendor city"
                label="City"
                required
              />
              <CustomTextInput
                name="state"
                placeholder="Enter vendor state"
                label="State"
                required
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
      </div>
    </>
  );
});
