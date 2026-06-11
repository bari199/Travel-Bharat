import { useState } from "react";
import { adminLogin } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("LOGIN CLICKED"); // 👈 ADD THIS

    try {
      setLoading(true);

      const res = await adminLogin(formData);

      console.log("LOGIN RESPONSE:", res); // 👈 ADD THIS

      if (res?.token) {
        localStorage.setItem("adminToken", res.token);
        navigate("/");
      } else {
        console.log("NO TOKEN RECEIVED");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Logging..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
