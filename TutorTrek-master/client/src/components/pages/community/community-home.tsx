import React, { useState } from 'react';
import { 
  FiHeart, 
  FiMessageSquare, 
  FiPlus, 
  FiSearch, 
  FiTrendingUp, 
  FiBookmark, 
  FiShare2, 
  FiMessageCircle,
  FiCode
} from "react-icons/fi";
import { FaHeart, FaUserCircle, FaHashtag } from "react-icons/fa";

interface Post {
  id: string;
  author: {
    name: string;
    role: 'Instructor' | 'Student' | 'Admin';
    avatarUrl: string;
  };
  title: string;
  content: string;
  channel: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  timePosted: string;
  isLikedByUser: boolean;
}

const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      name: 'Sarah Connor',
      role: 'Instructor',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    title: 'Top 5 React & TypeScript Practices for 2026',
    content: "Hey everyone! When typing React hooks, let's remember to use proper generics rather than 'any'. For example, when typing state in usePagination, always bind your types explicitly to prevent runtime errors. Also, use strict type-guards for custom events. Check out my course 'Mastering React & TypeScript' for the full deep dive!",
    channel: 'React & TypeScript',
    tags: ['React', 'TypeScript', 'Frontend', 'BestPractices'],
    likes: 42,
    commentsCount: 12,
    timePosted: '2 hours ago',
    isLikedByUser: false
  },
  {
    id: 'post-2',
    author: {
      name: 'Alex Mercer',
      role: 'Instructor',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    title: 'Microservices vs. Monoliths: A Modern Assessment',
    content: "Monoliths are NOT dead! Before splitting your system into 20 microservices, evaluate your organization structure, domain boundaries, and network latency requirements. A modular monolith with clean boundaries often yields better developer velocity and lower operations overhead for 90% of use cases.",
    channel: 'System Architecture',
    tags: ['SystemDesign', 'Microservices', 'Architecture', 'Scaling'],
    likes: 31,
    commentsCount: 8,
    timePosted: '5 hours ago',
    isLikedByUser: false
  },
  {
    id: 'post-3',
    author: {
      name: 'John Doe',
      role: 'Student',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    },
    title: 'Passed my Stripe Webhook Integration Test successfully!',
    content: "Finally got the raw request body verification working with Express and Stripe signature! Bypassing normal parser rules for that specific route was the key. Big shoutout to the discussion threads here for pointing me in the right direction. If anyone is struggling with webhook validation, let me know!",
    channel: 'General Chat',
    tags: ['Stripe', 'Express', 'Backend', 'Webhooks'],
    likes: 19,
    commentsCount: 5,
    timePosted: '1 day ago',
    isLikedByUser: false
  }
];

const CHANNELS = [
  'All Channels',
  'React & TypeScript',
  'System Architecture',
  'General Chat',
  'Career Advice',
  'Showcase'
];

const TRENDING_TOPICS = [
  { tag: 'TypeScript', posts: 124 },
  { tag: 'SystemDesign', posts: 89 },
  { tag: 'StripeWebhooks', posts: 56 },
  { tag: 'React19', posts: 45 },
  { tag: 'NextJS', posts: 37 }
];

const TOP_CONTRIBUTORS = [
  {
    name: 'Sarah Connor',
    role: 'Instructor',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    points: 1540
  },
  {
    name: 'Alex Mercer',
    role: 'Instructor',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    points: 1280
  },
  {
    name: 'John Doe',
    role: 'Student',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    points: 490
  }
];

