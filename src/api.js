import Rx from 'rxjs/Rx'
import axios from 'axios'

const project = 'animeranking'
const graphql = `/api/v1/${project}/graphql`
const graphInit = {
  method: "POST"
}

const webrootQuery =
  `
query webroot($path: String) {
  node(path: $path) {    
    uuid
    version
    language
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

var nodeReceived = new Rx.Subject()

export var currentUser = new Rx.BehaviorSubject()
export var loggedIn = currentUser.map(it => it && it.username !== 'anonymous')
export var currentNode = Rx.Observable.merge(
  nodeReceived,
  Rx.Observable.fromEvent(window, 'popstate').map(ev => ev.state)
)

export var nodeUpdated = new Rx.Subject()

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

export function graphToRest(nodeObs) {
  return nodeObs.switchMap(node => Rx.Observable.fromPromise(getNode(node.uuid)))
}

export function getNode(uuid) {
  return get(`/api/v1/${project}/nodes/${uuid}`)
}

export function createNode(node) {
  return post(`/api/v1/${project}/nodes`, node)
}

export function nodeRx(uuid) {
  return Rx.Observable.merge(
    Rx.Observable.fromPromise(getNode(uuid)),
    nodeUpdated.filter(node => node.uuid === uuid)
  )
}

export function save(node) {
  return post(`/api/v1/${project}/nodes/${node.uuid}`, node).then(node => {
    nodeUpdated.next(node)
    return node
  })
}

export function deleteNode(uuid) {
  return rdelete(`/api/v1/${project}/nodes/${uuid}`)
}

let cancelSearch
export function searchAnime(input) {
  if (cancelSearch) {
    cancelSearch()
  }
  return axios.get(`/search/prefix.json?type=anime&keyword=${input}&v=1`, {
    cancelToken: new axios.CancelToken(c => cancelSearch = c)
  }).then(result => {
    cancelSearch = undefined
    return result.data.categories[0].items
  })
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

function rdelete(path) {
  return fetch(path, {
    method: 'DELETE',
    credentials: "same-origin"
  })
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

export function catchCancel(err) {
  if (!axios.isCancel(err)) {
    throw err
  }
}
export function l(o) {
  console.log(JSON.stringify(o, undefined, 2))
  return o
}