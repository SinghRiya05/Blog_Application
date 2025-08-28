export default function SmallCard({ num, content, Icon }) {
  return (
    <div className="mt-8 mx-4 w-56 md:w-60 lg:w-64">
      <div className="relative bg-white border rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out">
        
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-400"></div>

        {/* Icon + Number */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600 shadow-sm">
            <Icon size={28} />
          </div>
          <span className="text-2xl font-bold text-gray-800">{num}</span>
        </div>

        {/* Divider */}
        <div className="w-12 border-b-2 border-blue-200 my-3"></div>

        {/* Content */}
        <p className="text-base font-medium text-gray-600 italic">
          {content}
        </p>
      </div>
    </div>
  );
}
