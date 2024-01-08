import { useStore } from "../../../../api/main/appStore";
import { Formik, Form } from "formik";
import { Button, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import * as CustomInputs from "../../../shared/custom-input/CustomInputs";
import { CustomTextInput } from "../../../shared/custom-input/CustomInputs";
import { proShipperData } from "../../../../api/models/logisfi-pro/shipper";
import { proVendorData } from "../../../../api/models/logisfi-pro/vendor";
import { proPartnerData } from "../../../../api/models/logisfi-pro/partner";
interface Props {
  shippers: proShipperData[];
  vendors: proVendorData[];
  partners: proPartnerData[];
}
export default observer(function CreateShipment({
  shippers,
  vendors,
  partners,
}: Props) {
  const { proShipmentStore } = useStore();
  const INITIAL_VALUES = {
    shipperCode: "",
    vendorCode: "",
    partnerCode: "",
    truckNumber: "",
    driverName: "",
    driverPhone: "",
    driverLicenseNo: "",
    origin: "",
    destination: "",
    shipmentPrice: 0,
    vendorPrice: 0,
    allowShipperApprove: true,
  };

  return (
    <>
      <div className="p-3 mt-3 shadow-card">
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={(values) => {
            console.log(values);
            proShipmentStore.createShipment(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomInputs.CustomSelect
                name="shipperCode"
                label="Shipper code"
                children={
                  <>
                    <option value={""}>Select shipper code</option>

                    {shippers.map((el, id) => (
                      <option key={el.shipperCode} value={el.shipperCode}>
                        {el.shipperCode}
                      </option>
                    ))}
                  </>
                }
                required
              />
              <CustomInputs.CustomSelect
                name="vendorCode"
                label="Vendor code"
                children={
                  <>
                    <option value={""}>Select vendor code</option>

                    {vendors.map((el, id) => (
                      <option key={el.vendorCode} value={el.vendorCode}>
                        {el.vendorCode}
                      </option>
                    ))}
                  </>
                }
                required
              />
              <CustomInputs.CustomSelect
                name="partnerCode"
                label="Partner code"
                children={
                  <>
                    <option value={""}>Select partner code</option>

                    {partners.map((el, id) => (
                      <option key={el.partnerCode} value={el.partnerCode}>
                        {el.partnerCode}
                      </option>
                    ))}
                  </>
                }
                required
              />

              <CustomTextInput
                name="truckNumber"
                placeholder="Enter truck number"
                label="Truck Number"
                required
              />
              <CustomTextInput
                name="driverName"
                placeholder="Enter driver name"
                label="Driver Name"
                required
              />
              <CustomTextInput
                name="driverPhone"
                placeholder="Enter driver contact number"
                label="Driver Contact"
                required
              />
              <CustomTextInput
                name="driverLicenseNo"
                placeholder="Enter driver license number"
                label="Driver License Number"
                required
              />
              <CustomTextInput
                name="origin"
                placeholder="Enter origin"
                label="Origin"
                required
              />
              <CustomTextInput
                name="destination"
                placeholder="Enter destination"
                label="Destination"
                required
              />
              <CustomTextInput
                name="shipmentPrice"
                placeholder="Enter shipment price"
                label="Shipment Price"
                required
              />
              <CustomTextInput
                name="vendorPrice"
                placeholder="Enter vendor price"
                label="Vendor Price"
                required
              />

              <Divider />
              <em className="d-block toggle-warning">
                Please only select if you want to receive shipper's approval
                before disbursement
              </em>
              <CustomInputs.CustomCheckboxInput
                name="allowShipperApprove"
                label="Shipper Approval"
                type="checkbox"
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
      </div>
    </>
  );
});

{
  /* <CustomTextInput
                name="shipperCode"
                placeholder="Enter shipper code"
                label="Shipper Code"
                required
              /> */
}
{
  /* <CustomTextInput
                name="vendorCode"
                placeholder="Enter vendor code"
                label="Vendor Code"
                required
              />
              <CustomTextInput
                name="partnerCode"
                placeholder="Enter partner code"
                label="Partner Code"
                required
              /> */
}
