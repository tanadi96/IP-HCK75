export default function Cards() {
  return (
    <>
      <div className="container mx-auto px-4 items-center">
        <div className="px-2">
          <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <Link
              style={{ textDecoration: "none" }}
              to={`/details/${id}`} // Adjust link to details page
            >
              <img
                alt={`${name}`}
                src={imageUrl}
                className="h-56 w-full object-cover"
              />
            </Link>
            <div className="bg-white p-4 sm:p-6 h-[200px]">
              <div className="py-1 h-30">
                <h3 className="mt-0.5 text-lg font-bold text-gray-900">
                  {name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{type}</p>
                <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                  {location}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg"
                  onClick={() => handleOnDelete(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
