import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navigation.css';
import logo from "../../logo.jpeg";

const Navigation = ({ withLogo }) => {
  const navClass = withLogo ? 'navigation navigation-with-logo' : 'navigation';
  return (
      <div className={navClass}>
        <div className="navigation-small">
          <Link className="link" to="/home">Home</Link>
          <Link className="link" to="/events">Events</Link>
        </div>
        {withLogo && <div className="navigation-small">
          <img width={192} src={logo}  alt="logo" />
        </div>}
        <div className="navigation-small">
          <Link className="link" to="/speakers">Speakers</Link>
          <Link className="link" to="/contact">Contact</Link>
        </div>

      </div>
  );
};
Navigation.propTypes = {
  withLogo: PropTypes.bool,
};
Navigation.defaultProps = {
  withLogo: false,
};
export default Navigation;
