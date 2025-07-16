"use client";

const SectionTitle = ({ heading, subHeading, className = "" }) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="max-w-3xl mx-auto px-4">
        {subHeading && (
          <p className="text-lg font-semibold text-purple-600 mb-4 tracking-wide uppercase">
            {subHeading}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          {heading}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
      </div>
    </div>
  );
};

export default SectionTitle;
