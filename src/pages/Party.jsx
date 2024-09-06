import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, CardGroup, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasicInfoCard from "../components/partyInfo/BasicInfoCard";
import ExtraInfoCard from "../components/partyInfo/ExtraInfoCard";
import BackstoryCard from "../components/partyInfo/BackstoryCard";
import GoalsCard from "../components/partyInfo/GoalsCard";

export default function Party() {
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
    <Card>
      <Card.Title className="p-2">Party Info: Campaign Name Here</Card.Title>
      <Card.Body>
        <Tabs defaultActiveKey="basics" id="party-tabs" className="mb-3">
          <Tab eventKey="basics" title="Basic Info">
            <BasicInfoCard user={user} />
          </Tab>
          <Tab eventKey="backstory" title="Backstory">
            <BackstoryCard user={user} />
          </Tab>
          <Tab eventKey="extras" title="Extras">
            <ExtraInfoCard user={user} />
          </Tab>
          <Tab eventKey="goals" title="Goals">
            <GoalsCard user={user} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  ) : (
    <Card>
      <Card.Title>
        You are not currently logged in. Click the link below to login.
      </Card.Title>
      <Button onClick={handleNav}>Login</Button>
    </Card>
  );
}
