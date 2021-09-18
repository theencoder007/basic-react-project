import React, { useEffect ,useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
   
        // document.title = `NewsAdda -${props.category}`;
    
    
    
     const updateNews=async()=> {
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=9dea00a6851d4169856b8fa496697b87&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        // props.setProgress(40);
        let parsedData = await data.json()
        // props.setProgress(80);
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        
    }, [])
 
    const fetchMoreData= async()=> {
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=9dea00a6851d4169856b8fa496697b87&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults( parsedData.totalResults)
      
    };
    
    
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsAdda-Top {props.category} Headlines</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    />

                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "anonymous"} date={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                    {/* <div className="container d-flex justify-content-between"> */}
                    {/* <button disabled={state.page<=1} type ="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled={state.page + 1 > Math.ceil(state.totalResults/props.pageSize)} type ="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr; </button> */}
                    {/* </div> */}
                </div>
            </div>
        )
   
}

News.defaultProps = {
    country: 'in',
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}
export default News