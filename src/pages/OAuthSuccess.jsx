import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
console.log("OAuthSuccess Component");

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("OAuthSuccess Loaded");
    console.log(window.location.href);
    console.log(window.location.search);

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN =", token);

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } else {
      alert("TOKEN NOT FOUND");
      navigate("/login");
    }
  }, []);

  return <h1>OAuth Success</h1>;
}

export default OAuthSuccess;