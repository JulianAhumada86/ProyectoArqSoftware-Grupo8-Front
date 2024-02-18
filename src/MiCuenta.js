import React, { useState, useEffect } from 'react';
import './MiCuenta.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getReservationsByUser, getImagesByHotelId } from './api';

const MiCuenta = () => {
  const userData = Cookies.get('userData');
  const [reservas, setReservas] = useState([]);
  const [imagenPerfil, setImagenPerfil] = useState(null); // Cambiado a null

  const getReservas = async () => {
    const response = await getReservationsByUser();
    const reservasData = response.data.reservations;
    setReservas(reservasData);
    console.log(response);
  };

  const getImagen = async () => {
    try {
      const response = await getImagesByHotelId(1);
      const imagen = response.data.images[0].Data;
      // Almacenar la imagen decodificada como un objeto Uint8Array
      setImagenPerfil(new Uint8Array(atob(imagen).split('').map(char => char.charCodeAt(0))));
    } catch (error) {
      console.error('Error al obtener la imagen de perfil:', error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getReservas();
    getImagen();
  }, []); // La dependencia vacía asegura que estos efectos solo se ejecuten una vez al montar el componente.

  if (!userData) {
    navigate('/');
    return (
      <div className="container">
        <h1>Mi Cuenta</h1>
        <p>No se encontraron datos de usuario.</p>
      </div>
    );
  }

  const user = JSON.parse(userData);

  return (
    <div className="container">
      <h1>Mi Cuenta</h1>
      <div className="user-details">
        <div className="user-image">
          {imagenPerfil && (
            <img
              id="perfil"
              src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, imagenPerfil))}`}
              alt="Foto de perfil"
              width="250"
              height="250"
            />
          )}
        </div>
        <div className="user-info">
          <p className="user-info-line">
            <span className="label">Nombre:</span> <span className="value">{user.name}</span>
          </p>
          <p className="user-info-line">
            <span className="label">Apellido:</span> <span className="value">{user.lastName}</span>
          </p>
          <p className="user-info-line">
            <span className="label">Correo electrónico:</span> <span className="value">{user.email}</span>
          </p>
          <p className="user-info-line">
            <span className="label">DNI:</span> <span className="value">{user.dni}</span>
          </p>
        </div>
        
      </div>
      <div className="table-container" >
          <table>
            <thead>
              <tr>
                <th>Id de reserva</th>
                <th>Hotel</th>
                <th>Fecha</th>
                <th>Habitación</th>
              </tr>
            </thead>
            <tbody>

              {reservas.map((reserva) => (
                <tr key={reserva.reservation_id}>
                  <td>{reserva.reservation_id}</td>
                  <td>{reserva.hotel_name}</td>
                  <td>
                    {reserva.initial_date} - {reserva.final_date}
                  </td>
                  <td>{reserva.habitacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default MiCuenta;