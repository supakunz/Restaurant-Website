const LoadingCard = () => {
  return (
    <section>
      <div className="flex flex-col items-center text-center p-6 gap-y-4 bg-white rounded-xl shadow-sm">
        <div className="animate-pulse w-[110px] h-[110px] bg-gray-200 rounded-full"></div>
        <p className="w-[52px] h-[28px] animate-pulse bg-gray-200 rounded-full"></p>
        <h3 className="w-[80%] h-[25px] animate-pulse bg-gray-200 rounded-full"></h3>
        <p className="w-[30%] h-[25px] animate-pulse bg-gray-200 rounded-full"></p>
        <p className="w-[50%] h-[25px] animate-pulse bg-gray-200 rounded-full"></p>
        <div className="flex gap-4">
          <p className="w-[40px] h-[25px] animate-pulse bg-gray-200 rounded-full"></p>
          <p className="w-[40px] h-[25px] animate-pulse bg-gray-200 rounded-full"></p>
          <p className="w-[40px] h-[25px] animate-pulse bg-gray-200 rounded-full"></p>
        </div>
      </div>
    </section>
  );
};

export default LoadingCard;
