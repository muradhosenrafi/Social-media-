import { useSyncExternalStore } from "react";
import { posts as seedPosts } from "@/lib/mock-data";

const STORAGE_KEY = "datenexa:posts";
const CHANGE_EVENT = "datenexa:posts-change";
let cachedSnapshot;
let cachedRawValue;

function readPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return seedPosts;
    if (saved === cachedRawValue && cachedSnapshot) return cachedSnapshot;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return seedPosts;
    cachedRawValue = saved;
    cachedSnapshot = parsed;
    return cachedSnapshot;
  } catch {
    return seedPosts;
  }
}

function subscribe(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return readPosts();
}

function getServerSnapshot() {
  return seedPosts;
}

export function usePosts() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function writePosts(nextPosts) {
  try {
    const serialized = JSON.stringify(nextPosts);
    localStorage.setItem(STORAGE_KEY, serialized);
    cachedRawValue = serialized;
    cachedSnapshot = nextPosts;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Keep the current UI stable if browser storage is unavailable.
  }
}

export function addPost(post) {
  writePosts([post, ...readPosts()]);
}

export function deletePost(postId) {
  writePosts(readPosts().filter((post) => post.id !== postId));
}
