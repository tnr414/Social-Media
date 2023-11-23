import axios from 'axios'


const API = axios.create('http://localhost:5000');

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (postId, updatedPost) => API.patch(`/posts/${postId}`, updatedPost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId) => API.patch(`/posts/${postId}/likePost`);
export const comment = (value, postId) => API.post(`/posts/${postId}/commentPost`, { value });

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUP = (formData) => API.post(`/user/signup`, formData);