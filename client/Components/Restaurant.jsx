import React, { useContext } from 'react';
// import { myContext } from './Context';

const Restaurant = (props) => {
  const { restoObj, setVote, currentVote, setDeleted, userVote} = props;
  const { resto_id, restoname, address, city, foodtype, link, votes } = restoObj;

  const handleUpVote = (e) => {
    //is the upvote updating voteTable - currently pulling from voteTable to reflect didVote
    console.log('Handling upvote')
    //if user vote is up undo vote
    if (userVote === 1){
      return setVote({ resto_id: resto_id, action: 'unvote' });
    }
    
    return setVote({ resto_id: resto_id, action: 'upvote' });
    

  };
  const handleDownVote = (e) => {
    //is the downvote updating voteTable 
    console.log('Handling downvote')
    if (userVote === -1){
      return setVote({ resto_id: resto_id, action: 'unvote' });
    }
    return setVote({ resto_id, action: 'downvote' });
  };


  const handleDelete = (e) => {
    (async () => {
      try {
        await fetch('/api/resto/', {
          method: 'DELETE',
          body: JSON.stringify({ resto_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setDeleted({ resto_id });
        console.log(`Deleted ${restoname}`);
      } catch (error) {
        console.log(`Error attempting to delete ${restoname}, error`);
      }
    })();
  };
  return (
    <div className='restaurant-container'>
      <div className='voteSection'>
        <button className='upVote voteBtn' onClick={handleUpVote}>
          &#8679;
        </button>
        <p className='voteCount'>{votes}</p>
        <button className='downVote voteBtn' onClick={handleDownVote}>
          &#8681;
        </button>
      </div>
      <div className='infoSection'>
        <p className='resto-name'>
          {restoname} <span className='cuisine'>[{foodtype}]</span>
        </p>
        <button className='deleteBtn' onClick={handleDelete}>
          Delete
        </button>
        <p className='info-text'>{address}</p>
        <p className='info-text'>
          {!link ? (
            'No link available'
          ) : (
            <a
              href={link.slice(0, 4) === 'http' ? link : 'http://' + link}
              target='_blank'
            >
              {' '}
              Link to Restaurant
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default Restaurant;

// resto_id SERIAL PRIMARY KEY,
// restoName VARCHAR(50),
// address VARCHAR(50),
// city VARCHAR(50),
// foodType VARCHAR(50),
// link VARCHAR(300),
// votes INTEGER
