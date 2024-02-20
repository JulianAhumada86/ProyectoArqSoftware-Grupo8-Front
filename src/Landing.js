import React, { useState, useEffect } from 'react';
import {Carousel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { getImagesByHotelId, getHotels } from './api';

function Landing() {
  const [hoteles, setHoteles] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  const getHoteles = async () => {
    try {
      const response = await getHotels();
      const hotelsData = response.data.hotels;
      const promises = [];
  
      for (const hotel of hotelsData) {
        promises.push(
          getImagesByHotelId(hotel.id)
            .then((response2) => {
              const imagesData = response2.data.images[0].Data;
              return new Uint8Array(atob(imagesData).split('').map(char => char.charCodeAt(0)));
            })
            .catch((error) => {
              console.error('Error al obtener imágenes por hotel:', error);
              return null; // O maneja el error de alguna manera
            })
        );
      }
  
      const imagesArray = await Promise.all(promises);
  
      console.log(imagesArray);
      setImagenes(imagesArray.filter(image => image !== null));
      setHoteles(hotelsData);
    } catch (error) {
      console.error('Error al obtener hoteles:', error);
  }
  };


  useEffect(() => {
    getHoteles();
  }, []);
  
  return (        
    <Carousel>
      {hoteles.map((hotel) => (
        <Carousel.Item key={hotel.id} value={hotel.id}>
          {imagenes[hotel.id-1] ? (
            <img
              className="d-block w-100"
              src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, imagenes[hotel.id-1]))}`}
              alt={`Imagen de ${hotel.name}`}
              style={{ objectFit: 'cover', height: '100%', maxHeight: '500px' }}
            />
          ) : (
            <img
              className="d-block w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHNjMunkOvhQ0Snob_DpaIFZCwjuU_4L9y6CuVARRh9btPhmiE6AHgMh-AXM3F_g1Muxk"
              alt="Respaldo"
              style={{ objectFit: 'cover', height: '100%', maxHeight: '500px' }}
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
  
  export default Landing;