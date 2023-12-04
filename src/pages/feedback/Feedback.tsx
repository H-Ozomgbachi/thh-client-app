import { useEffect } from "react";
import FeedbackContent from "../../components/feedback/FeedbackContent";
import Header from "../../components/shared/header/Header";
import "../../components/feedback/FeedbackContent.css";

export default function Feedback() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />

      <div className="feedback-content-box">
        <FeedbackContent />
      </div>
    </div>
  );
}
