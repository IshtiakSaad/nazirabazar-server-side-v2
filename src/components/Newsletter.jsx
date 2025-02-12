const Newsletter = () => {
    return (
      <div className="w-11/12 max-w-7xl mt-20 mx-auto rounded-lg mb-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 lg:px-6 py-12 text-white text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Stay Updated</h2>
        <p className="text-lg text-gray-300 mb-6">
          Subscribe to our newsletter for the latest updates and exclusive foods.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg font-semibold shadow-lg transition-all">
            Subscribe
          </button>
        </div>
      </div>
    );
  };
  
  export default Newsletter;
  