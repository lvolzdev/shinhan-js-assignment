import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MyNavbar from "~/components/MyNavbar/MyNavbar";

export default function Layout({}) {
  return (
    <>
      <MyNavbar brandTitle="Campaign List" />
      <Container className="min-vh-100">
        <Outlet />
      </Container>
    </>
  );
}
