import { Icon } from "semantic-ui-react";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import Routes from "../../components/admin/trans-tracker/routes/Routes";
import TruckSize from "../../components/admin/trans-tracker/truck-sizes/TruckSize";

export default function TransactionTrackerAdmin() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="road" />, text: "Transactions" },
          { icon: <Icon name="road" />, text: "Routes" },
          { icon: <Icon name="shipping fast" />, text: "Shippers" },
          { icon: <Icon name="money" />, text: "Shipper's Prices" },
          { icon: <Icon name="users" />, text: "Vendors" },
          {
            icon: <Icon name="money bill alternate outline" />,
            text: "Vendor's Prices",
          },
          { icon: <Icon name="truck" />, text: "Truck Sizes" },
        ]}
        panels={[
          <></>,
          <Routes routes={[]} />,
          <></>,
          <></>,
          <></>,
          <></>,
          <TruckSize truckSizes={[]} />,
        ]}
      />
    </>
  );
}
