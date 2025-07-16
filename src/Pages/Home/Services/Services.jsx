import {
  FaDrum,
  FaGuitar,
  FaMicrophone,
  FaMusic,
  FaPhoenixSquadron,
} from "react-icons/fa";

// Service data array
const serviceData = [
  {
    title: "Guitar",
    icon: <FaGuitar />,
  },
  {
    title: "Vocal",
    icon: <FaMicrophone />,
  },
  {
    title: "Drum",
    icon: <FaDrum />,
  },
  {
    title: "Music",
    icon: <FaMusic />,
  },
  {
    title: "Violine",
    icon: <FaMusic />,
  },
  {
    title: "Piano",
    icon: <FaPhoenixSquadron />,
  },
];

// Reusable ServiceCard component
const ServiceCard = ({ title, icon }) => (
  <div
    className="service card w-full  bg-fuchsia-50 border hover:bg-[#05345E] hover:text-white
    hover:border hover:border-black bg-transparent px-6 rounded text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105"
  >
    <figure className="px-10 pt-10">
      <span className="text-6xl">{icon}</span>
    </figure>
    <h2 className="card-title lg:text-2xl mx-auto mt-2 text-[#F86518] font-bold">
      {title}
    </h2>
    <p className="text-xs text-center mt-2 pb-10 opacity-70">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt.
    </p>
  </div>
);

const Services = () => {
  return (
    <div className="container  mx-auto  lg:my-20 my-12">
      <div className="ms-4">
        <p className="font-bold text-[#F86518]">OUR SERVICES</p>
        <h1 className="lg:text-5xl text-xl pt-1 font-bold lg:mb-10 text-[#05345E]">
          Featured service that we Provide
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceData.map((service, index) => (
          <ServiceCard key={index} title={service.title} icon={service.icon} />
        ))}
      </div>
    </div>
  );
};

export default Services;
