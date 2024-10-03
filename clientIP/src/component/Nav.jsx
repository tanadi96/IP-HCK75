import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div className="navbar bg-base-100">
        <Link className="btn btn-ghost text-xl" to={"/"}>TaniMap</Link>
      </div>
    </>
  );
}
