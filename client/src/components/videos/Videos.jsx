import React from 'react'
import Flickity from 'react-flickity-component';
import './Videos.scss';

const Videos = ({ videos }) => {

 // default carousel cell start location
 const flickityOptions = {
  initialIndex: 1,
  autoPlay: 5000,
  wrapAround: true,
  prevNextButtons: true,
  arrowShape: true,
 };


 return (
  <div className='videos'>
   <Flickity
    className={'carousel'} // default ''
    elementType={'div'} // default 'div'
    options={flickityOptions} // takes flickity options {}
    disableImagesLoaded={false} // default false
    reloadOnUpdate // default false
    static // default false
   >
    {videos?.map((item, index) => {
     return (
      <div className='video-box' key={index}>
       <video
        src={item.links.mobile.source.href}
        controls='controls'
        poster={item.thumbnail}></video>
       <div className='video-text'>
        <p className='headline'>{item.headline}</p>
        <p className='description'>{item.description}</p>
       </div>
      </div>
     );
    })}
   </Flickity>
  </div>
 )
}

export default Videos