import { useState, useEffect } from "react";

const withSlider = (Component: any, getData: () => number) => {
  return (props: any) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
      setSlide(getData());
    }, []);

    function changeSlide(i: number) {
      setSlide((slide) => slide + i);
    }

    return (
      <Component
        {...props}
        slide={slide}
        autoplay={autoplay}
        changeSlide={changeSlide}
        setAutoplay={setAutoplay}
      />
    );
  };
};

const getDataFromFirstFetch = () => {
  return 10;
};
const getDataFromSecondFetch = () => {
  return 20;
};

const SliderFirst = (props: any) => {
  const { slide, changeSlide } = props;
  return (
    <div className="container">
      <div className="slider w-50 m-auto">
        <img
          className="d-block w-100"
          src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="slide"
        />
        <div className="text-center mt-5">Active slide {slide}</div>
        <div className="buttons mt-3">
          <button className="btn btn-primary me-2" onClick={() => changeSlide(-1)}>
            -1
          </button>
          <button className="btn btn-primary me-2" onClick={() => changeSlide(1)}>
            +1
          </button>
        </div>
      </div>
    </div>
  );
};

const SliderSecond = (props: any) => {
  const { setAutoplay, changeSlide, slide, autoplay } = props;
  return (
    <div className="container">
      <div className="slider w-50 m-auto">
        <img
          className="d-block w-100"
          src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="slide"
        />
        <div className="text-center mt-5">
          Active slide {slide} <br />
          {autoplay ? "auto" : null}{" "}
        </div>
        <div className="buttons mt-3">
          <button className="btn btn-primary me-2" onClick={() => changeSlide(-1)}>
            -1
          </button>
          <button className="btn btn-primary me-2" onClick={() => changeSlide(1)}>
            +1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setAutoplay((autoplay: boolean) => !autoplay)}
          >
            toggle autoplay
          </button>
        </div>
      </div>
    </div>
  );
};

const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

const withLogger = (WrapperedComponent: any) => {
  return (props: any) => {
    useEffect(() => {
      console.log("First render");
    }, []);
    return <WrapperedComponent {...props} />;
  };
};

const Hello = () => {
  return <h2>Hello</h2>;
};

const HelloWithLogger = withLogger(Hello);

const HocComponent = () => {
  return (
    <>
      <HelloWithLogger />
      <SliderWithFirstFetch />
      <SliderWithSecondFetch />
    </>
  );
};

export default HocComponent;
