import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { useStore } from "../../../../api/main/appStore";
import {
  UpdateDisbursementModel,
  disbursementData,
} from "../../../../api/models/logisfi-pro/disbursements";
import { useEffect } from "react";

interface Props {
  currentDisbursement: disbursementData;
}
export default observer(function BalanceDisbursement({
  currentDisbursement,
}: Props) {
  const { disbursementStore } = useStore();

  return (
    <div>
      <h4 className="request-modal-title">Remaining Amount</h4>
      <p className="request-modal-text">
        Enter the remaining amount to complete disbursement.
      </p>

      <Formik
        initialValues={{
          disburseId: currentDisbursement?.id ?? "",
          amount: 0,
        }}
        onSubmit={(values: UpdateDisbursementModel) => {
          values.amount = Number(values.amount);
          console.log(values);
          disbursementStore.updateDisbursement(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomTextInput
              name="amount"
              type="text"
              placeholder="Enter remaining amount to complete disbursement. "
              required
              label="Balance"
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
