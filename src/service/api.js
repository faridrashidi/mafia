const { BASE_URL } = process.env;
export default {
  // Characters
  getRoles: { method: "GET", url: `${BASE_URL}/api/characters.json` },
  getReplacingRoles: { method: "GET", url: `${BASE_URL}/api/replacingRoles.json` },
  // Third Party
  postToDiscord: { method: "POST" }
};
