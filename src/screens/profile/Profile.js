import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Profile.css';
import Login from '../login/Login';
import Header from '../../common/header/Header';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            mediaPosts: [],
            mediaDetails: [],
            follows: 4,
            followedBy: 6,
            fullName: 'UpGrad Project',
            username: '',
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
                                mediaDetails: mediaDetailsArray,
                                username: JSON.parse(this.responseText).username
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

        return (
            <div>
                <div>
                    <Header showProfilePic='true' logoClickable='true' showMyAccountOption='false' />
                </div>

                <div className='info-section'>
                    <div className='profile-pic'>
                        <img className='profile-pic-img' src={this.state.profile_picture} />
                    </div>
                    <div className='profile-info'>
                        <Typography>{this.state.username}</Typography><br />
                        <Typography>
                            <span>Posts: {this.state.mediaPosts.length}                </span>
                            <span>Follows: {this.state.follows}                       </span>
                            <span>Followed by: {this.state.followedBy}                      </span>
                        </Typography>
                        <Typography>{this.state.fullName} <span><Button variant='fab' color='secondary'><EditIcon /></Button></span></Typography>
                    </div>
                </div>
            </div>

        );
    }
}

export default Profile;