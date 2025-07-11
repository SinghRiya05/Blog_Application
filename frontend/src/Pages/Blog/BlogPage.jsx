import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import user_icon from "../../assets/user_icon.svg";
import facebook from "../../assets/facebook_icon.svg";
import twitter from "../../assets/twitter_icon.svg";
import google from "../../assets/googleplus_icon.svg";
import Moment from "moment";
import Loader from "../../components/Loader";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function BlogPage() {
  const { id } = useParams();
  const [data, setData] = useState(null); // initially null to avoid errors
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        
        const res = await axios.get(`/blog/${id}`);
        const blogData = res.data.data;
        setData(blogData);

        
        const commentsRes = await axios.get(`comment/fetch/${blogData._id}`);
        setComments(commentsRes.data.data.comments||[]);
      } catch (error) {
        console.log("Error fetching blog/comments:", error);
      }
    };

    fetchAll();
    setIsLoggedIn(!!token); // true if token exists
  }, [id, token]);

  const addComment = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please login to comment..");
      return;
    }

    if (!content.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    if (!data || !data._id) {
      toast.error("Blog data not loaded yet.");
      return;
    }

    try {
      const res = await axios.post(
        `comment/add`,
        {
          comment: content, // or 'content' if your backend expects that
          blogId: data._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newComment = res.data?.data?.comment || res.data?.data; // depends on backend structure

 
    setComments((prevComments) => [newComment, ...prevComments]);

      setContent("");
    } catch (error) {
      console.log("Add comment failed:", error);
      toast.error("Failed to add comment");
    }
  };

  if (!data) return <Loader />;

  return (
    <div className="mt-2 relative">
      <div className="text-center mt-10 leading-[2.5rem]">
        <p className="text-[#352f44] text-lg">
          Published on {Moment(data.createdAt).format("MMMM D YYYY")}
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl mt-2.5 font-semibold max-w-2xl mx-auto">
          {data.title}
        </h2>
        <p className="text-gray-600 max-w-lg my-5 mx-auto">{data.subTitle}</p>
        <p className="inline-block py-0.8 px-4 rounded-full border border-[#352f44] bg-gray-100 font-medium mb-2">
          Author : {data.author?.username}
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <div className="flex justify-center">
          <img src={data.image} alt="blog" className="rounded-3xl mb-5 w-[30rem]" />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto mt-3"
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="text-xl font-semibold my-6">
            Comments ({comments.length})
          </p>

          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="border-2 border-black p-4 rounded-md shadow-md bg-white relative max-w-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user_icon}
                    width={30}
                    alt="user"
                    className="rounded-full"
                  />
                  <h3 className="text-lg font-medium">{item.author?.username}</h3>
                </div>
                <p className="mt-2 ml-10 text-base max-w-md text-gray-700">
                  {item.content}
                </p>
                <div className="absolute right-4 bottom-2 text-[14px] text-gray-700">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <textarea
              placeholder="Comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded outline-none h-40 font-medium text-base"
            ></textarea>
            <button
              type="submit"
              className="px-10 py-3 border-none text-white rounded-xl lg:text-base sm:text-sm cursor-pointer bg-[#352f44] hover:scale-105 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="mt-24 max-w-3xl mx-auto">
          <p className="font-semibold text-lg my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <img src={facebook} alt="facebook" />
            <img src={twitter} alt="twitter" />
            <img src={google} alt="google" />
          </div>
        </div>
      </div>
    </div>
  );
}
