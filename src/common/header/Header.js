import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';


class Header extends Component {

    constructor() {
        super();
        this.state = {
            profile_picture: "http://www.siggraph.org/sites/default/files/styles/full_news/public/field/image/women-code.jpg?itok=5Sr7oxlt"
        }
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
                            <Input disableUnderline placeholder='Search...'></Input>
                        </div>
                        : ""
                    }

                    {
                        this.props.showProfilePic === 'true' ?
                        <div className='profile-pic'>
                            <img src={this.state.profile_picture} id='profile-pic-img' />
                        </div>
                        : ""
                    }

                    
                </header>
            </div>
        )
    }
}

export default Header;