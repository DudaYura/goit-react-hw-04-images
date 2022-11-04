import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.dataImages(query, page);
    }
  }

  handleInput = e => {
    this.setState({
      page: 1,
      query: e.searchQuery,
      images: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  dataImages = async (query, page) => {
    this.setState({ isLoading: true });

    try {
      const { data, totalHits } = await fetchImages(query, page);

      if (totalHits === 0) {
         NotificationManager.error(
           'Pictures not found',
           'Close after 4000ms',
           4000
         );
      }
        if (page === 1) {
          this.setState(() => ({
            total: totalHits,
          }));
        }
      this.setState(state => ({
        images: [...state.images, ...data],
        isLoading: false,
      }));
    } catch (error) {
     console.log('fetch error -', error)
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, total } = this.state;
    const showBtn = images.length > 0 && images.length < total && !isLoading;

    return (
      <Container>
        <Searchbar onSubmit={this.handleInput} />

        {images && (
          <>
            {images.length === 0 && <NotificationContainer />}

            <ImageGallery items={images} />

            {isLoading && <Loader>Loading</Loader>}
            {showBtn && <Button onLoadMore={this.loadMore} />}

            {images.length === total && !!images.length && (
              <Notify>No more pictures</Notify>
            )}
          </>
        )}
      </Container>
    );
  }
}
