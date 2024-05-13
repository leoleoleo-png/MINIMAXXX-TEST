import React, { useEffect, useState } from 'react';
import { fetchPhotos } from './apiCognac';

const GalleryCognac = ({ phone }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const photosData = await fetchPhotos();
      setPhotos(photosData);
    };
    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      {photos.map(photo => (
        <img style={{ width: '100%', paddingBottom: '20px' }} key={photo.id} src={photo.url} alt="" />
      ))}
    </div>
  );
};

export default GalleryCognac;
