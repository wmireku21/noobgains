export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-black text-center">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center font-sans tracking-tight">
        <h1 
          className="text-7xl sm:text-8xl md:text-[10rem] font-black text-[#ff5500] leading-none mb-6 md:mb-10 transition-transform hover:scale-105 duration-500 ease-out cursor-default"
          style={{ textShadow: "0 4px 30px rgba(255, 85, 0, 0.4)" }}
        >
          NOOB GAINS
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed md:leading-normal">
          The blog is retired. <br className="hidden sm:block" />
          We are now in the lab, focusing on physical products to fuel your progress.
        </p>
      </div>
    </main>
  );
}
