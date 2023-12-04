import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import LandingFirstView from "../../components/home/LandingFirstView";
import LandingSecondView from "../../components/home/LandingSecondView";
import OurPromise from "../../components/home/OurPromise";
import PartnersClient from "../../components/home/PartnersClients";
import WhatsNew from "../../components/home/WhatsNew";
import Header from "../../components/shared/header/Header";

export default observer(function HomePage() {
  const { landingStore, marketOutlookStore } = useStore();

  useEffect(() => {
    if (landingStore.topTruckRequests.length === 0) {
      (async function getData() {
        await landingStore.getTopTruckRequests();
        await marketOutlookStore.getMarketOutlooks();
      })();
    }
  }, [landingStore, marketOutlookStore]);
  return (
    <>
      <Header />
      <LandingFirstView
        topTruckRequests={landingStore.topTruckRequests}
        marketOutlookArticles={marketOutlookStore.marketOutlooks}
      />
      <LandingSecondView />
      <WhatsNew />
      <OurPromise />
      <PartnersClient />
    </>
  );
});
