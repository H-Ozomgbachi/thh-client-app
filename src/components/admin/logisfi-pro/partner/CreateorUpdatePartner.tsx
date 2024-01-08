import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { useStore } from "../../../../api/main/appStore";
import { proPartnerData } from "../../../../api/models/logisfi-pro/partner";

interface Props {
  currentPartner: proPartnerData | null;
}

export default observer(function CreateorUpdateProPartner({
  currentPartner,
}: Props) {
  const { proPartnerStore } = useStore();

  const INITIAL_VALUES = {
    partnerCode: currentPartner?.partnerCode ?? "",
    name: currentPartner?.name ?? "",
    accountName: currentPartner?.accountName ?? "",
    accountNumber: currentPartner?.accountNumber ?? "",
    bankCode: currentPartner?.bankCode ?? "",
  };
  return (
    <>
      <h5 className="text-secondary">
        {currentPartner ? "Update partner data" : "Create new partner"}
      </h5>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { setErrors }) => {
          currentPartner
            ? proPartnerStore.updatePartner(values)
            : proPartnerStore.createPartner(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {currentPartner ? null : (
              <CustomTextInput
                name="partnerCode"
                placeholder="Enter partner code"
                label="Partner Code"
                required
              />
            )}
            <CustomTextInput
              name="name"
              placeholder="Enter partner name"
              label="Name"
              required
            />
            <CustomTextInput
              name="accountName"
              placeholder="Enter account name"
              label="Account Name"
            />
            <CustomTextInput
              name="accountNumber"
              placeholder="Enter account number"
              label="Account Number"
              required
            />
            <CustomTextInput
              name="bankCode"
              placeholder="Enter bank code"
              label="Bank Code"
              required
            />
            <Button
              loading={isSubmitting}
              content={currentPartner ? "Continue" : "Add new partner"}
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
