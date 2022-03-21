import "./appBanner.scss";
const avengersLogo = require("../../resources/img/Avengers_logo.png");
const avengers = require("../../resources/img/Avengers.png");

const AppBanner = () => {
  return (
    <div className="app__banner">
      <img src={avengers} alt="Avengers" />
      <div className="app__banner-text">
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <img src={avengersLogo} alt="Avengers logo" />
    </div>
  );
};

export default AppBanner;
