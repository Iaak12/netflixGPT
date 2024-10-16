import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constants';

const VideoBackground = ({movidId}) => {

    const [trailerId, setTrailerId] = useState(null);

    const getMovieVideo = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/933260/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        console.log(json);
        
        const filterData = json.results.filter((video) => video.type === "Trailer")
        const trailer = filterData.length ? filterData[0] : json.results[0];
        console.log(trailer);
        setTrailerId(trailer.key);

    }

    useEffect(() => {
        getMovieVideo();
    }, [])

  return (
    <div><iframe width="560" height="315" src={"https://www.youtube.com/embed/"+ trailerId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
  )
}

export default VideoBackground