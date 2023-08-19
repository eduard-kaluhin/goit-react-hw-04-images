import { GalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import {Ul} from "./ImageGallery.styled";
import PropTypes from 'prop-types';

export const Gallery = ({hits})=>{
  return (<Ul>{ hits.map(hit => (
                    <GalleryItem key={hit.id} hit={hit}/>
                        ))}
        </Ul>) };

Gallery.propTypes={
    hits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }).isRequired
    ),
}