import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import './Header.css';
import Profile from '../../screens/profile/Profile';
import Login from '../../screens/login/Login';


class Header extends Component {

    constructor() {
        super();
        this.state = {
            profile_picture: "http://www.siggraph.org/sites/default/files/styles/full_news/public/field/image/women-code.jpg?itok=5Sr7oxlt",
            searchInput: "",
            showProfilePicMenu: false
        }
    }

    searchInputChangeHandler = (e) => {
        this.setState({searchInput: e.target.value});
    }

    profilePicClickHandler = () => {
        this.setState({showProfilePicMenu: true});
    }

    logoutClickHandler = () => {
        sessionStorage.clear();
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    myAccountClickHandler = () => {
        ReactDOM.render(<Profile />, document.getElementById('root'));
    }



    render() {
        return(
            <div>
                <header className='app-header'>
                    <div className='logo'>
                        <Typography>Image Viewer</Typography>
                    </div>
                    {
                        this.props.showSearchBox === 'true' ?
                        <div className='search-box'>
                            <SearchIcon />
                            <Input disableUnderline placeholder='Search...' onChange={this.searchInputChangeHandler}></Input>
                        </div>
                        : ""
                    }

                    {
                        this.props.showProfilePic === 'true' ?
                        <div className='profile-pic'>
                            <IconButton onClick={this.profilePicClickHandler}>
                            <img id='profile-pic-img' src={this.state.profile_picture}  />
                            </IconButton>
                            
                            {
                                this.state.showProfilePicMenu ? (
                                    <div className='profile-pic-menu'>
                                    <MenuList>
                                        <MenuItem onClick={this.myAccountClickHandler}>My Account</MenuItem>
                                        <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                                    </MenuList>
                                    </div>
                                ) : (null)
                            }
                                                     
                                                        
                        </div>
                        : ""
                    }

                    
                </header>
            </div>
        )
    }
}

export default Header;