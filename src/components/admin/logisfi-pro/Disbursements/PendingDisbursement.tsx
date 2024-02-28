import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import SimpleTable from "../../../shared/table/SimpleTable";
import { useStore } from "../../../../api/main/appStore";
import BalanceDisbursement from "./BalanceDisbursement";
import { useEffect } from "react";
export default observer(function PendingDisbursement() {
  const { disbursementStore, commonStore } = useStore();

  useEffect(() => {
    (async function getData() {
      await disbursementStore.getAllDisbursements(false);
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

            "",
          ]}
          data={disbursementStore.disbursements.filter(
            (shipment) => shipment.remainingAmount > 0
          )}
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
              <td>
                <Button
                  color="blue"
                  content="balance"
                  size="tiny"
                  onClick={() =>
                    commonStore.setModalContent(
                      <BalanceDisbursement currentDisbursement={el} />
                    )
                  }
                />
              </td>
            </tr>
          )}
        />
      </div>
    </>
  );
});
