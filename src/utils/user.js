import netlifyIdentity from 'netlify-identity-widget';

export const getCurrentUser = netlifyIdentity.currentUser;
export const getToken = user => user && user.token.access_token;
export const getUserName = user => user && user.user_metadata.full_name;
