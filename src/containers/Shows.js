import React, { useEffect, useState } from 'react';
import * as clientCredential from '../axios/ClientCredential'
import { useHistory } from 'react-router-dom';

const Shows = () => {
    const history = useHistory();
    const [shows, setShows] = useState([])
    useEffect(() => {
        clientCredential.shows().then(response => {
            setShows(response.data);
        })
    },[]);

    const showTodayHandler = () => {
        clientCredential.showsToday().then(response => {
            setShows(response.data);
        })
    }

    const onDeleteHandler = (id) => {
        clientCredential.deleteShow(id).then(response => {
            let newShows = [...shows];
            const index = newShows.indexOf(show => show.id == id);
            newShows.splice(index);
            setShows(newShows);
        })
    }

    const onEditHandler = (id) => {
        history.push(`show/edit/${id}`);
    }

    const createShow = () => {
        history.push(`show/create`);
    }
    return(<>
            <button onClick={() => showTodayHandler()}>Today</button>
            <button onClick={() => createShow()}>Create</button>
            {
                shows.map( show => {
                    return(
                        <div style={{display: 'flex'}} key={show.id}>
                            <div><span>{show.name}</span></div>
                            <div><span>{show.description}</span></div>
                            <div><span>{show.start_date}</span></div>
                            <div><span>{show.end_date}</span></div>
                            <div><span>{show.label.name}</span></div>
                            <div><button onClick={() => onDeleteHandler(show.id)}>Delete</button></div>
                            <div><button onClick={() => onEditHandler(show.id)}>Edit</button></div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Shows;