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
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AmazonReviewData from '../../AmazonReviewData/AmazonReviewData';
import get_positive_filter from '../../../api/get_positive_filter';
import get_negative_filter from '../../../api/get_negative_filter';
import filter_by_popular_words from '../../../api/filter_by_popular_words';
import findSimilarWords from '../../../api/findSimilarWords';
import AlertDialogSlide from '../AlertDialogSlide/AlertDialogSlide';
import DownloadExcelButton from '../../DownloadExcelButton';
import fetch_test_csv from '../../../api/get_test_csv';
import { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const drawerWidth = 240;
function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const [category, setCategory] = React.useState('');
    const [searchText, setSearchText] = React.useState(''); // State to hold the input value
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogData, setDialogData] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClickPositive = (event) => {
        setCategory('positive');
    };
    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch_test_csv();
                console.log("response", response);
                setReviewData(JSON.parse(response));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const handlePositiveFilter = async () => {
        try {
            const positiveData = await get_positive_filter();
            setReviewData(JSON.parse(positiveData));
            setCategory('positive');
        } catch (error) {
            console.error('Error fetching positive data:', error);
        }
    };

    const handleNegativeFilter = async () => {
        try {
            const negativeData = await get_negative_filter();
            setReviewData(JSON.parse(negativeData));
            setCategory('negative');
        } catch (error) {
            console.error('Error fetching negative data:', error);
        }
    };

    const handleFilterWordsByCategory = async (category) => {
        try {
            const filteredData = await filter_by_popular_words(category);
            setDialogData(filteredData);
            setDialogOpen(true);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const searchParams = { searchText, category };
            const similarWordsData = await findSimilarWords(searchParams);
            console.log("similarWordsData", similarWordsData);
            // Handle the data received from the search_similar_words function
        } catch (error) {
            console.error('Error fetching similar words data:', error);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
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
                        sx={{ flexGrow: 0.8, display: { xs: 'none', sm: 'block' } }}
                    >
                        Amazon Review Data
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                        <Button onClick={handlePositiveFilter} sx={{ color: '#fff', mr: 2 }}>
                            Positive
                        </Button>
                        <Button onClick={handleNegativeFilter} sx={{ color: '#fff', mr: 2 }}>
                            Negative
                        </Button>
                        <div>
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                Filter by category
                            </Button>
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >

                                <MenuItem onClick={() => { handleClose(); handleFilterWordsByCategory('negative'); }} disableRipple>
                                    <FileCopyIcon />
                                    Negative
                                </MenuItem>

                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={() => { handleClose(); handleFilterWordsByCategory('positive'); }} disableRipple>
                                    <ArchiveIcon />
                                    Positive
                                </MenuItem>

                            </StyledMenu>
                        </div>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, mr: 2 }}
                            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search for similar words"
                                inputProps={{ 'aria-label': 'search for similar words' }}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)} // Update the searchText state on input change
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <DownloadExcelButton data={reviewData} filename="review_data" />
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
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <div>

                            <Button onClick={handlePositiveFilter} sx={{ color: '#000', mb: 2 }}>
                                Positive
                            </Button>
                        </div>
                        <div>
                            <Button onClick={handleNegativeFilter} sx={{ color: '#000', mb: 2 }}>
                                Negative
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => handleFilterWordsByCategory(category)} sx={{ color: '#000', mb: 2 }}>
                                Filter category by popular words
                            </Button>
                        </div>
                    </Box>
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography>
                    <AmazonReviewData reviewData={reviewData} />
                </Typography>
            </Box>
            <AlertDialogSlide
                open={dialogOpen}
                onClose={handleCloseDialog}
                data={dialogData}
            />
        </Box>
    );
}
DrawerAppBar.propTypes = {
    window: PropTypes.func,
};
export default DrawerAppBar;

