import React from 'react';
import '../css/main.css';
import {
    Button,
    useMediaQuery,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    makeStyles,
    Radio,
    FormControl,
    FormControlLabel,
    RadioGroup,
    FormGroup,
    Checkbox,
    Slider,
    withStyles,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from '../css/filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateType,
    addFilter,
    removeFilter,
    updateFilter,
} from '../actions/setFilters';
import { getAvailableFilters } from '../selectors';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
    root: {
        background: 'none',
        color: 'var(--white)',
        boxShadow: 'none',
    },
    slider: {
        color: 'var(--gold)',
        '& span': {
            ' & span': {
                ' & span': {
                    ' & span': {
                        color: 'var(--side-color)',
                        fontWeight: '700',
                        textAlign: 'center',
                        lineHeight: '.6rem',
                    },
                },
            },
        },
    },
    radio: {
        color: 'var(--white)',
        textTransform: 'capitalize',
        '& span': {
            fontWeight: '600',
            fontFamily: 'Open Sans',
        },
    },
    expansionSummary: {
        textTransform: 'uppercase',
        fontWeight: '700',
        padding: 0,
    },
    expansionDetails: {
        padding: 0,
        '& .MuiTypography-body1': {
            color: 'var(--grey)',
            textTransform: 'capitalize',
            fontWeight: '700',
        },
    },
    close: {
        position: 'fixed',
        top: 2,
        right: 2,
        zIndex: 1300,
        color: 'var(--white)',
    },
});

const GoldCheckbox = withStyles({
    root: {
        color: 'var(--gold)',
        '&$checked': {
            color: 'var(--gold)',
        },
    },
    checked: {},
})((props) => <Checkbox {...props} />);

const GoldRadio = withStyles({
    root: {
        color: 'var(--gold)',
        '&$checked': {
            color: 'var(--gold)',
        },
        padding: '.2rem .5rem',
    },
    checked: {},
})((props) => <Radio {...props} />);

const FilterButton = withStyles({
    root: {
        color: 'var(--grey)',
        backgroundColor: 'var(--side-color)',
        fontFamily: 'Open Sans',
        fontWeight: 700,
        textTransform: 'none',
        marginLeft: '1.1rem',
        marginBottom: '1rem',
        fontSize: '1.1rem',
        padding: '.5rem .8rem',
    },
})((props) => <Button {...props} />);

const Filter = (props) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleFilterToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const isSmall = useMediaQuery('(max-width: 900px)');
    const classes = useStyles();

    // Reading from Redux
    const type = useSelector((state) => state.filters.type);
    const availablefilters = useSelector((state) => getAvailableFilters(state));
    const reduxFilters = useSelector((state) => state.filters);

    // Writing to Redux
    const dispatch = useDispatch();
    const handleChangeType = (event) => {
        dispatch(updateType(event.target.value));
    };
    const handleCheckBox = (filterName, filterValue, checked) => {
        if (checked) {
            dispatch(addFilter(filterName, filterValue));
        } else {
            dispatch(removeFilter(filterName, filterValue));
        }
    };
    const filters = (
        <div className={styles.bg}>
            {!type && <p>Please choose a type to view more filter options:</p>}
            <FormControl>
                <RadioGroup
                    aria-label="type"
                    value={type}
                    onChange={handleChangeType}
                >
                    <FormControlLabel
                        value="laptop"
                        control={<GoldRadio />}
                        label="laptop"
                        className={classes.radio}
                    />
                    <FormControlLabel
                        value="tablet"
                        control={<GoldRadio />}
                        label="tablet"
                        className={classes.radio}
                    />
                    <FormControlLabel
                        value="textbook"
                        control={<GoldRadio />}
                        label="textbook"
                        className={classes.radio}
                    />
                    <FormControlLabel
                        value={''}
                        control={<GoldRadio />}
                        label="all"
                        className={classes.radio}
                    />
                </RadioGroup>
            </FormControl>
            <div className={styles.checkboxes}>
                {Object.keys(availablefilters).map((key) => {
                    let sum = Object.keys(availablefilters[key]).reduce(
                        (sum, cur) => sum + availablefilters[key][cur],
                        0
                    );
                    return sum ? (
                        <ExpansionPanel key={key} className={classes.root}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.expansionSummary}
                            >
                                {`${key} `}
                                <span className={styles.num}>{` ${sum}`}</span>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                className={classes.expansionDetails}
                            >
                                <FormControl>
                                    <FormGroup>
                                        {Object.keys(availablefilters[key]).map(
                                            (value) => {
                                                return (
                                                    <FormControlLabel
                                                        key={value}
                                                        control={
                                                            <GoldCheckbox
                                                                name={value}
                                                                checked={reduxFilters[
                                                                    key
                                                                ].includes(
                                                                    value
                                                                )}
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleCheckBox(
                                                                        key,
                                                                        event
                                                                            .target
                                                                            .name,
                                                                        event
                                                                            .target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={`${value} (${availablefilters[key][value]})`}
                                                    />
                                                );
                                            }
                                        )}
                                    </FormGroup>
                                </FormControl>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ) : null;
                })}
            </div>
        </div>
    );
    return (
        <div>
            {isSmall ? (
                <div>
                    <FilterButton onClick={handleFilterToggle}>
                        <FilterListIcon style={{ marginRight: '.5rem' }} />{' '}
                        Filter
                    </FilterButton>
                    {mobileOpen && (
                        <>
                            <div>{filters}</div>
                            <IconButton
                                className={classes.close}
                                aria-label="close"
                                onClick={handleFilterToggle}
                            >
                                <CloseIcon fontSize="large" />
                            </IconButton>
                        </>
                    )}
                </div>
            ) : (
                <div>{filters}</div>
            )}
        </div>
    );
};

export default Filter;
