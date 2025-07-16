const Banner = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://i.ibb.co/PF9Q1zP/pexels-moose-photos-1037992.jpg')`,
      }}
    >
      <div className="text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
          SUMMER
          <span className="block text-yellow-400">MUSIC CAMP</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
          Discover your musical passion this summer
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Join Now
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Floating musical notes animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-white text-2xl opacity-30 animate-bounce">
          ♪
        </div>
        <div className="absolute top-32 right-20 text-yellow-400 text-3xl opacity-40 animate-pulse">
          ♫
        </div>
        <div
          className="absolute bottom-40 left-20 text-white text-xl opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          ♪
        </div>
        <div
          className="absolute bottom-60 right-10 text-yellow-400 text-2xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          ♫
        </div>
      </div>
    </div>
  );
};

export default Banner;
