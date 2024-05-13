import React, { useEffect, useState } from 'react';
import { fetchPhotos } from './apiBar';
import Loader from './Loader';

const Gallery = ({ phone }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const photosData = await fetchPhotos();
      setPhotos(photosData);
    };
    fetchData();
  }, []);

  return (
    <Loader delay={500} contents={ <div style={{ paddingTop: phone ? '35px' : '50px' }}>
    {photos.map(photo => (
      <img style={{ width: '100%', paddingBottom: '20px' }} key={photo.id} src={photo.url} alt="" />
    ))}
  </div>}/>
   
  );
};

export default Gallery;
