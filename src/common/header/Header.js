import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';

class Header extends Component {
    render() {
        return(
            <div>
                <header className='app-header'>
                    <div className='logo'>
                        <Typography>Image Viewer</Typography>
                    </div>
                    {this.props.showSearchBox === 'true' ?
                        <div className='search-box'>
                            <SearchIcon />
                            <Input disableUnderline='true' placeholder='Search...'></Input>
                        </div>
                        : ""}
                    
                </header>
            </div>
        )
    }
}

export default Header;