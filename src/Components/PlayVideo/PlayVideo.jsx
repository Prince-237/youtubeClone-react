import React from 'react'
import './PlayVideo.css'
// import vid from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
// import jack from '../../assets/jack.png'
import profile from '../../assets/user_profile.jpg'
import { useState } from 'react'
import { apikey, value_converter } from '../../assets/data'
import { useEffect } from 'react'
import moment from 'moment/moment'
import { useParams } from 'react-router-dom'


const PlayVideo = () => {

    const {videoId} = useParams()

    const [apidata, setApidata] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState([])

    const fetchVideoData = async () => {
        // Fetching Vid data
        const viddetail = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apikey}`
        const response = await fetch(viddetail)
        const data = await response.json()
        setApidata(data.items?.[0] ?? null)
    }

    const fetchChannelData = async () => {
        // Guard when channelId is missing
        if (!apidata?.snippet?.channelId) {
            setChannelData(null)
            setCommentData([])
            return
        }

        // Fetching Channel Data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${apikey}`
        const channelRes = await fetch(channelData_url)
        const channelJson = await channelRes.json()
        setChannelData(channelJson.items?.[0] ?? null)

        // Fetching comment data
        const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&textFormat=plainText&key=${apikey}&videoId=${videoId}`
        
        const commentRes = await fetch(commentData_url)
        const commentJson = await commentRes.json()
        setCommentData(Array.isArray(commentJson.items) ? commentJson.items : [])

    }

    useEffect(() => {
        fetchVideoData()
    }, [videoId])

    useEffect(() => {
        if (apidata) {
            fetchChannelData()
        }
    }, [apidata])



    return (
        <div className='playvid'>
            {/* <video src={vid} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apidata ? apidata.snippet?.title : 'Title'}</h3>
            <div className="pvi">
                <p>{apidata ? value_converter(apidata.statistics?.viewCount) : '16K'} Views &bull; {apidata ? moment(apidata.snippet.publishedAt).fromNow() : ''}</p>
                <div className='opt'>
                    <span><img src={like} alt="" />{apidata ? value_converter(apidata.statistics?.likeCount) : ''}</span>
                    <span><img src={dislike} alt="" />{apidata ? value_converter(apidata.statistics?.dislikeCount) : ''}</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>

                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?.snippet?.thumbnails?.default?.url || profile} alt="" />
                <div>
                    <p>{apidata ? apidata.snippet?.channelTitle : 'Channel Name'}</p>
                    <span>{channelData ? value_converter(channelData.statistics?.subscriberCount) : '1M'} subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="viddes">
                <p>{apidata ? apidata.snippet?.description?.slice(0, 400) : 'Description'}</p>
                <hr />
                <h4>{apidata ? value_converter(apidata.statistics?.commentCount) : '100'} Comments</h4>
                {Array.isArray(commentData) && commentData.length > 0 ? commentData.map((item, index) => {
                    const commentSnippet = item?.snippet?.topLevelComment?.snippet
                    const authorAvatar = commentSnippet?.authorProfileImageUrl || profile
                    const authorName = commentSnippet?.authorDisplayName || 'Unknown'
                    const commentText = commentSnippet?.textOriginal || ''

                    return (
                        <div key={item?.id || index} className="comment">
                            <img src={authorAvatar} alt="" />
                            <div>
                                <h3>{authorName} <span>4 hrs ago</span></h3>
                                <p>{commentText}</p>
                                <div className="comact">
                                    <img src={like} alt="" />
                                    <span>{value_converter(commentSnippet?.likeCount) || '10'}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                }) : <p>No comments yet.</p>}


            </div>
        </div>
    )
}

export default PlayVideo