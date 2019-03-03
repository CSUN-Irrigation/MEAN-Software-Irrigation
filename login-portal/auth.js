// This file sets up the authentication service.

var okta = require("@okta/okta-sdk-nodejs");
var { ExpressOIDC } = require("@okta/oidc-middleware");

var oktaClient = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN
});

const oidc = new ExpressOIDC({
  issuer: process.env.OKTA_ORG_URL + "/oauth2/default",
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  appBaseUrl: process.env.OKTA_APPBASEURL || "http://localhost:3000",
  redirect_uri: process.env.OKTA_CALLBACK_URI || "http://localhost:3000/dashboard",
  nonce: '235',
  response_type: 'id_token',
  response_mode: 'form_post',
  state: 'auth',
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});

module.exports = { oidc, oktaClient };
