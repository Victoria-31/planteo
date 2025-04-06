import axios from "axios";
import "./signup.css";
import { useState } from "react";
import Login from "../login/Login";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUp({ isOpen, onClose }: LoginProps) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
  });

  const [checked, setChecked] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setError("");
  };

  const toggleCheck = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error("La requête a été annulée après 10 minutes d'attente.");
    }, 600000);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.password_confirmation,
        },
        {
          withCredentials: true,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.info(response);
      setIsSignIn(true);
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Une erreur est survenue.");
        console.error(error.response?.data);
      } else {
        console.error("Erreur lors de la soumission", error);
        setError("Erreur inconnue.");
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <dialog className="dialog_signup" open={isOpen}>
      {isSignIn ? (
        <Login isOpen={isOpen} onClose={onClose} />
      ) : (
        <form onSubmit={handleSubmit} className="opening_register">
          <h2>S'inscrire</h2>

          <button className="cancel-box" type="button" onClick={onClose}>
            Annuler
          </button>

          <div className="register_content">
            <p className="register_text">Déjà inscrit ?</p>
            <button
              className="register_button"
              type="button"
              onClick={() => setIsSignIn(true)}
            >
              Se connecter
            </button>
          </div>

          <div className="user_form">
            <label htmlFor="user-lastname">
              Nom<span className="star"> *</span>
            </label>
            <input
              type="text"
              id="user-lastname"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />

            <label htmlFor="user-email">
              Email<span className="star"> *</span>
            </label>
            <input
              type="email"
              id="user-email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Votre e-mail"
              required
            />
            {error && <p className="errorMessage">{error}</p>}

            <label htmlFor="user-password">
              Mot de passe<span className="star"> *</span>
            </label>
            <div className="password_input">
              <input
                className="input_password"
                type="password"
                id="user-password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                required
              />
            </div>
            <p>
              {credentials.password.length >= 8 ? "✅" : "❌"} Longueur :{" "}
              {credentials.password.length} / 8
            </p>

            <label htmlFor="password_confirmation">
              Confirmez votre mot de passe<span className="star"> *</span>
            </label>
            <div className="password_input">
              <input
                className="input_password"
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={credentials.password_confirmation}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
            {credentials.password === credentials.password_confirmation ? (
              <span style={{ color: "green" }}>
                ✅ Les mots de passe correspondent
              </span>
            ) : (
              <span style={{ color: "red" }}>
                ❌ Les mots de passe ne correspondent pas
              </span>
            )}

            <label htmlFor="checkbox" className="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={toggleCheck}
              />
              <p>
                En cochant cette case, vous acceptez les CGU.
                <span className="star"> *</span>
              </p>
            </label>

            <button type="submit" className="colored-box" disabled={!checked}>
              Créer un compte
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
