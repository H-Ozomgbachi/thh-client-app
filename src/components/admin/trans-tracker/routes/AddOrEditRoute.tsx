import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { Button } from "semantic-ui-react";
import { RouteModel } from "../../../../api/models/trans-tracker/routes";

interface Props {
  route: RouteModel | null;
}

export default observer(function AddOrEditRoute({ route }: Props) {
  // const { driverStore } = useStore();

  return (
    <>
      <h5>{route ? "Update route data" : "Create new route"}</h5>

      <Formik
        initialValues={{
          originState: route?.originState ?? "",
          originCity: route?.originCity ?? "",
          destinationState: route?.destinationState ?? "",
          destinationCity: route?.destinationCity ?? "",
          error: null,
        }}
        onSubmit={(values, { setErrors }) =>
          route ? console.log(route.id, values) : console.log(values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="originState"
              placeholder="Enter origin state"
              label="Origin State"
              required
            />

            <CustomTextInput
              name="originCity"
              placeholder="Enter origin city"
              label="Origin City"
              required
            />

            <CustomTextInput
              name="destinationState"
              placeholder="Enter driver phone"
              label="Destination State"
              required
            />

            <CustomTextInput
              name="destinationCity"
              placeholder="Enter destination city"
              label="Destination City"
              required
            />

            <Button
              loading={isSubmitting}
              content="Continue"
              type="submit"
              className="official-form-btn"
              color="vk"
            />
          </Form>
        )}
      </Formik>
    </>
  );
});
