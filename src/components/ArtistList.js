import React from 'react';
import Artist from "./Artist"

const ArtistList = ({ data, currentPage, getAllArtists }) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No Artists. Please add an Artist</div>}

            <ul className='artist__list'>
                {data?.content?.length > 0 && data.content.map(artist => <Artist artist={artist} key={artist.id} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                
                {/*Pages are 0 indexed */}
                <a onClick={() => getAllArtists(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllArtists(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}

                {/* NEED ()=> so that getAllArtists() isn't immediately invoked/it's output passed into onClick()
                // If <a onClick={getAllArtists}>Click me</a>, then the function is only invoked when onClick is triggered, 
                // because the function reference getAllArtists is passed.*/}

                <a onClick={() => getAllArtists(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }

        </main>
    )
}

export default ArtistList