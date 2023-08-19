import {Header,Form,Button, Label, Input} from './Searchbar.styled';
import {Component} from 'react';
import {ImSearch} from 'react-icons/im';
import PropTypes from "prop-types";
import Notiflix from 'notiflix';

export class Searchbar extends Component{

  static propTypes={
 onSubmit: PropTypes.func.isRequired,
  };

  state={
    searchQuery:'',
  };
  handleChangeInput = e => {
    const searchQuery = e.target.value;

    this.setState({ searchQuery: searchQuery });
  };

  onHandleSubmit=event=>{
  event.preventDefault();
  if (this.state.searchQuery.trim() === ''){
    Notiflix.Report.info ("Please!","Enter your search query!","Ok");
    return;
  }else{
    this.props.onSubmit(this.state.searchQuery);
    this.setState({searchQuery:''})
  }};

render(){
 return(
   <Header>
  <Form onSubmit={this.onHandleSubmit}>
    <Button type="submit"><ImSearch style= {{marginRight: 2,
                                              marginTop:4,
                                              width:25,
                                              height:25}}/>
      <Label>Search</Label>
    </Button>
  <Input
      type="text"
      autocomplete="off"
      autoFocus
      placeholder="Search images and photos"
      name='queryInput'
      onChange={this.handleChangeInput}
    />
  </Form>
  </Header>
    )
}}