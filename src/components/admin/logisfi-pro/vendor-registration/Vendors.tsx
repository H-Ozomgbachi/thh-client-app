import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateVendorForm from "./CreateVendorForm";
const testData = [
  {
    id: 1,
    firstName: "Qudus",
    lastName: "Adeyemi",
    phoneNumber: "08179251327",
    accountName: "Guaranty Trust Bank",
    accountNumber: "0147689888",
  },
  {
    id: 2,
    firstName: "Qudus",
    lastName: "Adeyemi",
    phoneNumber: "08179251327",
    accountName: "Guaranty Trust Bank",
    accountNumber: "0147689888",
  },
  {
    id: 3,
    firstName: "Qudus",
    lastName: "Adeyemi",
    phoneNumber: "08179251327",
    accountName: "Guaranty Trust Bank",
    accountNumber: "0147689888",
  },
  {
    id: 4,
    firstName: "Qudus",
    lastName: "Adeyemi",
    phoneNumber: "08179251327",
    accountName: "Guaranty Trust Bank",
    accountNumber: "0147689888",
  },
  {
    id: 5,
    firstName: "Qudus",
    lastName: "Adeyemi",
    phoneNumber: "08179251327",
    accountName: "Guaranty Trust Bank",
    accountNumber: "0147689888",
  },
];
export default observer(function Vendors() {
  const { commonStore } = useStore();
  const [data] = useState(testData);

  return (
    <>
      <CustomDefaultTabHeading content="Vendor Registration" />

      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "First Name",
            "Last Name",
            "Phone Number",
            "Account Name",
            "Account Number",
          ]}
          data={data}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.firstName}</td>
              <td>{el.lastName}</td>
              <td>{el.phoneNumber}</td>
              <td>{el.accountName}</td>
              <td>{el.accountNumber}</td>
            </tr>
          )}
        />

        <Button
          content="Add New Vendor"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() => commonStore.setModalContent(<CreateVendorForm />)}
        />
      </div>
    </>
  );
});
