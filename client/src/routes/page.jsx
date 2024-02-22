import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <Container className="min-vh-100">
      <h2>Main Page</h2>
      <Button
        onClick={(e) => {
          navigate("/campaign");
        }}
      >
        Campaign List로 이동하기
      </Button>
    </Container>
  );
}
