import {Component} from  "react";
import Notiflix from 'notiflix';
import {Loader} from "./Loader/Loader";
import {Searchbar} from "./Searchbar/Searchbar";
import { Gallery } from "./ImageGallery/ImageGallery";
import { AppStyled } from "./App.styled";
import { Button } from "./Button/Button";

import fetchImagesWithQuery from "../services/api";

export class App extends Component {

  state={
        isLoading: false,
        isError: false,
        searchQuery: "",
        hits: [],
        page:1,
        loadMoreBtn: false,
    }

   fetchData=async()=> {
      const {searchQuery, page} = this.state;
      this.setState({ isLoading: true });
     try {
          const data =await fetchImagesWithQuery(searchQuery,page);
          const totalPages = Math.ceil(data.totalHits / 12);
          if(data.hits.length ===0){
            Notiflix.Report.warning("Sorry!","There are no images matching your search query.","Try again.")
          return;
          }
           this.setState(({hits})=>({
            hits:[...hits, ...data.hits],
            totalPages,
          }));

          if(page ===1){
            Notiflix.Report.success("Wonderful!",`We found ${data.totalHits} images!`,"Continue")
          }else{
            setTimeout(()=> this.scroll(),100);
          }

          if (page >= totalPages){
            Notiflix.Report.info("Sorry!","This is the end of search results!","Ok")
          }
      } catch (error) {
          this.setState({ isError: true, Error });
      } finally {
          this.setState({ isLoading: false });
      }
  }


componentDidUpdate(_, prevState) {
const {searchQuery, page}= this.state;
  if (searchQuery !== prevState.searchQuery ||
     page !== prevState.page) {
      this.fetchData();
  }
};

onSubmit=searchQuery =>{
  
    this.setState({ searchQuery, page:1, hits: [] });
  };
  
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  }
  
  render(){
    const {isLoading,hits,page,totalPages}= this.state;
    
    return (
    <>
    <Searchbar onSubmit={this.onSubmit}/>
    <AppStyled>
   { hits.length !== 0 && <Gallery  hits={hits}/>}
   {isLoading ? ( <Loader/>) : 
   (page<totalPages && hits.length!==0 &&<Button onLoadMore={this.handleLoadMore}/>)}
   </AppStyled>
    </>
  );
}};
