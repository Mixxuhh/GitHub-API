import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold"></Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300"></Link>
          <Link to="/saved" className="hover:text-gray-300"></Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
