import React, { useState, useEffect } from 'react';
import { fetchImages } from 'services/api.jsx';
import { Searchbar } from 'components/Searchbar/Searchbar.jsx';
import { ImageGallery } from 'components/ImageGallery/ImageGallery.jsx';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';
import { Container, Notify } from './App.styled';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function dataImages(query, page) {
      setIsloading(true);

      try {
        const { data, totalHits } = await fetchImages(query, page);
        
        if (totalHits === 0) {
          NotificationManager.error(
            'Pictures not found'
          );
        }
        if (page === 1) {
          setTotal(totalHits);
        }
        setImages(images => [...images, ...data]);
        setIsloading(false);
      } catch (error) {
        console.log('fetch error -', error)
      } finally {
        setIsloading(false);
      }
    }
    dataImages(query, page);
  }, [query, page]);
 
  const handleInput = e => {
    setPage(1);
    setQuery(e.searchQuery);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page + 1)
  };

  const showBtn = images.length > 0 && images.length < total && !isLoading;

  return (
    <Container>
      <Searchbar onSubmit={handleInput} />

      {images && (
        <>
          {images.length === 0 && <NotificationContainer />}

          <ImageGallery items={images} />

          {isLoading && <Loader>Loading</Loader>}
          {showBtn && <Button onLoadMore={loadMore} />}

          {images.length === total && !!images.length && (
            <Notify>No more pictures</Notify>
          )}
        </>
      )}
    </Container>
  );
};

