import { NavLink, useNavigate } from "react-router-dom";
import "./burgerMenu.css";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import Login from "../login/Login";

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  const { role, setRole } = useAuth();
  const navigate = useNavigate();

  const disconnect = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/logout`, {
          withCredentials: true,
        })
        .then(() => {
          onClose();
          setRole("anonymous");
          navigate("/");
        });
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const [activeLink, setActiveLink] = useState(String);
  const links = [
    {
      name: "Accueil",
      path: "/",
      role: ["anonymous", "user", "admin"],
    },
    {
      name: "Catalogue",
      path: "/plants",
      role: ["anonymous", "user", "admin"],
    },
    {
      name: "Mon jardin",
      path: "/my-garden",
      role: ["user", "admin"],
    },
  ];

  //Login
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const closeModalLogin = () => {
    setIsModalLoginOpen(false);
    document.body.style.overflow = "";
  };
  const openModalLogin = () => {
    setIsModalLoginOpen(!isModalLoginOpen);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <ul className="menuDesktop">
        {links
          .filter((link) => link.role.includes(role))
          .map((link) => (
            <li key={link.name}>
              <NavLink to={link.path} onClick={handleLinkClick}>
                {link.name}
              </NavLink>
            </li>
          ))}
        {role !== "anonymous" ? (
          <button
            type="button"
            className={activeLink === "disconnect" ? "active" : ""}
            onClick={() => {
              setActiveLink("disconnect");
              disconnect();
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              openModalLogin();
            }}
          >
            Se connecter
          </button>
        )}
      </ul>

      <Login isOpen={isModalLoginOpen} onClose={closeModalLogin} />
    </div>
  );
};

export default BurgerMenu;
