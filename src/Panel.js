import React, { Component } from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import { theme } from 'theme.js';

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
      image={json.image}
      component="img"
    />
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
    <CardActions>
      {
        json.links.map(link => {
          return (
            <Button href={link.href} size="small" color="primary">
              {link.name}
            </Button>
          )
        })
      }
    </CardActions>
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
