import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { Button } from "semantic-ui-react";
import { TruckSizeModel } from "../../../../api/models/trans-tracker/truckSize";

interface Props {
  truckSize: TruckSizeModel | null;
}

export default observer(function AddOrEditTruckSize({ truckSize }: Props) {
  // const { driverStore } = useStore();

  return (
    <>
      <h5>{truckSize ? "Update truck size" : "Create new truck size"}</h5>

      <Formik
        initialValues={{
          size: truckSize?.size ?? "",
          unit: truckSize?.unit ?? 0,
          error: null,
        }}
        onSubmit={(values, { setErrors }) =>
          truckSize ? console.log(truckSize.id, values) : console.log(values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="size"
              placeholder="Enter Truck Size"
              label="Truck Size"
              required
            />

            <CustomTextInput
              name="unit"
              placeholder="Enter unit"
              label="Unit"
              type="number"
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
