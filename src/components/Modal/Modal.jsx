import { Overlay, ModalDiv } from "./Modal.styled";
import {createPortal} from "react-dom";
import { Component } from "react";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component{
  
  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(){
    window.removeEventListener('keydown',this.handleKeyDown);
  }

  handleKeyDown= e =>{
    if(e.code === 'Escape'){
      this.props.onClose();
    }
  }
  handleBackDropClick= e =>{
    if(e.currentTarget=== e.target){
      this.props.onClose();
    }
  }

  render(){
    const{largeImageURL,tags}= this.props;
  return createPortal( 
        <Overlay onClick={this.handleBackDropClick}>
  <ModalDiv>
    <div>
    <img src={largeImageURL} alt={tags} />
    </div>
  </ModalDiv>
</Overlay>, modalRoot
 )}
}

Modal.propTypes={
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}