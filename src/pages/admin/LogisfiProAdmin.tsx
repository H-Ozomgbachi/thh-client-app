import { Icon } from "semantic-ui-react";
import Shippers from "../../components/admin/logisfi-pro/shipper-registration/Shippers";
import Shipments from "../../components/admin/logisfi-pro/shipment/Shipments";
import Vendors from "../../components/admin/logisfi-pro/vendor-registration/Vendors";
import Header from "../../components/shared/header/Header";
import CustomVerticalTab from "../../components/shared/vertical-tab/CustomVerticalTab";
import Partners from "../../components/admin/logisfi-pro/partner/Partners";
import Disbursements from "../../components/admin/logisfi-pro/Disbursements/Disbursements";
export default function LogisfiProAdmin() {
  return (
    <>
      <Header />
      <CustomVerticalTab
        tabs={[
          { icon: <Icon name="shipping fast" />, text: "Shippers" },
          { icon: <Icon name="users" />, text: "Vendors" },
          { icon: <Icon name="handshake outline" />, text: "Partners" },
          { icon: <Icon name="bus" />, text: "Shipments" },
          { icon: <Icon name="money" />, text: "Disbursements" },
        ]}
        panels={[
          <Shippers />,
          <Vendors />,
          <Partners />,
          <Shipments />,
          <Disbursements />,
        ]}
      />
    </>
  );
}
