import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Blogs...
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 ">
      <Container>
        
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold  mb-4 flex justify-center">
            Publish your passions, your way.
          </h1>
          <p className="text-2xl font-bold flex justify-center">
            Create a unique and beautiful blog easily.
          </p>
        </div>

      
        <div className="flex flex-col items-start mb-8">
          <h2 className="text-3xl font-extrabold ">
            Latest Blog Posts
          </h2>
        </div>

        <div className="flex flex-wrap -mx-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-4 w-full md:w-1/2 lg:w-1/3">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
