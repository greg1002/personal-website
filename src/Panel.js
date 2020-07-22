import React, { Component } from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Grid, Box } from '@material-ui/core';
import { School, Work, Business, Code, Error } from '@material-ui/icons';

/*
JSON FORMAT:
{
  image:
  title:
  subtitle:
  body:
  links: [
    {
      name:
      href:
    }, ...
  ]
}

*/
export default class Panel extends Component {

  getCardMedia = (json) => {
    return json.image == null ? <div /> :
    <CardMedia
      src={json.image}
      component="img"
    />
  }

  getIcon = (type) => {
    switch(type) {
      case "school": return <School/>
      case "work": return <Work />
      case "business": return <Business />
      case "code": return <Code />
      default: return <Error />
    }
  }

  getCardIcons = (icons) => {
    return icons == null ? <div /> :
    <Grid container>{
        icons.map(icon => {
          return (
            <Grid item xs={12} sm={6}>
              <Box p={1} display="flex" alignItems="center">
                {this.getIcon(icon.type)}
                <Box pl={2}>
                  <Typography variant="body2">{icon.text}</Typography>
                </Box>
              </Box>
            </Grid>
          )
        })
      }</Grid>
  }

  getCardContent = (json) => {
    return (
      <CardContent>
        {
          json.title == null ? <div /> :
          <Typography variant="h5" component="h2">
            {json.title}
          </Typography>
        }
        {
          json.subtitle == null ? <div /> :
          <Typography variant="subtitle2" color="textSecondary">
            {json.subtitle}
          </Typography>
        }
        {
          json.icons == null ? <div /> : this.getCardIcons(json.icons)
        }
        {
          json.body == null ? <div /> :
          <Typography variant="body2" component="p">
            {json.body}
          </Typography>
        }
      </CardContent>
    )
  }

  getCardActions = (json) => {
    return json.links == null || json.links.length === 0 ? <div /> :
    <CardActions><Grid container>
      {
        json.links.map(link => {
          return (
            <Grid item xs={12 / json.links.length}>
              <Button href={link.href} size="small" fullWidth="true" color="primary">
              {link.name}
              </Button>
            </Grid>
          )
        })
      }
    </Grid></CardActions>
  }

  render() {
    const { json } = this.props;
    return (
      <Card>
        {this.getCardMedia(json)}
        {this.getCardContent(json)}
        {this.getCardActions(json)}
      </Card>
    )
  }
}
