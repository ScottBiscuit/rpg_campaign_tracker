import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasicInfoCard from "../components/partyInfo/BasicInfoCard";
import ExtraInfoCard from "../components/partyInfo/ExtraInfoCard";
import BackstoryCard from "../components/partyInfo/BackstoryCard";
import GoalsCard from "../components/partyInfo/GoalsCard";
import AddPCModal from "../components/partyInfo/AddPCModal";
import PartyOverviewCard from "../components/partyInfo/PartyOverviewCard";
import DeletePCModal from "../components/partyInfo/DeletePCModal";
import EditPCModal from "../components/partyInfo/EditPCModal";

export default function Party() {
  const [user, setUser] = useState(null);
  const [party, setParty] = useState([]);

  useEffect(() => {
    generateParty();
    getUser();
  }, []);

  const generateParty = async () => {
    const res = await axios.get(`/api/party/`);

    setParty(res.data);
  };

  const getUser = async () => {
    const res = await axios.get("/api/auth");
    setUser(res.data.user);
  };

  const navigate = useNavigate();
  const handleNav = () => navigate("/login");

  const playerTabs = party.map((PC) => (
    <Tab eventKey={PC.pcId} title={PC.pcName} key={PC.pcId}>
      <BasicInfoCard PC={PC} party={party} setParty={setParty} />
      <GoalsCard PC={PC} party={party} setParty={setParty}/>
      <BackstoryCard PC={PC} party={party} setParty={setParty}/>
      <ExtraInfoCard PC={PC} party={party} setParty={setParty}/>
      <DeletePCModal PC={PC} party={party} setParty={setParty}/>
      <EditPCModal PC={PC} party={party} setParty={setParty}/>
    </Tab>
  ));

  return user ? (
    <Card className="">
      <Card.Title className="p-2">Party Info: Campaign Name Here</Card.Title>
      <Card.Body>
        <Tabs defaultActiveKey="overview" id="party-tabs" className="mb-3" >
          <Tab eventKey="overview" title="Overview">
            <PartyOverviewCard user={user} party={party} setParty={setParty} />
          </Tab>
          {playerTabs}
          <Tab eventKey="add" title="Add Player"></Tab>
        </Tabs>
      </Card.Body>
      <Card.Footer>
        <AddPCModal user={user} party={party} setParty={setParty}/>
      </Card.Footer>
    </Card>
  ) : (
    // <Card className="">
    //   <Card.Title className="p-2">Party Info: Campaign Name Here</Card.Title>
    //   <Card.Body>
    //     <Tabs defaultActiveKey="basics" id="party-tabs" className="mb-3">
    //       <Tab eventKey="basics" title="Basic Info">
    //         <BasicInfoCard user={user} />
    //       </Tab>
    //       <Tab eventKey="backstory" title="Backstory">
    //         <BackstoryCard user={user} />
    //       </Tab>
    //       <Tab eventKey="extras" title="Extras">
    //         <ExtraInfoCard user={user} />
    //       </Tab>
    //       <Tab eventKey="goals" title="Goals">
    //         <GoalsCard user={user} />
    //       </Tab>
    //     </Tabs>
    //   </Card.Body>
    //   <Card.Footer>
    //     <AddPCModal
    //       user={user}
    //     />
    //   </Card.Footer>
    // </Card>
    <Card>
      <Card.Title>
        You are not currently logged in. Click the link below to login.
      </Card.Title>
      <Button onClick={handleNav}>Login</Button>
    </Card>
  );
}
