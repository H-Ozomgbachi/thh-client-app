import { useStore } from "../../api/main/appStore";
import { useEffect, useState } from "react";
import CustomDefaultTabHeading from "../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../shared/table/SimpleTable";
import {
  DateOnlyFormat,
  NairaFormatter,
} from "../../helper-functions/sharedFunctions";
import NoResult from "../shared/no-result/NoResult";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import { InvestorDebtModel } from "../../api/models/truck-investment/investorDebt";

export default observer(function MyDebts() {
  const { investorDebtStore, investorStore } = useStore();
  const [groupedData, setGroupedData] = useState<
    [string, InvestorDebtModel[]][]
  >([]);

  useEffect(() => {
    if (investorDebtStore.investorDebts.length === 0) {
      (async function getData() {
        await investorDebtStore.getInvestorDebts(+investorStore.investorId!);

        const groupResultUsingLodash = _.groupBy(
          investorDebtStore.investorDebts,
          (e) => e.truckNumber
        );

        setGroupedData(Object.entries(groupResultUsingLodash));
      })();
    }
  }, [investorDebtStore, investorStore.investorId]);

  return (
    <>
      <CustomDefaultTabHeading content="My Debts" />
      {groupedData.length !== 0 ? (
        groupedData.map((data, index) => (
          <div key={index} className="shadow mt-3 p-2">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold">{data[0]}</h4>
              <h4 className="fw-bold text-danger">
                {NairaFormatter(_.sum(data[1].map((e) => e.balance)))}
              </h4>
            </div>
            <SimpleTable
              titles={["Date", "Description", "Amount", "Paid", "Balance"]}
              data={data[1]}
              tableBodyBuilder={(el) => (
                <tr key={el.id}>
                  <td>{DateOnlyFormat(el.dateAdded)}</td>
                  <td>{el.description}</td>
                  <td>{NairaFormatter(el.total)}</td>
                  <td>{NairaFormatter(el.paid)}</td>
                  <td>{NairaFormatter(el.balance)}</td>
                </tr>
              )}
            />
          </div>
        ))
      ) : (
        <NoResult content="You currently have no debts" />
      )}
    </>
  );
});
