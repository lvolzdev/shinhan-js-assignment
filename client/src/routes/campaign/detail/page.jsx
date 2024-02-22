import React, { useEffect, useState } from "react";
import { Container, Button, ListGroup, Card } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchCampaignDetail } from "~/lib/apis/campaign";

export default function CampaignDetailPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [campaignDetail, setCampaignDetail] = useState([]);

  useEffect(() => {
    fetchCampaignDetail(params.campaignId).then((data) => {
      setCampaignDetail(data);
    });
  }, [params.campaignId]);

  return (
    <Container className="min-vh-100">
      <h3>Campaign Detail Page</h3>

      {/* 캠페인 상세 */}
      <ListGroup as="ul">
        {campaignDetail.map(
          // TODO
          // campaignDetail이 아니라, 댓글 리스트 조회로 가져와야 됨.
          (item) => (
            <Link key={item.campaignId}>
              <ListGroup.Item
                as="li"
                action
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto text-truncate">
                  <div className="fw-light">[{item.categoryName}]</div>
                  <div className="fw-light">{item.nickName}</div>
                  <div className="fw-bold">{item.title}</div>
                  <div>
                    <img
                      src={item.photoUrl}
                      style={{ width: "50%", height: "50%" }}
                    />
                  </div>
                  <div>{item.achievementRate}달성</div>
                  <Button onClick={() => navigate(-1)}>뒤로가기</Button>

                  {/* 댓글 목록 */}
                  <div>
                    {item.comments.map((comment) => (
                      <div key={comment.commentId}>
                        <Card style={{ marginBottom: "10px" }}>
                          <Card.Body>
                            <Card.Text>{comment.body}</Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">
                              {comment.userNickName}
                            </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                              {comment.whenCreated}
                            </Card.Subtitle>
                          </Card.Body>
                        </Card>
                        {/* 대댓글 표시 */}
                        {/* TODO */}
                      </div>
                    ))}
                  </div>
                </div>
              </ListGroup.Item>
            </Link>
          )
        )}
      </ListGroup>
    </Container>
  );
}
