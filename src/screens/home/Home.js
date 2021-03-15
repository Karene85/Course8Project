import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import './Home.css';
import Header from '../../common/header/Header';
import Login from '../../screens/login/Login';
import { Typography } from '@material-ui/core';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            mediaPosts: [],
            mediaDetails: null,
            numPosts: 0,
            profile_picture: "http://www.siggraph.org/sites/default/files/styles/full_news/public/field/image/women-code.jpg?itok=5Sr7oxlt"
        }
    }

    componentWillMount() {
        let data = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        xhr1.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                let numPosts = JSON.parse(this.responseText).data.length;
                that.setState({
                    mediaPosts: JSON.parse(this.responseText).data,
                });
                let xhr2 = [];
                for (let i=0; i<numPosts; i++) {
                    let mediaData = null;
                    let mediaDetailsArray = [];
                    xhr2[i] = new XMLHttpRequest();
                    xhr2[i].addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText);
                            mediaDetailsArray.push(JSON.parse(this.responseText));
                            that.setState({
                                mediaDetails: mediaDetailsArray
                            })
                        }
                    });
                    xhr2[i].open("GET", "https://graph.instagram.com/" + JSON.parse(this.responseText).data[i].id + "?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJWLUIzaWJvQ3FESHB2ZAUtUNnlwOEVTN3FiMm9tc0RpRE9YQk40cWQ0SzJ0ZAk9LSTFUVUJTUk80Mm8tRy1nZA3dDcWZAMSmZAzTWw2V2Y5bzBNMlBHMnE0VGpHd2xIYy1wQUN5Y1RjX1hlM1ZA4OFp4a1lnOGhfSXhxZAlNF");
                    xhr2[i].setRequestHeader("Cache-Control", "no-cache");
                    xhr2[i].send(mediaData);
                }            
                
              
                
            }
        });

        xhr1.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJWLUIzaWJvQ3FESHB2ZAUtUNnlwOEVTN3FiMm9tc0RpRE9YQk40cWQ0SzJ0ZAk9LSTFUVUJTUk80Mm8tRy1nZA3dDcWZAMSmZAzTWw2V2Y5bzBNMlBHMnE0VGpHd2xIYy1wQUN5Y1RjX1hlM1ZA4OFp4a1lnOGhfSXhxZAlNF");
        xhr1.setRequestHeader("Cache-Control", "no-cache");
        xhr1.send(data);

    }


    render() {

        if(! this.state.loggedIn) {
            ReactDOM.render(<Login />, document.getElementById('root'));
        }

        if (this.state.mediaPosts.length===0 || this.state.mediaDetails===null) {
            return false;
        }

        return (
            <div>
                <div>
                    <Header showSearchBox='true' showProfilePic='true'/>
                </div>

                <div className='post-list'>
                    
                        {
                            this.state.mediaDetails.map((media) => (
                                        <Card key={"media" + media.id} className='card-style'>
                                        <CardHeader>
                                            <div>
                                                <Avatar alt='Profile Picture' src={this.state.profile_picture} />                                  </div>
                                            <div><hr />
                                                <Typography>{media.username}</Typography>
                                                <Typography>{media.timestamp}</Typography>
                                            </div>
                                        </CardHeader>
                                        <CardContent className='post-content'>
                                            <img className='post-image' src={media.media_url} />
                                            <Typography className='post-caption'>{this.state.mediaPosts.find((mediaPost) => {
                                                return mediaPost.id === media.id;
                                            }).caption}</Typography>
                                        </CardContent>
                                    </Card>
                                    
                                    
                                

                            ))
                        }
                    
                    
                        
                    
                </div>             
                
                
            </div>
            
        );

    }
    
}

export default Home;
