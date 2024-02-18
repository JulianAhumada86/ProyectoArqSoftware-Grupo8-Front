import React, { useState, useEffect } from 'react';
import { Container, Card, Carousel, Button, Row, Col } from 'react-bootstrap';
import { FaWifi, FaSwimmingPool, FaParking, FaDumbbell, FaSpa } from 'react-icons/fa';
import { getHotelById } from './api';
import { useParams } from 'react-router-dom';

function HotelDetail() {
    const { id } = useParams();
    const [hotel, setHotel] = useState();

    const GetHotelById = async () =>{
      try{
        const response = await getHotelById(id);
        const hotelData = response.data
    
        setHotel(hotelData)
        console.log(hotel)
      }catch(error){
      }
    }

    useEffect(() => {
        GetHotelById()
        console.log(hotel)
    }, [id]);


    useEffect(() => {
      console.log("Hotel actualizado:", hotel);
  }, [hotel]);
 

  return (
    <Container className="mt-5">
        {hotel ? (
          <h1>{hotel.name}</h1>
        ) : (
          <h1>Cargando</h1>

        )}
    </Container>
  );
}

export default HotelDetail;