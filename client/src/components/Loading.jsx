import {motion} from 'motion/react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-14 h-14 rounded-full border-2 border-neutral-800 border-t-white animate-spin" />

        <h1 className="text-white text-2xl font-serif">
          Sales Nova
        </h1>

        <p className="text-neutral-500 text-sm">
          Preparing your dashboard...
        </p>
      </motion.div>

    </div>
  );
}