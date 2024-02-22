import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchCampaignList, fetchCampaignDetail } from "~/lib/apis/campaign";
import "./page.css";

export default function CampaignPage() {
  const [campaignList, setCampaignList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaignList().then((campaign) => {
      setCampaignList(campaign);
    });
  }, []);

  return (
    <Container className="min-vh-100">
      <h2>Campaign List</h2>
      <Row xs={1} md={4} className="g-4">
        {campaignList.map((item) => (
          <Col key={item.campaignId}>
            <Card
              className="card-fixed-height"
              onClick={(e) => {
                navigate(`/campaign/${item.campaignId}`); // 상세 페이지 이동
              }}
            >
              <Card.Img variant="top" src={item.photoUrl} />
              <Card.Body className="card-body-fixed-height">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-primary">
                  {item.achievementRate} 달성
                </Card.Text>
                <Card.Text className="text-muted fs-6">
                  {item.nickName}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
