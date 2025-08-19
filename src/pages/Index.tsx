
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login by default - in a real app you'd check auth status
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Index;
