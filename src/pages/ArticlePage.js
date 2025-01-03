import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { user, isLoading } = useUser();

  // gets the url parameter
  const { articleId } = useParams();

  useEffect(() => {
    // create an async function inside the useEffect hook to allow await axios and update the local state here
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      // you must add proxy property in package.json to allow requests to port 8000
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const articleInfo = response.data;
      setArticleInfo(articleInfo);
    };
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [articleId, user]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          canUpvote ? (
            <button onClick={addUpvote}>Upvote</button>
          ) : (
            <button>Already Upvoted</button>
          )
        ) : (
          <button>Log in to upvote</button>
        )}
      </div>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log in to add a comment</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
