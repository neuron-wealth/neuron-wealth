import { api, post } from "./api";

const BASE = "/api/blogs";
const json = (method, body) => ({ method, body: JSON.stringify(body || {}) });
const id = (value) => encodeURIComponent(value);

export const listBlogs = () => api(BASE);

export const fetchBlogMeta = () => api(`${BASE}/meta`);

export const fetchBlog = (blogId) => api(`${BASE}/${id(blogId)}`).then((data) => data.post);

export const createBlog = (blog) => post(BASE, blog);

export const saveBlog = (blogId, blog) => api(`${BASE}/${id(blogId)}`, json("PUT", blog));

export const setBlogStatus = (blogId, status) => api(`${BASE}/${id(blogId)}/status`, json("PATCH", { status }));

export const deleteBlog = (blogId) => api(`${BASE}/${id(blogId)}`, { method: "DELETE" });

export const restoreBlog = (blogId) => post(`${BASE}/${id(blogId)}/restore`);

export const importOriginalBlogs = () => post(`${BASE}/import-originals`);

export function uploadBlogImage(file) {
  const body = new FormData();
  body.append("image", file);
  return api(`${BASE}/media`, { method: "POST", body }).then((data) => data.image);
}

export function listComments(params = {}) {
  const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null));
  return api(`${BASE}/comments?${query}`);
}

export const updateComment = (commentId, changes) => api(`${BASE}/comments/${id(commentId)}`, json("PATCH", changes));

export const deleteComment = (commentId) => api(`${BASE}/comments/${id(commentId)}`, { method: "DELETE" });

export const replyToComment = (commentId, reply) => post(`${BASE}/comments/${id(commentId)}/reply`, reply);

export const bulkComments = (ids, action) => post(`${BASE}/comments/bulk`, { ids, action });
