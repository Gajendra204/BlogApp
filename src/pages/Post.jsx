import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12 bg-gray-100">
      <Container>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-extrabold text-center text-gray-800">
            {post.title}
          </h1>
        </div>

        <div className="w-full flex justify-center mb-8 relative border rounded-xl shadow-lg overflow-hidden">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-t-xl w-full object-cover max-h-[500px]"
          />

          {isAuthor && (
            <div className="absolute right-4 top-4 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="shadow">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost} className="shadow">
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-12 px-4 md:px-16">
          <div className="prose prose-lg max-w-full text-gray-700 leading-relaxed">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
