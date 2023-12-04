import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStore } from "../../../api/main/appStore";
import { adminFeatureLinks } from "../../../local-data/shared/adminFeatureLinks";
import { headerLinksData } from "../../../local-data/shared/headerLinksData";
import AccountTypeForm from "../../user-account/register/AccountTypeForm";
import DropdownNav from "../dropdown/DropdownNav";
import "./Header.css";

export default observer(function Header() {
  const { commonStore, userAccountStore } = useStore();

  return (
    <div className="header-container ">
      <Link to={"/"} className="logo-container">
        <img alt="Company-Logo" src="/Logo.svg" className="logo-img" />{" "}
      </Link>

      <div className="header-links-box">
        {userAccountStore.isAdmin && (
          <DropdownNav name="Admin" links={adminFeatureLinks} />
        )}

        {userAccountStore.isLoggedIn && (
          <NavLink
            to={"/dashboard"}
            className={`header-link ${
              window.location.pathname === "/dashboard"
                ? "header-link-active"
                : ""
            }`}
          >
            Dashboard
          </NavLink>
        )}
        {headerLinksData.map((el, index) => (
          <NavLink
            key={index}
            to={el.to}
            className={`header-link ${
              window.location.pathname === el.to ? "header-link-active" : ""
            }`}
          >
            {el.text}
          </NavLink>
        ))}
        {userAccountStore.isLoggedIn && (
          <NavLink
            to={"/account"}
            className={`header-link ${
              window.location.pathname === "/account"
                ? "header-link-active"
                : ""
            }`}
          >
            <Icon name="user" />
          </NavLink>
        )}
        {!userAccountStore.isLoggedIn && (
          <>
            <NavLink
              to={"/account/login"}
              className={`header-link ${
                window.location.pathname === "/account/login"
                  ? "header-link-active"
                  : ""
              }`}
            >
              Login
            </NavLink>
            <span
              className={`header-link`}
              onClick={() => commonStore.setModalContent(<AccountTypeForm />)}
            >
              Register
            </span>
          </>
        )}
      </div>
      <div
        className="drawer-nav-bar pointer-cursor"
        onClick={() => commonStore.setDrawerVisible(true)}
      >
        <Icon name="bars" />
      </div>
    </div>
  );
});
