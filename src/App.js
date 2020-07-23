import React, { Component } from 'react';
import './App.css';
import Panel from './Panel.js';
import { Container, Grid, Typography, Box, ListSubheader, ListItem, List, Fragment } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

var json = require('./info.json');

export default function App() {
    return (
      <SectionList />
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    position: 'absolute',
    overflow: 'auto',
    height: '100%'
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  }
}));

function SectionList() {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>{
      json.map(section => {
        return (
          <li className={classes.listSection}>
            <ul className={classes.ul}>
              <Section json={section}/>
            </ul>
          </li>
        )
      })
    }</List>
  )
}

function Section(props) {
  const classes = useStyles();
  const { name, type } = props.json;
  return (
    <React.Fragment>
      <Header name={name} />
      <ListItem>
        <Container maxWidth="sm">
          {
            type === "timeline" ?
            <Timeline>
              <Panels json={props.json} />
            </Timeline> :
            <Grid container alignItems="stretch" spacing={3}>
              <Panels json={props.json} />
            </Grid>
          }
        </Container>
      </ListItem>
    </React.Fragment>
  )
}

function Header(props) {
  const { name } = props;
  return (
    <ListSubheader color='inherit'>
      <Box p={2}>
        <Typography align="center" variant="h5">{name}</Typography>
      </Box>
    </ListSubheader>
  )
}

function Panels(props) {
  const { panels, type } = props.json;
  return (
    panels.map(panel => {
      return (
        type === "timeline" ?
        <TimelineItem>
          {panel.date == null ? <div /> : <TimelineOppositeContent><Typography variant="subtitle2">{panel.date}</Typography></TimelineOppositeContent>}
          <TimelineSeparator>
            <TimelineDot color="primary"/>
            {panels[panels.length - 1] === panel ? <div /> : <TimelineConnector/>}
          </TimelineSeparator>
          <TimelineContent><Panel json={panel} /></TimelineContent>
        </TimelineItem> :
        type === "medium" ?
        <Grid xs={12} sm={6} item><Panel json={panel} /></Grid> :
        type === "small" ?
        <Grid xs={6} sm={4} item><Panel json={panel} /></Grid> :
        <Grid xs={12} item><Panel json={panel} /></Grid>
      );
    })
  )
}
