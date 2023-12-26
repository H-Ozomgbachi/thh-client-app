import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";

// interface Props {
//   id: number;
//   shipperName: string;
//   vendorName: string;
//   truckNumber: string;
//   driverName: string;
//   dateLogged: string;
//   destination: string;
// }

export default observer(function RequestToLoad(data: any) {
  return (
    <div>
      <h4 className="request-modal-title">
        Enter Sales Order Number or Waybill Number
      </h4>
      <p className="request-modal-text">
        Enter the Sales Order Number or Waybill Number below and upload the
        waybill for this transaction for confirmation.
      </p>

      <Formik
        initialValues={{
          id: data.id,
          waybillNumber: "",
        }}
        onSubmit={(values) => alert(values)}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="waybillNumber"
              type="text"
              placeholder="Enter Sales Order Number or Waybill Number"
              required
              label="Waybill or Sales Order Number"
            />
            <div className="waybill__upload">
              <div>
                <CustomTextInput
                  name="file"
                  type="file"
                  onBlurCapture={(event) => {
                    setFieldValue("file", event.target.name);
                  }}
                  label="Upload Waybill"
                  required
                />
              </div>

              <div>
                <Button icon="upload" color="vk" content="Upload waybill" />
              </div>
            </div>

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
