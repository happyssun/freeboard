import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

interface Character {
  _id: number;
  name: string;
  imageUrl: string;
  sourceUrl: string;
}
export default function UseOpenApiPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const [randomCharacter, setRandomCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get("https://api.disneyapi.dev/character");
      setCharacters(response.data.data); // response.data는 API 응답에서 실제 데이터를 포함하는 객체.. 그안에 데이터로 data가 있어서
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const character = characters[randomIndex];
    // characters[] 배열 안에는 api로부터 가져온 캐릭터들이 들어있다. 그 캐릭터들을 Math.random을 이용하여 가져와서 변수에 할당
    setRandomCharacter(character);
  };

  const renderRandomCharacter = () => {
    if (randomCharacter === null) {
      return <p>Click the button to get a random character.</p>;
    }

    return (
      <Row>
        <Col md={4}>
          <Card>
            {randomCharacter && (
              <Card.Img
                variant="top"
                src={randomCharacter.imageUrl}
                alt={randomCharacter.name}
              />
            )}
            <Card.Body>
              <Card.Title>{randomCharacter.name}</Card.Title>

              <Button
                variant="primary"
                href={randomCharacter.sourceUrl}
                target="_blank"
              >
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Container>
      <h1>Disney Characters</h1>
      <Button
        variant="outline-primary"
        size="lg"
        onClick={getRandomCharacter}
        style={{ margin: "20px 0" }}
      >
        Get Random Character
      </Button>
      {renderRandomCharacter()}
    </Container>
  );
}
