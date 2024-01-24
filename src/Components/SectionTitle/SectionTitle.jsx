import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center  mt-12 mb-12  md:w-3/12">
      {/* <p className="text-xl  text-sky-700 font-bold mb-4">{subHeading}</p>
      <h3 className="text-teal-900	 text-2xl font-bold uppercase border-y-4  py-4">
        {heading}
      </h3> */}

      <h2 className="text-xl font-bold text-orange-500">{subHeading}</h2>
      <h2 className="text-4xl font-extrabold my-2">{heading}</h2>
    </div>
  );
};

export default SectionTitle;
