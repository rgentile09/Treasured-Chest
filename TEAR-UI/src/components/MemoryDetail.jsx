import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, addComment, deleteComment } from "../services/commentService";

const MemoryDetail = ({ memories }) => {
  const { memoryId } = useParams();
  const memory = memories.find((m) => m.id === parseInt(memoryId));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentsData = await fetchComments(memoryId);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments.");
      }
    };

    loadComments();
  }, [memoryId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await addComment(memoryId, newComment);
      setComments([...comments, { text: newComment, user: { username: "You" }, createdAt: new Date() }]);
      setNewComment("");
      setError("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(memoryId, commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
      setError("");
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment.");
    }
  };

  if (!memory) {
    return <div>Memory not found</div>;
  }

  const imagePath = `http://localhost:8080${memory.imageUrl}`;

  return (
    <div className="wrapper">
      <div className="form-page" style={{ textAlign: 'center', padding: '20px' }}>
        <h5 className="card-title centered-title mb-5" style={{ fontSize: '5rem', marginBottom: '20px' }}>{memory.title}</h5>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src={imagePath} 
              className="card-img-top" 
              alt={memory.title} 
              style={{ width: '20vw', height: 'auto' }} 
            />
        </div>
        <p className="card-text centered-text mt-5" style={{ fontSize: '2rem', marginTop: '20px'  }}>{memory.description}</p>
        <div className="comments-section mt-4">
          <h5>Comments:</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <ul className="list-unstyled">
            {comments.map((comment) => (
              <li key={comment.id} className="mb-2">
                <strong>{comment.user.username}</strong>: {comment.text} <em>({new Date(comment.createdAt).toLocaleString()})</em>
                <button 
                  onClick={() => handleDeleteComment(comment.id)} 
                  className="btn btn-danger btn-sm ml-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              className="form-control"
              placeholder="Add a comment..."
            />
            <button type="submit" className="btn btn-primary mt-2">Add Comment</button>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default MemoryDetail;