import React from 'react'
import './Recommended.css'
// import {useState} from 'react'
import { useEffect } from 'react'
import { apikey, value_converter } from '../../assets/data'
import { Link } from 'react-router-dom'




const Recommended = ({ categoryId }) => {

    const [apiData, setApiData] = React.useState([])
    const fetchRecommended = async () => {
        const recommended_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${apikey}`
        const response = await fetch(recommended_url)
        const data = await response.json()
        setApiData(data.items || [])
    }

    useEffect(() => {
        fetchRecommended()
    }, [])

    return (
        <div className='recommended'>
            {apiData.map((item, index) => {
                return(
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="svl" key={index}>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vi">
                        <h4>{item.snippet.title}</h4> 
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics?.viewCount) || '199K'} views</p>
                    </div>
                </Link>
                )
            })}
        </div>
    )
}

export default Recommended
      