import "./css/LandingSecondView.css";
import WhatWeDo from "./sub-components/what-we-do/WhatWeDo";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import AccountTypeForm from "../user-account/register/AccountTypeForm";
import { Icon } from "semantic-ui-react";

export default observer(function LandingSecondView() {
  const { commonStore } = useStore();

  return (
    <>
      <div className={`landing-second_view`}>
        <WhatWeDo
          icon={<Icon name="truck" />}
          heading="DO YOU OWN A TRUCK OR VAN?"
          detail="Our simple but powerful platform is designed to help you find
              loads for your truck or van in minutes."
          btnFunc={() => commonStore.setModalContent(<AccountTypeForm />)}
          actionText="REGISTER NOW"
        />
        <WhatWeDo
          icon={<Icon name="search" />}
          heading="LOOKING FOR A TRUCK OR VAN?"
          detail="Post your load and our system will locate available drivers near
              you in minutes."
          btnFunc={() => commonStore.setModalContent(<AccountTypeForm />)}
          actionText="REGISTER NOW"
        />
      </div>
    </>
  );
});
