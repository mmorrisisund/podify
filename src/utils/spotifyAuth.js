class ErrorResponse extends Error {
  constructor (response, body) {
    super(response.statusText)
    this.status = response.status
    this.body = body
  }
}

async function generateCodeChallenge (code_verifier) {
  const codeVerifierBytes = new TextEncoder().encode(code_verifier)
  const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBytes)
  return base64url(new Uint8Array(hashBuffer))
}

function base64url (bytes) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function createAccessToken (params) {
  const response = await fetchJson('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.REACT_APP_SPOTIFY_ID,
      ...params
    })
  })
  const accessToken = response.access_token
  const expiresAt = Date.now() + 1000 * response.expires_in

  localStorage.setItem('tokenSet', JSON.stringify({ ...response, expiresAt }))

  return accessToken
}

async function getAccessToken () {
  const tokenSet = JSON.parse(localStorage.getItem('tokenSet'))

  if (!tokenSet) return

  if (tokenSet.expiresAt < Date.now()) {
    return await createAccessToken({
      grant_type: 'refresh_token',
      refresh_token: tokenSet.refresh_token
    })
  }
  return tokenSet.access_token
}

export async function fetchJson (url, init = {}) {
  const response = await fetch(url, init)
  const body = await response.json()

  if (!response.ok) {
    throw new ErrorResponse(response, body)
  }

  return body
}

export async function fetchWithToken (url, init = {}) {
  const token = await getAccessToken()

  if (!token) {
    throw new ErrorResponse(new Response(undefined, { status: 401 }), {})
  }

  return fetchJson(url, {
    ...init,
    headers: {
      ...init.headers,
      authorization: `Bearer ${token}`
    }
  })
}

export async function beginLogin () {
  const codeVerifier = base64url(crypto.getRandomValues(new Uint8Array(96)))
  const state = base64url(crypto.getRandomValues(new Uint8Array(96)))
  const scope = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'user-read-email',
    'user-library-read',
    'user-library-modify'
  ].join(' ')

  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_ID,
    response_type: 'code',
    redirect_uri: `${window.location.origin}/spotify-auth`,
    code_challenge_method: 'S256',
    code_challenge: await generateCodeChallenge(codeVerifier),
    state,
    scope
  })

  sessionStorage.setItem('code_verifier', codeVerifier)
  sessionStorage.setItem('state', state)

  window.location.href = `https://accounts.spotify.com/authorize?${params}`
}

export async function completeLogin () {
  const codeVerifier = sessionStorage.getItem('code_verifier')
  const state = sessionStorage.getItem('state')
  const params = new URLSearchParams(window.location.search)

  if (params.has('error')) {
    throw new Error(params.get('error'))
  } else if (!params.has('state')) {
    throw new Error('State missing from response')
  } else if (params.get('state') !== state) {
    throw new Error('State mismatch')
  } else if (!params.has('code')) {
    throw new Error('Code missing from response')
  }

  await createAccessToken({
    grant_type: 'authorization_code',
    code: params.get('code'),
    redirect_uri: `${window.location.origin}/spotify-auth`,
    code_verifier: codeVerifier
  })
}
