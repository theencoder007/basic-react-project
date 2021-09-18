import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsAdda -${this.props.category}`;
    }


    async updateNews() {
       // this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=9dea00a6851d4169856b8fa496697b87&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
       // this.props.setProgress(40);
        let parsedData = await data.json()
       // this.props.setProgress(80);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
       // this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();


    }

    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            this.setState({ page: this.state.page + 1 });
            this.updateNews();
        }
    }
    fetchMoreData= async()=> {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=9dea00a6851d4169856b8fa496697b87&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
    };

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsAdda-Top {this.props.category} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalResults}
                />

                <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "anonymous"} date={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                    {/* <div className="container d-flex justify-content-between"> */}
                    {/* <button disabled={this.state.page<=1} type ="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type ="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button> */}
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default News