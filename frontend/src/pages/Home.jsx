import React from 'react'
import SideWidget from '../component/SideWidget/SideWidget';
import PostCard from '../component/PostCard/PostCard';

const Home = () => {
  const image = "https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg";

  return (
    <div className='row'>
      <div className='col-md-4'>
        <SideWidget image={image}  />
      </div>
      <div className='col-md-8 example' style={{height: '100vh', overflowY: 'auto'}}>
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  )
}
export default Home;