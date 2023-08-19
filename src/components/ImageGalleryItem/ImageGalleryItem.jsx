import {Modal} from "../Modal/Modal";
import { Component } from "react";
import { Li, Img } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export class GalleryItem extends Component{
 
    state={
        showModal: false,
    }

    toggleModal=()=> this.setState((prevState=>({
        showModal: !prevState.showModal})));

render(){
    const {showModal}=this.state;
    const {webformatURL,largeImageURL,tags}=this.props.hit;
  return (<>
  <Li onClick={this.toggleModal}>
        <Img src={webformatURL} alt={tags} loading="lazy"/>
    </Li>
    {showModal &&(<Modal
          onClose={this.toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}/>)}
    </>
   )}
};

GalleryItem.propTypes={
    hit: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }),
}