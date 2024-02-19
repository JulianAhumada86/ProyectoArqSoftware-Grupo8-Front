import React, { useState, useEffect } from 'react';
import { Container, Card, Carousel, Button, Row, Col } from 'react-bootstrap';
//import { FaWifi, FaSwimmingPool, FaParking, FaDumbbell, FaSpa } from 'react-icons/fa';
import { getHotelById, getImagesByHotelIdMap} from './api';
import { useParams } from 'react-router-dom';

function HotelDetail() {
    const { id } = useParams();
    const [hotel, setHotel] = useState();
    const [imagenes, setImagenes] = useState([]);

    const getHotel = async () =>{
      try{
        const response = await getHotelById(id);
        const hotelData = response.data
    
        setHotel(hotelData)
        //console.log(hotel)
      }catch(error){
      }
    }
    const getImagenes = async () =>{
      try{
        const response2 = await getImagesByHotelIdMap(id);
        const imgData = response2.map(image => new Uint8Array(atob(image.Data).split('').map(char => char.charCodeAt(0))))
        console.log(imgData)
        setImagenes(imgData)
        //console.log(imagenes)
      }catch(error){
      }
    }

    useEffect(() => {
        getHotel();
        getImagenes();
    }, [id]);
 

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
        {hotel ? (
          <>
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
          </>
        ) : (
          <>
            <h1>Cargando...</h1>
            <p>Cargando...</p>
          </>
        )}
        </Col>
        <Col md={6}>
          <Carousel style={{ height: '100%', width: '100%' }}>
            {imagenes.map((imagen, index) => (
              <Carousel.Item key={index} style={{ height: '100%' }}>
                <img
                  src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, imagen))}`}
                  alt={`Imagen ${index}`}
                  className="d-block w-100"
                  style={{ objectFit: 'cover', height: '100%', maxHeight: '250px' }} // Ajusta maxHeight según sea necesario
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

    </Container>
  );
}

export default HotelDetail;

/*
      <div className="mt-3">
            <h5>Amenidades</h5>
            <div className="d-flex flex-wrap">
              {hotel.amenities.map((amenity, index) => (
                <Card key={index} className="m-2" style={{ width: '12rem' }}>
                  <Card.Body>
                    <Card.Text>{amenity.nombre}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>        
*/