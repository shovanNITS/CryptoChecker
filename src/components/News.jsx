import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Avatar, Card, Button } from 'antd';
import moment from 'moment';

import { fetchCryptoNews } from '../services/newsApi';
import { LoadingOutlined } from '@ant-design/icons';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const [cryptoNews, setCryptoNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(simplified ? 6 : 12);

  useEffect(() => {
    setLoading(true);
    fetchCryptoNews()
      .then(data => {
        setCryptoNews(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) return <LoadingOutlined />;
  if (error) return <div>Error: {error}</div>;
  if (!cryptoNews || !Array.isArray(cryptoNews) || cryptoNews.length === 0) return <div>No news found.</div>;

  return (
    <>
      <Row gutter={[24, 24]}>
        {cryptoNews.slice(0, visibleCount).map((news, idx) => (
          <Col xs={24} sm={12} lg={8} key={idx}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.title}</Title>
                  <img
                    src={news.thumbnail || demoImage}
                    alt="news"
                    style={{ maxHeight: 100, objectFit: 'cover', marginLeft: 16 }}
                  />
                </div>
                <p>
                  {news.description && news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.thumbnail || demoImage} alt="" />
                    <Text className="provider-name">CryptoDaily</Text>
                  </div>
                  <Text>
                    {news.createdAt
                      ? moment(news.createdAt).fromNow()
                      : ''}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
      {visibleCount < cryptoNews.length && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </>
  );
};

export default News;