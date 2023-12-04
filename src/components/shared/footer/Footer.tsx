import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";
import "./Footer.css";
import { CustomTextInput } from "../custom-input/CustomInputs";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";

export default observer(function Footer() {
  const { userAccountStore } = useStore();

  return (
    <footer className="foot-container">
      <div className="row footer-row">
        <div className="col-lg-3">
          <span className="company-description">
            The Haulage Hub is a load-matching platform that connects truck and
            van owners to load owners in real-time. It is designed to enable
            traders, manufacturers, farmers and businesses to post loads on the
            platform, which is instantly sent to member drivers based on their
            real-time locations, the type of truck requested, the load
            specification and the driver's delivery destination.
          </span>
        </div>

        <div className="col-lg-3 offset-lg-1">
          <h3 className="mt-lg-0 mt-3">CONTACT US</h3>
          <span className="company-description">
            Phone: <a href="tel:+2348083779882">+2348083779882</a>
          </span>
          <br />
          <span className="company-description">
            Email:{" "}
            <a href="mailto:info@thehaulagehub.com">info@thehaulagehub.com</a>
          </span>
          <br />
          <span className="company-description">
            Address: 4th Floor, Niger Insurance House 302/304 Ikorodu Road,
            Anthony - Lagos
          </span>
        </div>

        <div className="col-lg-2">
          <h3 className="mt-lg-0 mt-3">QUICKLINKS</h3>
          <ul className="quick-links-container">
            <li>
              <Link to="/" className="quick-links">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="quick-links">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/feedback" className="quick-links">
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-lg-3">
          <h3 className="mt-lg-0 mt-3">NEWSLETTER</h3>
          <span className="company-description">
            Subscribe to our newsletter and we will inform you about newest
            projects and promotions.
          </span>
          <br />

          <Formik
            initialValues={{ emailAddress: "", error: null }}
            onSubmit={(values) =>
              userAccountStore.subscribeNewsLetter(values.emailAddress)
            }
            validationSchema={Yup.object({
              emailAddress: Yup.string()
                .required("Your email is required")
                .email(),
            })}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <CustomTextInput
                  name="emailAddress"
                  placeholder="Enter your email address"
                />

                <Button
                  loading={isSubmitting}
                  content="subscribe"
                  type="submit"
                  disabled={!isValid || !dirty}
                  color="vk"
                  className="official-form-btn"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <Divider />

      <div className="footer-row">
        <div className="text-center copy-right-text">
          &copy; {new Date().getFullYear()} The Haulage Hub | All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
});
