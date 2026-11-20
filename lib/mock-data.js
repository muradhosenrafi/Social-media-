export const currentUser = {
  name: "jone dame",
  username: "jone-dame",
  verified: true,
  balance: "10.00",
  avatar: null,
};

export const friendRequestCount = 3;
export const hasUnreadNotifications = true;

export const people = [
  { id: 1, name: "সাদিয়া", username: "sadia", avatar: null },
  { id: 2, name: "লামিয়া", username: "lamia", avatar: null },
];

export const chatContacts = [
  { id: 1, name: "murad", avatar: null },
  { id: 2, name: "sadia", avatar: null },
];

export const stories = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Story ${i + 1}`,
  seen: i > 6,
  avatar: null,
}));

export const posts = [
  {
    id: 1,
    user: { name: "jone dame", username: "jone-dame", verified: true, avatar: null },
    timeAgo: { bn: "১ দিন", en: "1 day" },
    text: "nice description",
    image: null, // ছবির লিংক দিলে ছবি দেখাবে, null হলে ধূসর ব্লক
  },
  {
    id: 2,
    user: { name: "সাদিয়া", username: "sadia", verified: false, avatar: null },
    timeAgo: { bn: "২ ঘণ্টা", en: "2 hours" },
    text: "আজকের দিনটা খুব সুন্দর!",
    image: null,
  },
];

export const profiles = {
  "jone-dame": {
    name: "jone dame",
    username: "jone-dame",
    verified: true,
    avatar: null,
    cover: null,
    location: "Dhaka",
    birthday: "15/05/2000",
    relationship: "single", // single | in_relationship | married
  },
  sadia: {
    name: "সাদিয়া",
    username: "sadia",
    verified: false,
    avatar: null,
    cover: null,
    location: "Chattogram",
    birthday: "02/11/2001",
    relationship: "single",
  },
  lamia: {
    name: "লামিয়া",
    username: "lamia",
    verified: false,
    avatar: null,
    cover: null,
    location: "Sylhet",
    birthday: "20/03/1999",
    relationship: "in_relationship",
  },
};

export const getProfile = (username) => profiles[username] ?? null;