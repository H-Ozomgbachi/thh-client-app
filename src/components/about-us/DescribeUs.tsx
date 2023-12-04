import "./DescribeUs.css";

interface Props {
  learnMoreBtn: () => void;
}

export default function DescribeUs({ learnMoreBtn }: Props) {
  return (
    <div className="describe-us-container">
      <div className="describe-us-card comeleft">
        <h2>About Us</h2>
        <p>
          The Haulage Hub was founded to reimagine digital logistics in regional
          West Africa by efficiently connecting shippers to carriers.
        </p>
        <button onClick={learnMoreBtn}>Learn More </button>
      </div>
    </div>
  );
}
