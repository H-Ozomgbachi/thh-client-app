import { observer } from "mobx-react-lite";
import SimpleTable from "../../../shared/table/SimpleTable";
import { useStore } from "../../../../api/main/appStore";
import { useEffect } from "react";
export default observer(function DisbursementHistory() {
  const { disbursementStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await disbursementStore.getAllDisbursements();
    })();
  }, [disbursementStore]);

  return (
    <>
      <div className="shadow-card p-3 mt-3">
        <SimpleTable
          titles={[
            "origin",
            "destination",
            "truck number",
            "waybill no",
            "account name",
            "account number",
            "bank name",
            "bank code",
            "total amount",
            "amount paid",
            "remaining amount",
            "disburse complete",
          ]}
          data={disbursementStore.disbursements}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.origin}</td>
              <td>{el.destination}</td>
              <td>{el.truckNumber} </td>
              <td>{el.waybillNo} </td>
              <td>{el.accountName} </td>
              <td>{el.accountNumber} </td>
              <td>{el.bankName} </td>
              <td>{el.bankCode} </td>
              <td>{el.totalAmount} </td>
              <td>{el.amountPaid} </td>
              <td>{el.remainingAmount} </td>
              <td>{`${el.disburseComplete}`} </td>
            </tr>
          )}
        />
      </div>
    </>
  );
});
