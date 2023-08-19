import PropTypes from 'prop-types';
import {Wrapper, LoadMoreBtn } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <Wrapper>
      <LoadMoreBtn onClick={() => onLoadMore()}>Load More</LoadMoreBtn>
    </Wrapper>
  );
};


Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};