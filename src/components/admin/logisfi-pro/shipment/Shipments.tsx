import { observer } from "mobx-react-lite";
// import { useEffect } from "react";
import { Icon } from "semantic-ui-react";
// import { Divider, Icon } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import BasicHorizontalTab from "../../../shared/horizontal-tab/BasicHorizontalTab";
import CreateShipment from "./CreateShipment";
import PendingWaybill from "./PendingWaybill";
import PendingMobilization from "./PendingMobilization";
import { useEffect } from "react";

export default observer(function Shipments() {
  const { proShipperStore, proVendorStore, proPartnerStore } = useStore();
  useEffect(() => {
    (async function getData() {
      await proShipperStore.getAllShippers();
      await proVendorStore.getAllVendors();
      await proPartnerStore.getAllPartners();
    })();
  }, [proShipperStore, proVendorStore, proPartnerStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Shipments" />
      <BasicHorizontalTab
        tabs={[
          {
            text: "New Shipment",
            icon: <Icon name="pencil" />,
          },
          {
            text: "Pending Waybill",
            icon: <Icon name="clock" />,
          },
          {
            text: "Pending Mobilization",
            icon: <Icon name="money" />,
          },
          // {
          //   text: "Shipment History",
          //   icon: <Icon name="book" />,
          // },
        ]}
        panels={[
          <CreateShipment
            shippers={proShipperStore.shippers}
            vendors={proVendorStore.vendors}
            partners={proPartnerStore.partners}
          />,
          <PendingWaybill />,
          <PendingMobilization />,
          // <h2>d</h2>,
        ]}
      />
    </>
  );
});
