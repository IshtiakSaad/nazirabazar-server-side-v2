import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative max-w-7xl mx-auto lg:py-10 rounded-xl flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-500 blur-lg"></div>

      {/* Decorative Fluid Shape */}
      <div className="absolute -bottom-16 -left-20 w-[140%] h-[140%] bg-gradient-to-tl from-yellow-400 via-pink-500 to-purple-600 opacity-20 rounded-full blur-[120px]"></div>

      {/* Glassmorphic Panel */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-10 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white tracking-wide mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        >
          Share. Reduce. Nourish.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
        >
          Join a community committed to reducing food waste. Share surplus food
          and help nourish those in need. Together, we can make a difference.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
        >
          <a
            href="/signup"
            className="px-6 py-3 rounded-full bg-white/70 text-indigo-700 font-semibold shadow-lg hover:bg-white hover:text-indigo-900 transition duration-300"
          >
            Get Started
          </a>
          <a
            href="/add-food"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition duration-300"
          >
            Share Food
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
