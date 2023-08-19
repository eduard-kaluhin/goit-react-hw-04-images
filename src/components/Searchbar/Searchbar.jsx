import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const onHandleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      Notiflix.Report.info('Please!', 'Enter your search query!', 'Ok');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Header>
      <Form onSubmit={onHandleSubmit}>
        <Button type="submit">
          <ImSearch
            style={{ marginRight: 2, marginTop: 4, width: 25, height: 25 }}
          />
          <Label>Search</Label>
        </Button>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="queryInput"
          onChange={e => setInputValue(e.target.value)}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
