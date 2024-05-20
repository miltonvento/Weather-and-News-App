import { useState } from "react"

export default function News({data}) {
    console.log("News data", data)

    return (
        <div className='news'>
            {/* <h1 className='news-heading'> Top Stories</h1> */}
            <div className='row news-row'>
              <div className='col-3'> <div className="img-container"> <img src={data.multimedia[0].url}/> </div> </div>
              <div className='col'> 
              <h2 className='news-headline'> {data.title}</h2>
              <h4 className='news-description'>{data.abstract} </h4>
              </div>
            </div>
          </div>
    )

}