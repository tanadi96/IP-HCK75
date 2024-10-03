import SearchFS from "../component/SearchFS";
import Card from "../component/Cards";
import { useNavigate } from "react-router-dom";
import { Phase2Api } from "../helpers/Phase2Api";
import { useState } from "react";
import { useEffect } from "react";
import { axios } from "axios";

// declare state for movies
export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("ASC");
  const [selectedType, setSelectedType] = useState([]);
  const [lodgings, setLodgings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [types, setType] = useState([]);

  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      const { data } = await axios(
        {
          url: `https://localhost:3000/plants`,
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params: {
            q: search,
            sort,
            i: selectedType,
            pagination: {
              currentPage: 1,
              totalPage: 1,
              totalRows: 1,
            },
          },
        }

      );
      console.log(data);
      setLodgings(data.data.query);
      setTotalPages(data.data.pagination.currentPage);
    } catch (err) {
      // if err.status === 401
      localStorage.removeItem("access_token");
      navigate("/login");
      console.log(err, "<<< e - fetchLodging");
    }
  };
  const fecthType = async () => {
    try {
      const { data } = await Phase2Api.get(`/apis/pub/rent-room/types`, {
        params: {
          i: selectedType,
        },
      });

      setType(data.data);
    } catch (error) {
      console.log(error, "<<< e - fetchLodging");
    }
  };

  const handleOnDeleteLodging = async (lodgingId) => {
    try {
      await Phase2Api.delete(`/apis/pub/rent-room/lodgings/${lodgingId}`);
      await fetchPlants();
    } catch (err) {
      console.log(err, "<<< e - handleOnDeleteLodging");
    }
  };

  const prev = () => {
    setPage(page <= 1 ? 1 : page - 1);
    console.log(page);
  };
  const next = () => {
    setPage(page + 1);
    console.log(page);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    fecthType();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, [search, page, sort, selectedType]);
  console.log();

  return (
    <>
      <SearchFS
        setSearch={setSearch}
        setSort={setSort}
        setSelectedType={setSelectedType}
        setType={setType}
        types={types}
      />
      <div className="container mx-auto px-4 items-center grid grid-cols-4 gap-4 py-8">
        {lodgings.map((lodging) => {
          return (
            <>
              <Card
                key={lodging.id}
                lodging={lodging}
                handleOnDeleteLodging={handleOnDeleteLodging}
              />
            </>
          );
        })}
      </div>

      {/* pagination */}

      <nav
        aria-label="Page navigation"
        className="py-3 m-auto d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prev} disabled={page === 1}>
              «
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, i) => (
            <li
              key={i}
              className={`page-item ${i + 1 === page ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={next}
              disabled={page === totalPages}
            >
              »
            </button>
          </li>
        </ul>
      </nav>

      <div className="overflow-x-auto">
        <p className="flex justify-center text-xl">Table Type</p>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="p-4 text-sm text-white px-6 py-3 text-center">
                Id
              </th>
              <th className="p-4 text-sm text-white px-6 py-3 text-center">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                {" "}
                {/* Add a unique key for each row */}
                <th className="text-center">{type.id}</th>
                <td className="text-center">{type.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
