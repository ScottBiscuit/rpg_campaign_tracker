import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, CardGroup, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get("/api/auth");
    setUser(res.data.user);
  };

  const navigate = useNavigate();
  const handleNav = () => navigate("/login");

  return user ? (
    <div>User</div>
  ) : (
    <Card>
      <Card.Title>
        You are not currently logged in. Click the link below to login.
      </Card.Title>
      <Button onClick={handleNav}>Login</Button>
    </Card>
  )
}