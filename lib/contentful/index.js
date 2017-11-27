/*
global
  CONTENTFUL_SPACE,
  CONTENTFUL_TOKEN
*/// Dependencies

import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_TOKEN
});

export const getNotices = (contentType) => {
  return contentfulClient
    .getEntries({ content_type: contentType })
    .then( processContentfulResponse )
    .catch( err => console.error(err) )
};

const isGetter = (obj, prop) => {
  return !!Object.getOwnPropertyDescriptor(obj, prop)['get']
};

const processContentfulResponse = (response) => {
  if (response.items && !Array.isArray(response.items)) {
    return response.items.fields
  }

  const newContentfulObject = response.items.map(
    entry => {
      const obj = {}
      Object.keys(entry.fields || {})
        .map(prop => {
          if (isGetter(entry.fields, prop)) {
            obj[prop] = processContentfulResponse({ items: entry.fields[prop] })
          } else {
            obj[prop] = entry.fields[prop]
          }
        })
      return obj
    }
  )
  return newContentfulObject
};
