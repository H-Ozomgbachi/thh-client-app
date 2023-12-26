import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";

export default observer(function CreateShipperForm() {
  const INITIAL_VALUES = {
    name: "",
    email: "",
    dateAdded: new Date(),
  };
  return (
    <>
      <h5 className="text-secondary">Create new shipper</h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="name"
              placeholder="Enter shipper name"
              label="Shipper Name"
              required
            />

            <CustomTextInput
              name="address"
              placeholder="Enter email address"
              label="Email Address"
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
