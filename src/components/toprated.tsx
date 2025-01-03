import { MovieType } from "@/types/MovieType";
import { useEffect, useState } from "react";
import { StarsRating } from "./stars";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTopRatedMovies } from "@/utils/api";
import { useNavigate } from "react-router-dom";

export const TopRatedMovies = () => {
   const { data } = useTopRatedMovies();
   const [movies, setMovies] = useState<MovieType[]>();
   const navigate = useNavigate();
   const [leftMargin, setLeftMargin] = useState(0);
   const [currentSlide, setCurrentSlide] = useState(0);
   const totalSlides = 20;
   const slideWidth = 271;
   const itemsPerPage = 4;


   useEffect(() => {
      setMovies(data?.results)
   }, [data])

   function handleNavReadMore(movie: MovieType) {
      navigate('/readmore', { state: { movie } })
   }
   function handleNavAllTopRated(){
      navigate('/alltoprated')
   }

   function handlePrevSlide() {
      const newSlide = (currentSlide - itemsPerPage + totalSlides) % totalSlides;
      setCurrentSlide(newSlide);
      updateMarginSlide(newSlide);
      console.log('prevSlide: '+newSlide)
   }
   
   function handleNextSlide() {
      const newSlide = (currentSlide + itemsPerPage) % totalSlides;
      setCurrentSlide(newSlide);
      updateMarginSlide(newSlide);
      console.log('nextSlide: '+newSlide)
   }
   function updateMarginSlide(newSlide: number) {
      setLeftMargin(newSlide * slideWidth);
   }   

   return (
      <>
         <div className="topRated-title-area">
            <h1>Os mais bem avaliados</h1>
            <button onClick={handleNavAllTopRated}>Ver todos</button>
         </div>
         <div className="topRated-container">
            <div className="topRated-slide-btn-area">
               <button className="topRated-slide-btn" onClick={handlePrevSlide}><FaArrowLeft /></button>
               <button className="topRated-slide-btn" onClick={handleNextSlide}><FaArrowRight /></button>
            </div>
            <div className="topRated-list" style={{ marginLeft: `-${leftMargin}px`}}>
               {movies?.map((movie) => (
                  <div key={movie.id} className="topRated-movie" onClick={() => handleNavReadMore(movie)}>
                     <div className="topRated-poster">
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                     </div>
                     <div className="topRated-infos">
                        <h2 className="topRated-title">{movie.title}</h2>
                        <span>({movie.release_date.substring(0, 4)})</span>
                        <StarsRating rating={movie.vote_average} />
                        <p className="topRated-overview">{movie.overview ? movie.overview.substring(0, 90) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta dolor dolor, ut vulputate nulla cursus vel. Pellentesque'}...</p>
                        <button className="readmore-btn">Ver mais</button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   )
}