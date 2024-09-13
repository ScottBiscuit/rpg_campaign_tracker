import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardGroup} from "react-bootstrap";
import LoginForm from "../components/user/LoginForm";
import RegisterForm from "../components/user/RegisterForm";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post("/api/auth", formData);

    if (res.data.success) {
      navigate("/party");
    } else {
      alert("Login details incorrect. Please try again.");
    }
  };

  const handleSignup = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post("/api/user", formData);

    if (!res.data.error) {
      navigate("/login");
    } else {
      alert(res.data.error);
    }
  };

  return (
    <>
      <Card className="text-center">
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="bg-dark-subtle p-2">
                  Log In
                </Card.Title>
                <Card.Text className="p-2">
                  <LoginForm onLogin={handleLogin} />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title className="bg-dark-subtle p-2">
                  Register
                </Card.Title>
                <Card.Text className="p-2">
                  <RegisterForm onLogin={handleSignup} />
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
      </Card>
    </>
  );
}
