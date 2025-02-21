import React from 'react';
import { Link } from 'react-router-dom';
import TextButton from './TextButton';

const FeatureCard = ({ imageSrc, imageClassName, title, description, textBtn, link }) => {
  return (
    <div className="overflow-hidden border border-3 rounded-lg text-left p-5 bg-main-white h-full">
      {imageSrc && <img src={imageSrc} alt={title} className={`w-8 ${imageClassName || ''}`} />}
      <h3 className="text-xl lg:text-2xl mt-2">{title}</h3>
      <p className="my-2 font-normal lg:text-lg ">{description}</p>
      
      {link && <Link to={link} className="text-primary inline-flex items-center text-lg">{textBtn && textBtn} <TextButton/></Link>}
    </div>
  );
};

export default FeatureCard;
