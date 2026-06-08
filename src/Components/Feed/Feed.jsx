import React from 'react'
import './Feed.css'
import th1 from '../../assets/thumbnail1.png'
import th2 from '../../assets/thumbnail2.png'
import th3 from '../../assets/thumbnail3.png'
import th4 from '../../assets/thumbnail4.png'
import th5 from '../../assets/thumbnail5.png'
import th6 from '../../assets/thumbnail6.png'
import th7 from '../../assets/thumbnail7.png'
import th8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { apikey, value_converter } from '../../assets/data'
import { useEffect } from 'react'
import { useState } from 'react'
import moment from 'moment/moment'



const Feed = ({ category }) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const videoList = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${apikey}`
    await fetch(videoList).then(res => res.json()).then(data => { setData(data.items) })
  }

  useEffect(() => {
    fetchData()
  }, [category])

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        )
      })}


    </div>
  )
}

export default Feed