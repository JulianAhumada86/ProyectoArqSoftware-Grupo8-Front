import React, { useState, useEffect } from 'react';
import {Carousel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { getImagesByHotelId, getHotelsC } from './api';

function Landing() {
  const [hoteles, setHoteles] = useState([]);

  const getHoteles = async () => {
    try {
      const response = await getHotelsC();
      const reservasData = response.data.hotels;
      setHoteles(reservasData);
    } catch (error) {
      console.error('Error al obtener hoteles:', error);
    }
  };

  const getImagen = async (hotelId) => {
    try {
      const response = await getImagesByHotelId(hotelId);
      const imagenes = response.data.images;
  
      // Ordenar las imágenes por el id de manera ascendente
      imagenes.sort((a, b) => a.id - b.id);
  
      // Tomar la primera imagen después de ordenar
      const primeraImagen = imagenes[0];
  
      console.log(primeraImagen);
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    }
  };

  const Sorongo = async () => {
    hoteles.forEach((hotel) => {
      getImagen(hotel.id);
    });
  }

  useEffect(() => {
    getHoteles();
  }, []);
  
  return (        
  <Carousel>
    {hoteles.map((hotel) => (
      <Carousel.Item key={hotel.id} value={hotel.id}>
        {hotel.primeraImagen ? (
          <img
            className="d-block w-100"
            src={hotel.primeraImagen}
            alt={`Imagen de ${hotel.name}`}
          />
        ) : (
          <img
            className="d-block w-100"
            src="https://mcaleer-rushe.co.uk/site/wp-content/uploads/2019/05/Maldron-Hotel-Belfast-IntAirport-I.jpg"
            alt="Respaldo"
          />  
        )}
        <Link to={`/hotel/${hotel.id}`}>
          <Carousel.Caption
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%',
            }}
          >
            <h1>{`Maldron ${hotel.name}`}</h1>
            <p>{hotel.description}</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    ))}
  </Carousel>

);
  
}

export default Landing;