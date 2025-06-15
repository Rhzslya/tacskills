const Square = ({ value, onClick }: { value: string; onClick: () => void }) => {
  return (
    <button
      className="w-20 h-20 border border-gray-400 text-2xl font-bold flex items-center justify-center hover:bg-gray-100 transition"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
