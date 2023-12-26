import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";

export default observer(function CreateVendorForm() {
  const INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    accountName: "",
    accountNumber: "",
    dateAdded: new Date(),
  };
  return (
    <>
      <h5 className="text-secondary">Create new vendor</h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="firstName"
              placeholder="Enter vendor first name"
              label="First Name"
              required
            />
            <CustomTextInput
              name="lastName"
              placeholder="Enter vendor last name"
              label="Last Name"
              required
            />

            <CustomTextInput
              name="phoneNumber"
              placeholder="Enter vendor phone number"
              label="Phone Number"
              required
            />
            <CustomTextInput
              name="accountName"
              placeholder="Enter vendor account name"
              label="Account Name"
              required
            />
            <CustomTextInput
              name="accountNumber"
              placeholder="Enter vendor account number"
              label="Account Number"
              required
            />

            <Button
              loading={isSubmitting}
              content="Create"
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
