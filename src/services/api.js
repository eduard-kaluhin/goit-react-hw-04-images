import axios from "axios";

const URL = 'https://pixabay.com/api/';
const KEY = '38494353-cc122ea91c29416ad7efa6eda';

const fetchImagesWithQuery = async (searchQuery,page) => {
    const response = await axios.get(URL,{
        params: {
            q:searchQuery,
            page,
            key:KEY,
            image_type:"photo",
            orientation:"horizontal",
            per_page:12,
        },
    });

    return response.data;
};

export default  fetchImagesWithQuery ;
