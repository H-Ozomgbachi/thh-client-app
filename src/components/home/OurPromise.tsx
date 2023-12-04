import { useRef, useState, useEffect } from "react";
import "./css/OurPromise.css";

export default function OurPromise() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0) {
        setVisible(true);
      }
    }, {});

    if (headRef.current) {
      observer.observe(headRef.current);
    }

    if (bodyRef.current) {
      observer.observe(bodyRef.current);
    }
  }, [headRef, bodyRef]);
  return (
    <div className="our-promise_container">
      <div className="our-promise">
        <h3
          className={`our-promise_heading ${visible ? "comeright" : ""}`}
          ref={headRef}
        >
          The Haulage Hub Promise
        </h3>

        <p
          className={`our-promise_text ${visible ? "comeleft" : ""}`}
          ref={bodyRef}
        >
          We promise to provide innovative load-matching platform that helps you
          run a profitable logistics business and take care of all your supply
          chain management to ensure that your shipments arrive safe, on time
          and within budget.
        </p>
      </div>
    </div>
  );
}
