import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/merge'

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

var nodeReceived = new Subject()

export var currentUser = new BehaviorSubject()
export var loggedIn = currentUser.map(it => it && it.username !== 'anonymous')
export var currentNode = Observable.merge(
  nodeReceived,
  Observable.fromEvent(window, 'popstate').map(ev => ev.state)
)

export function login(username, password) {
  post('/api/v1/auth/login', { username, password })
    .then(user => fetchCurrentUser())
    .catch(response => {
      if (response.status !== 401) {
        throw response
      }
    })
}

export function fetchCurrentUser() {
  get('/api/v1/auth/me').then(res => currentUser.next(res))
}

export function webroot(path) {
  query(webrootQuery, { path }).then(node => nodeReceived.next(node.data.node))
}

export function goto(path) {
  history.pushState({}, null, path)
  nodeReceived.take(1).subscribe(node => history.replaceState(node, null, path))
  webroot(path)
}

function get(path) {
  return fetch(path, {
    credentials: "same-origin"
  }).then(resMapper)
}

function post(path, data) {
  return fetch(path, {
    credentials: "same-origin",
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(resMapper)
}

function resMapper(res) {
  return res.json()
    .then(body => {
      if (res.ok) {
        return body
      } else {
        return { status: res.status, body }
      }
    })
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

