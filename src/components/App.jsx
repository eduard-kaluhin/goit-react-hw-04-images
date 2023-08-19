import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';
import { AppStyled } from './App.styled';
import { Button } from './Button/Button';

import fetchImagesWithQuery from '../services/api';

export const App = () => {
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImagesWithQuery(searchQuery, page);
        const totalPages = Math.ceil(data.totalHits / 12);

        if (page === 1) {
          Notiflix.Report.success(
            'Wonderful!',
            `We found ${data.totalHits} images!`,
            'Continue'
          );
        } else {
          setTimeout(() => scroll(), 100);
        }

        if (data.hits.length === 0) {
          Notiflix.Report.warning(
            'Sorry!',
            'There are no images matching your search query.',
            'Try again.'
          );
          return;
        }
        setHits(hits => [...hits, ...data.hits]);

        if (page >= totalPages) {
          Notiflix.Report.info(
            'Sorry!',
            'This is the end of search results!',
            'Ok'
          );
          setShowLoadMoreBtn(false);
        }
        if (page < totalPages) {
          setShowLoadMoreBtn(true);
        }
      } catch (error) {
        Error(true, Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, searchQuery]);

  const onSubmit = inputValue => {
    if (searchQuery !== inputValue) {
      setSearchQuery(inputValue);
      setPage(1);
      setHits([]);
    }
  };
  const scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };
 
  return (
    <>
      <AppStyled>
        <Searchbar onSubmit={onSubmit} />
        {hits.length !== 0 && <Gallery hits={hits} />}
        {isLoading ? (
          <Loader />
        ) : (
          hits.length !== 0 &&
          showLoadMoreBtn && (
            <Button onLoadMore={() => setPage(page => page + 1)} />
          )
        )}
      </AppStyled>
    </>
  );
};