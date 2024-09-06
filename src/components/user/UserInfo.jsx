import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Card,
  CardGroup,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import ChangeUserBio from "./ChangeUserBio";
import ChangePassword from "./ChangePassword";

export default function UserInfoCard({ user }) {
//   const [reviews, setReviews] = useState([]);
  const [userBio, setUserBio] = useState(user.bio);

//   useEffect(() => {
//     generateReviews();
//   }, []);

//   const generateReviews = async () => {
//     const res = await axios.get(`/api/reviews/${user.userId}`);
//     setReviews(res.data);
//   };

  return (

    user && (
      <Card className="m-2 p-2 bg-secondary-subtle">
        {/* <Card.Title className="p-3">My Info</Card.Title> */}
        <CardGroup>
          <Card className="m-2 p-3">
            <Card.Body>
              <Card.Title>Welcome back!</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Username: {user.username}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <ChangePassword />
            </Card.Footer>
          </Card>
          <Card className="m-2 p-3">
            <Card.Body>
              <Card.Subtitle className="mb-2">My Bio: </Card.Subtitle>
              <Card.Text>{userBio}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <ChangeUserBio userBio={userBio} setUserBio={setUserBio} />
            </Card.Footer>
          </Card>
        </CardGroup>
      </Card>
    )
  );
}
