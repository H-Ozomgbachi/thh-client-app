import { Icon } from "semantic-ui-react";
import Shippers from "../../components/admin/logisfi-pro/shipper-registration/Shippers";
import AvailableTrucks from "../../components/admin/logisfi-pro/available-trucks/AvailableTrucks";
import Trucks from "../../components/admin/logisfi-pro/truck-registration/Trucks";
import Vendors from "../../components/admin/logisfi-pro/vendor-registration/Vendors";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import TruckInTransit from "../../components/admin/logisfi-pro/truck-in-transit/TruckInTransit";
// import { useStore } from "../../api/main/appStore";
export default function LogisfiProAdmin() {
  // const { placeStore, organisationStore } = useStore();
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="shipping fast" />, text: "Shipper" },
          { icon: <Icon name="users" />, text: "Vendor" },
          { icon: <Icon name="book" />, text: "Truck Registry" },
          { icon: <Icon name="truck" />, text: "Available Trucks" },

          {
            icon: <Icon name="shipping fast" />,
            text: "Truck In-Transit",
          },
          { icon: <Icon name="archive" />, text: "Transaction History" },
        ]}
        panels={[
          <Shippers />,
          <Vendors />,
          <Trucks />,
          <AvailableTrucks />,
          <TruckInTransit />,
          <Shippers />,
        ]}
      />
    </>
  );
}
