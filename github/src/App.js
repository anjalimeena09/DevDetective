import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import './App.css';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';

const { Search } = Input;

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myData, setMyData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (username) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) { 
        throw new Error('User not found');
      }
      const jsonData = await response.json();
      console.log(jsonData); // Log the retrieved data
      setMyData(jsonData);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const devDetector = (value) => {
    fetchData(value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return `Joined ${date.toLocaleDateString("en-US", options)}`;
  };

  useEffect(() => {
    fetchData('anjalimeena09');
  }, []);

  return (
    <div className='container'>
      <div>
        <h1 className="heading">DevDetective</h1>
      </div>

      
      <div className='search-box'>
        <Search
          placeholder="Enter a GitHub Username....."
          loading={isLoading}
          enterButton={<span >Search</span>} // Customized button style
          onSearch={devDetector}
          disabled={isLoading}
        />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'white' }}>Error: {error}</div>}
      {myData && (
        <div className="card">
          <div className="left">
            <img src={myData.avatar_url} alt="User Avatar" />
          </div>

          <div className='rightportion'>

            <div className="right">
              <div className='namecon'>
                <h2 className='name'>{myData.name || 'Not available'}</h2>

              </div>
             
              <div>
                <h3 className='date'>{formatDate(myData.created_at)}</h3>
              </div>

            </div>

            <div  className='username'>
                <h3>{myData.login ? <a href={myData.login} target="_blank" rel="noopener noreferrer" style={{ color: '#000099' }}>@{myData.login}</a> : 'Username not available'}</h3>
                </div>

            <div className='bio-box'>
              <div>
                <p className='bio'>{myData.bio || 'This Profile has no bio'}</p>
              </div>
            </div>
            <div className='foll'>
              <div>
                <h3>Repos <br /> {myData.public_repos}</h3>
              </div>
              <div>
                <h3>Followers <br /> {myData.followers}</h3>
              </div>
              <div>
                <h3>Following <br /> {myData.following}</h3>
              </div>
            </div>
            <div className='info'>
              <div className='firstinfo'>
                <div>
                  <h3>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {myData.location || 'Not available'}
                  </h3>
                </div>
                <div>
                  <h3>
                  <GithubOutlined /> <a href={myData.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>{myData.html_url}</a>
                  </h3>
                </div>
              </div>
              <div className='secondinfo'>
                <div>
                  <h3>
                    <TwitterOutlined /> {myData.twitter_username ? <a href={`https://twitter.com/${myData.twitter_username}`} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>twitter.com/{myData.twitter_username}</a> : 'Not available'}
                  </h3>
                </div>
                <div>
                  <h3>
                    <FontAwesomeIcon icon={faBuilding} /> {myData.company || 'Not available'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !myData && !error && <div>Enter a username to search...</div>}
    </div>
  );
};

export default MyComponent;


