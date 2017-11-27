// Dependencies
import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: '5ztsywrf4pef',
  accessToken: '05c365396b7b983b6c999df614aee0749d2af42a65e2c4934bd11c6910fbbd36'
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
