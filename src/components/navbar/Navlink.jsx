import React from 'react';
import { Link } from 'react-router-dom';

const Navlink = ({ data }) => {
  return (
    <Link to={data.to}>
      <img src={data.icon} alt="" className="h-6 mx-auto invert" />
      <p className="text-[12px] font-[300] font-inter m-0">{data.title}</p>
    </Link>
  );
};

export default Navlink;
