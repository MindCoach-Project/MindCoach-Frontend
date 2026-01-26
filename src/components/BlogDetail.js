import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "./ui";

const BlogDetail = () => {
  const { url } = useParams();
  const decodedUrl = decodeURIComponent(url);
  const [loading, setLoading] = useState(true);

  return (
    <div className="h-screen relative">
      {loading && <Loading />}

      <iframe
        src={decodedUrl}
        className="w-full h-full"
        title="Blog Page"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default BlogDetail;
