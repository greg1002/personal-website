import React, { Component } from 'react';
import './App.css';
import Panel from './Panel.js';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@material-ui/lab';

var json = require('./info.json');

export default class App extends Component {

  getSections = () => {
    return (
      json.map(section => {
        return <Section json={section}/>;
      })
    )
  }

  render() {
    return (
      <Container maxWidth="sm">
        {this.getSections()}
      </Container>
    );
  }
}



class Section extends Component {

  getTimelinePanel = (panel) => {
    const { panels } = this.props.json;
    return (
      <TimelineItem>
        {panel.date == null ? <div /> : <TimelineOppositeContent><Typography variant="subtitle2">{panel.date}</Typography></TimelineOppositeContent>}
        <TimelineSeparator>
          <TimelineDot color="primary"/>
          {panels[panels.length - 1] === panel ? <div /> : <TimelineConnector/>}
        </TimelineSeparator>
        <TimelineContent><Panel json={panel} /></TimelineContent>
      </TimelineItem>
    )
  }

  getPanels = () => {
    const { panels, type } = this.props.json;
    return (
      panels.map(panel => {
        return (
          type === "timeline" ? this.getTimelinePanel(panel) :
          type === "medium" ?
          <Grid xs={12} sm={6} item><Panel json={panel} /></Grid> :
          type === "small" ?
          <Grid xs={6} sm={4} item><Panel json={panel} /></Grid> :
          <Grid xs={12} item><Panel json={panel} /></Grid>
        );
      })
    )
  }

  getHeader = () => {
    const { name } = this.props.json;
    return (
      <Typography align="center" variant="h5">{name}</Typography>
    )
  }

  render() {
    const { name, type } = this.props.json;
    return (
      <React.Fragment>
      {this.getHeader()}
      {
        type === "timeline" ?
        <Timeline>
          {this.getPanels()}
        </Timeline> :
        <Grid container alignItems="stretch" spacing={3}>
          {this.getPanels()}
        </Grid>
      }</React.Fragment>
    )
  }
}
