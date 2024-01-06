import { observer } from "mobx-react-lite";
// import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
// import { Divider, Icon } from "semantic-ui-react";
// import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import BasicHorizontalTab from "../../../shared/horizontal-tab/BasicHorizontalTab";
import PendingDisbursement from "./PendingDisbursement";
// import PendingDisbursement from "./PendingDisbursement";
export default observer(function Shipments() {
  // const { disbursementStore } = useStore();

  return (
    <>
      <CustomDefaultTabHeading content="Disbursements" />
      <BasicHorizontalTab
        tabs={[
          {
            text: "Pending Disbursements",
            icon: <Icon name="money" />,
          },
          {
            text: "Disbursement History",
            icon: <Icon name="book" />,
          },
        ]}
        panels={[<PendingDisbursement />, <h2>history</h2>]}
      />
    </>
  );
});
