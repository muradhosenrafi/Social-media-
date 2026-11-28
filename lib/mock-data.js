export const currentUser = {
  name: "jone dame",
  username: "jone-dame",
  verified: false,
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
    user: { name: "jone dame", username: "jone-dame", verified: false, avatar: null },
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

export const datingPosts = [
  {
    id: 3,
    user: { name: "সাদিয়া", username: "sadia" },
    title: "কফি আর গল্পের জন্য একজন সঙ্গী খুঁজছি",
    text: "ঢাকায় এই সপ্তাহে কোনো সুন্দর ক্যাফেতে দেখা করতে চাই। আগ্রহী হলে অনুরোধ পাঠান।",
    location: "ঢাকা",
    schedule: "এই সপ্তাহে",
    timeAgo: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    user: { name: "লামিয়া", username: "lamia" },
    title: "উইকেন্ডে বইমেলা ঘুরতে যাব",
    text: "বই আর শান্ত পরিবেশ পছন্দ করেন এমন কারও সঙ্গে ঘুরতে ভালো লাগবে।",
    location: "সিলেট",
    schedule: "শুক্রবার",
    timeAgo: "গতকাল",
  },
  {
    id: 5,
    user: { name: currentUser.name, username: currentUser.username },
    title: "গুলশানে কফি ডেট",
    text: "শান্ত কোনো ক্যাফেতে পরিচিত হতে চাই। আগ্রহী হলে অনুরোধ পাঠান।",
    location: "গুলশান, ঢাকা",
    schedule: "শনিবার বিকেল",
    timeAgo: "৩০ মিনিট আগে",
  },
];

export const profiles = {
  "jone-dame": {
    name: "jone dame",
    username: "jone-dame",
    verified: false,
    avatar: null,
    cover: null,
    location: "Dhaka",
    birthday: "15/05/2000",
    relationship: "single", // single | in_relationship | married
    gender: "male",
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
