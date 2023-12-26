import { FieldArray, Form, Formik } from "formik";
// import * as CustomInputs from "../../../shared/custom-input/CustomInputs";
import { Divider, Icon } from "semantic-ui-react";
import VerifyTruckDetail from "./VerifyTruckDetail";

import { observer } from "mobx-react-lite";
import {
  CustomSelect,
  CustomTextInput,
} from "../../../shared/custom-input/CustomInputs";
// import { Divider } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import "./Trucks.css";
import { Button } from "semantic-ui-react";

// interface Props {
//   shippers: ListItemView[];
//   transporters: CarrierOrganisation[];
//   places: PlaceData[];
//   organisation: OrganisationData | null;
//   isShipper: boolean;
// }

// {
//   shippers,
//   transporters,
//   places,
//   organisation,
//   isShipper,
// }: Props

export default observer(function Truck() {
  // const INITIAL_VALUES = {
  //   shipperId: isShipper ? organisation!.id : 0,
  //   shipperName: isShipper ? organisation!.name : "",
  //   transporterId: 0,
  //   transporterName: "",
  //   driverName: "",
  //   driverPhone: "",
  //   destination: "",
  //   truckNumber: "",
  //   truckSize: 0,
  //   shipperEmail: isShipper ? organisation!.contactEmail : "",
  //   transporterEmail: "",
  //   transporterPhone: "",
  // };
  const { commonStore } = useStore();
  const INITAL_VALUES = {
    vendorName: "",
    shipperName: "",
    file: null,
    trucks: [""],
  };
  const payloadObject = (values: any) => {
    return {
      ...values,
    };
  };

  return (
    <>
      <h3>Truck Registration</h3>
      <p>Provide required information to register a truck</p>

      <div className="available-trucks-table shadow-card">
        <Formik
          initialValues={INITAL_VALUES}
          onSubmit={(values) => alert(JSON.stringify(values, null, 10))}
        >
          {({ handleSubmit, isSubmitting, setFieldValue, values }) => {
            return (
              <Form>
                <CustomSelect
                  name="vendorName"
                  label="Vendor"
                  type="text"
                  children={
                    <>
                      <option value={0}>select vendor</option>
                      <option value={1}>Henry Foods</option>
                      <option value={2}>Qudus and Co</option>
                    </>
                  }
                  required
                />
                <CustomSelect
                  name="shipperName"
                  label="Shipper"
                  type="text"
                  children={
                    <>
                      <option value={0}>select shipper</option>
                      <option value={1}>Henry Foods</option>
                      <option value={2}>Qudus and Co</option>
                    </>
                  }
                  required
                />

                <FieldArray
                  name="trucks"
                  render={(arrayHelpers) => (
                    <div>
                      {values.trucks.map((truck, index) => (
                        <div key={index}>
                          <h4>Truck {index + 1}</h4>
                          <div className="truck-card-container">
                            <div className="truck-card__item">
                              <CustomTextInput
                                name={`truck[${index}].number`}
                                placeholder="Enter truck number"
                                label={`Truck No.`}
                                required
                              />
                            </div>
                            <div className="truck-card__item">
                              <CustomTextInput
                                name={`truck[${index}].size`}
                                placeholder="Enter truck size"
                                label="Truck Size"
                                required
                              />
                            </div>
                          </div>
                          <h4>Driver details</h4>
                          <div className="driver-card-container">
                            <div className="driver-card">
                              <div>
                                <CustomTextInput
                                  name={`truck[${index}].driverName`}
                                  placeholder="Enter driver's name"
                                  label="Name"
                                  required
                                />
                              </div>
                              <div>
                                <CustomTextInput
                                  name={`truck[${index}].driverNumber`}
                                  placeholder="Enter driver's phone number"
                                  label="Phone"
                                  required
                                />
                              </div>
                            </div>

                            <div className="driver-card__upload">
                              <div>
                                <CustomTextInput
                                  name={`truck[${index}].driverFile`}
                                  type="file"
                                  onBlurCapture={(event) => {
                                    setFieldValue("file", event.target.name);
                                  }}
                                  label="Upload Driver's License"
                                />
                              </div>

                              <div>
                                <Button
                                  icon="upload"
                                  color="vk"
                                  content="Upload license"
                                />
                              </div>
                            </div>

                            <h4>Shipper details</h4>
                            <div className="shipper-card-container">
                              <div>
                                <CustomSelect
                                  name={`truck[${index}].productType`}
                                  label="Product Type"
                                  type="text"
                                  children={
                                    <>
                                      <option value={0}>
                                        select type of product
                                      </option>
                                      <option value={1}>Biscuit</option>
                                      <option value={2}>Sweet</option>
                                    </>
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="destination-card">
                              <div>
                                <CustomSelect
                                  name={`truck[${index}].destination`}
                                  label="Destination"
                                  type="text"
                                  children={
                                    <>
                                      <option value={0}>
                                        select destination
                                      </option>
                                      <option value={1}>Lagos</option>
                                      <option value={2}>Ibadan</option>
                                    </>
                                  }
                                  required
                                />
                              </div>
                              <div>
                                <CustomTextInput
                                  name={`truck[${index}].destinationPrice`}
                                  placeholder="Enter destination price"
                                  label="Destination Price"
                                  required
                                />
                              </div>
                              <div>
                                <CustomTextInput
                                  name={`truck[${index}].vendorPrice`}
                                  placeholder="Enter vendor price"
                                  label="Vendor Price"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="route-remove-btn"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Icon
                              name="trash alternate outline"
                              className="p-0 m-0"
                            />
                          </button>
                          <Divider />
                        </div>
                      ))}

                      {values.trucks.length < 5 ? (
                        <button
                          className="expense-add-btn"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              number: "",
                              size: "",
                              driverName: "",
                              driverNumber: "",
                              driverFile: "",
                              shipperName: "",
                              productType: "",
                              destination: "",
                              destinationPrice: "",
                              vendorPrice: "",
                            })
                          }
                        >
                          + Add New Truck
                        </button>
                      ) : null}
                    </div>
                  )}
                />

                <Button
                  loading={isSubmitting}
                  className="official-form-btn"
                  content="Submit"
                  icon="book"
                  type="submit"
                  color="vk"
                  onClick={() =>
                    commonStore.setModalContent(
                      <VerifyTruckDetail
                        submitMethod={handleSubmit}
                        values={payloadObject(values)}
                      />
                    )
                  }
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
});
