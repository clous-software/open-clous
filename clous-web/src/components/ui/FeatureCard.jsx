import React from 'react';
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, description, textBtn, buttonLink, buttonClass, onButtonClick }) => {
  const ButtonContent = () => (
    <div className={`${buttonClass} text-primary inline-flex`} onClick={onButtonClick}>
      {textBtn}
    </div>
  );

  return (
    <div className="overflow-hidden max-w-2xl flex text-left bg-main-white mb-16">
      {icon}
      <div><h2 className="text-3xl lg:text-5xl">{title}</h2>
      <p className="mt-2 font-normal text-base lg:text-xl">{description}</p>
      </div>
      

      {/*{buttonLink ? (
        <Link to={buttonLink}>
          <ButtonContent />
        </Link>
      ) : (
        <ButtonContent />
      )}*/}
      </div>
    /*<div className="overflow-hidden border border-3 rounded-lg text-left p-5 bg-main-white h-full">
      {icon}
      <h3 className="text-xl lg:text-2xl mt-2">{title}</h3>
      <p className="mt-2 font-normal lg:text-lg">{description}</p>
      {buttonLink ? (
        <Link to={buttonLink}>
          <ButtonContent />
        </Link>
      ) : (
        <ButtonContent />
      )}
      </div>*/
  );
};

export default FeatureCard;
