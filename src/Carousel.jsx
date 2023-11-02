import React, { useEffect, useState } from "react";
import { shortList, longList, list } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slide from "./Slide";

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [personIndex, setPersonIndex] = useState(0);

  const prevSlide = () => {
    setPersonIndex((old) => {
      return (old + people.length - 1) % people.length;
    });
  };
  const nextSlide = () => {
    setPersonIndex((old) => {
      return (old + 1) % people.length;
    });
  };

  useEffect(() => {
    const interId = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      clearInterval(interId);
    };
  }, [personIndex]);

  return (
    <section className="slider-container">
      {people.map(({ id, image, name, title, quote }, index) => {
        return (
          <article
            className="slide"
            key={id}
            style={{
              transform: `translateX(${100 * (index - personIndex)}%)`,
              opacity: personIndex === index ? 1 : 0,
              visibility: personIndex === index ? "visible" : "hidden",
            }}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="name" />
          </article>
        );
      })}
      <button>
        <FiChevronLeft className="prev" onClick={prevSlide} />
      </button>
      <button>
        <FiChevronRight className="next" onClick={nextSlide} />
      </button>
    </section>
  );
};

export default Carousel;

//                 8 % 2 = 0
// const modulo = 8 % 3 = 2

//                 8 % 4 = 0
//                 8 % 5 = 3
