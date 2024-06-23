import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AmazonReviewData from '../../AmazonReviewData/AmazonReviewData';
import get_positive_filter from '../../../api/get_positive_filter';
import get_negative_filter from '../../../api/get_negative_filter';
import filter_by_popular_words from '../../../api/filter_by_popular_words';

const drawerWidth = 240;

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const [category, setCategory] = React.useState('');

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const handlePositiveFilter = async () => {
        try {
            const positiveData = await get_positive_filter();
            setReviewData(JSON.parse(positiveData));
        } catch (error) {
            console.error('Error fetching positive data:', error);
        }
    };

    const handleNegativeFilter = async () => {
        try {
            const negativeData = await get_negative_filter();
            
            setReviewData(JSON.parse(negativeData));
        } catch (error) {
            console.error('Error fetching negative data:', error);
        }
    };

    const handleFilterWordsByCategory = async (category) => {
        try {
            const filteredData = await filter_by_popular_words(category);
            console.log("filteredData",filteredData);
            // setReviewData(JSON.parse(filteredData));
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Amazon Review Data
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button onClick={() => {setCategory('positive'); handlePositiveFilter();}} sx={{ color: '#fff', mr: 2 }}>
                            Positive
                        </Button>
                        <Button onClick={() => {setCategory('negative'); handleNegativeFilter();}} sx={{ color: '#fff', mr: 2 }}>
                            Negative
                        </Button>
                        <Button onClick={() => handleFilterWordsByCategory(category)} sx={{ color: '#fff', mr: 2 }}>
                            Filter category by popular words
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {/* Drawer content here */}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography>
                    <AmazonReviewData reviewData={reviewData} />
                </Typography>
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
