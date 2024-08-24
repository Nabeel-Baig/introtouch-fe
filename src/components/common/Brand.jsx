import logo from "../../assets/images/wlom.png";

const Brand = ({username}) => {
  return (
    <div
      className="text-white font-inter w-fit font-bold leading-[1]"
      title="Intro Touch"
    >
      {username === 'Camille-Mardini-1683831887961' ? (
          <img width="250" src={logo} alt="Brand Logo" />
      ) : (
          <h1 className="text-xl">IntroTouch</h1>
      )}

    </div>
  );
};

export default Brand;
