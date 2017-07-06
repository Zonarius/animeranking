import bus from './bus'

const graphql = "/api/v1/animeranking/graphql"
const graphInit = {
  method: "POST"
}

const webrootQuery =
  `
query webroot($path: String) {
  node(path: $path) {
    uuid
    version
    breadcrumb {
      ... breadcrumb
    }
    fields {
      ...field
      ... on season {
        anime {
          ... on reference {
            reference {
              fields {
                ...field
              }
            }
          }
        }
      }
    }
    children(perPage: 100000) {
      elements {
        uuid
        path
        fields {
          ...field
        }
      }
    }
  }
}

fragment field on Fields {
  __typename
  ... on year {
    name
    image {
      path
    }
    spring {
      path
    }
    summer {
      path
    }
    fall {
      path
    }
    winter {
      path
    }
  }
  ... on season {
    name
    anime {
      ...micronode
    }
  }
  ... on anime {
    name
    thumbnailUrl
    malId
    malScore
  }
}

fragment micronode on Micronode {
  __typename
  ... on tier {
    name
  }
}

fragment breadcrumb on Node {
  path
  uuid
  fields {
    ... on year {name}
  }
}
`

let loggedIn = false;

export function isLoggedIn() {
  return loggedIn;
}

export function login() {
  loggedIn = true;
  bus.$emit('login')
}

export function webroot(path) {
  return query(webrootQuery, { path })
}

function query(q, variables) {
  return fetch(graphql, {
    ...graphInit,
    body: JSON.stringify({
      query: q,
      variables
    })
  }).then(result => result.json())
}