const CommunityHome: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS);
  const [activeChannel, setActiveChannel] = useState<string>('All Channels');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // New post form state
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostChannel, setNewPostChannel] = useState<string>('General Chat');
  const [newPostTags, setNewPostTags] = useState<string>('');

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLikedByUser;
          return {
            ...post,
            isLikedByUser: isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const tagsArray = newPostTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: 'You (Student)',
        role: 'Student',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      },
      title: newPostTitle,
      content: newPostContent,
      channel: newPostChannel,
      tags: tagsArray.length ? tagsArray : ['General'],
      likes: 0,
      commentsCount: 0,
      timePosted: 'Just now',
      isLikedByUser: false
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    setIsModalOpen(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesChannel = activeChannel === 'All Channels' || post.channel === activeChannel;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesChannel && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      {/* Banner / Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white py-16 px-6 shadow-md">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">TutorTrek Community</h1>
            <p className="mt-2 text-blue-100 text-lg md:text-xl font-light">
              Connect, share ideas, and level up your coding skills with students and tutors.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
          >
            <FiPlus size={20} />
            <span>Create Discussion</span>
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: Channels */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Explore Channels
              </h2>
              <div className="space-y-1">
                {CHANNELS.map(channel => (
                  <button
                    key={channel}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      activeChannel === channel
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`${activeChannel === channel ? 'text-indigo-600' : 'text-gray-400'}`}>
                        #
                      </span>
                      {channel}
                    </span>
                    {channel === 'All Channels' && (
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                        {posts.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Feed */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Search Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiSearch size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, content, or tags..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-gray-700 text-sm placeholder-gray-400 transition-all duration-200"
              />
            </div>

            {/* Posts List */}
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <article 
                    key={post.id} 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800 text-sm">{post.author.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              post.author.role === 'Instructor' 
                                ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                                : post.author.role === 'Admin'
                                ? 'bg-red-50 text-red-600 border border-red-100'
                                : 'bg-blue-50 text-blue-600 border border-blue-100'
                            }`}>
                              {post.author.role}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">{post.timePosted}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50/50 px-3 py-1 rounded-full">
                        #{post.channel}
                      </span>
                    </div>

                    {/* Title & Body */}
                    <h3 className="mt-4 text-lg font-bold text-gray-900 leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors duration-150 px-2.5 py-1 rounded-md cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions footer */}
                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-gray-500 text-xs font-medium">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 transition-colors duration-150 hover:text-red-500 ${
                            post.isLikedByUser ? 'text-red-500 font-semibold' : ''
                          }`}
                        >
                          {post.isLikedByUser ? (
                            <FaHeart className="text-red-500 scale-110 transition-transform duration-200" size={14} />
                          ) : (
                            <FiHeart size={15} />
                          )}
                          <span>{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer">
                          <FiMessageCircle size={15} />
                          <span>{post.commentsCount} comments</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="hover:text-indigo-600">
                          <FiBookmark size={15} />
                        </button>
                        <button className="hover:text-indigo-600">
                          <FiShare2 size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white py-12 px-6 rounded-2xl shadow-sm text-center border border-gray-100">
                <FiMessageSquare className="mx-auto text-gray-300 mb-3" size={40} />
                <h3 className="text-base font-semibold text-gray-800">No discussions found</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Be the first to start a conversation in #{activeChannel}!
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: Stats / Trending */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Contributors */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiTrendingUp size={14} className="text-indigo-500" />
                Active Contributors
              </h2>
              <div className="space-y-4">
                {TOP_CONTRIBUTORS.map((member, i) => (
                  <div key={member.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white font-bold w-4 h-4 flex items-center justify-center rounded-full text-[9px]">
                          {i + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{member.name}</h4>
                        <span className="text-[10px] text-gray-400">{member.role}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-500">{member.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Tags */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiCode size={14} className="text-indigo-500" />
                Trending Topics
              </h2>
              <div className="space-y-3">
                {TRENDING_TOPICS.map(topic => (
                  <div key={topic.tag} className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors duration-150 px-2.5 py-1 rounded-md cursor-pointer flex items-center gap-1">
                      <span className="text-gray-400">#</span>
                      {topic.tag}
                    </span>
                    <span className="text-[11px] text-gray-400">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CREATE POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl transform transition-all border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Start a Discussion</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none text-xl font-bold px-2"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Discussion Title
                </label>
                <input
                  type="text"
                  required
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="e.g. Can someone explain strict null checks in TS?"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Channel
                  </label>
                  <select
                    value={newPostChannel}
                    onChange={(e) => setNewPostChannel(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    {CHANNELS.filter(c => c !== 'All Channels').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                    placeholder="e.g. ts, systemdesign"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Content
                </label>
                <textarea
                  required
                  rows={4}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's on your mind? Share your thoughts, ask a question, or post a code snippet..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all focus:outline-none"
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHome;
