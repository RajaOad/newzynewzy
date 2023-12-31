import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import cookie from 'js-cookie';
// import UserNewsCard from './UserNewsCard';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import EditArticleForm from './EditArticleForm';
import Link from 'next/link';

const NewsArticles = () => {

    useEffect(() => {

        getNews()

    }, [])
    
    const [articles, setArticles] = useState([])



    const deleteNews = async (id)=> {

      // API Call
      const url = `/api/deletenews?id=${id}`;

      const authToken = localStorage.getItem("token");
      const res = await fetch(url, {
       method: "DELETE",
      
       headers: {
         "Content-Type": "application/json",
         'Authorization': `Bearer ${authToken}`,
         
       }
     })
     let response = await res.json()
    
     if(response.success) {
      toast.success(response.success, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        window.location.reload();
        
    } else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    }


    const getNews = async () => {

        try {

            const url = `/api/getusernews`;
            const authToken = localStorage.getItem("token");
            // const response = await fetch(url);
            const response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${authToken}`,
              },
            });
            const result = await response.json();
        
            setArticles(result.news)
         
            
        } catch (error) {

            console.error(error);
            
        }

       

    }

    const [showModal, setShowModal] = useState(false);

    const [showWarning, setShowWarning] = useState(false);
  
    // const handleDelete = () => {
    //   deleteNews(art);
    //   setShowWarning(false);
    // };
  
  
  const handleEditClick = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
        const formatDate = (date) => {
          return new Date(date).toLocaleDateString();
        };
  
        function limitDescription(description, maxLength) {
          if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
          }
          return description;
        }
  
        const Cap = (string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

   

  return (
    <>

    

  <section className="mb-32 text-center md:text-left">
  <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <h2 className="my-12 text-center text-3xl font-bold">Your Articles</h2>

    { articles.map((article)=> {

return  <div className="mb-6 flex flex-wrap">

<div>

</div>

    <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
      <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init data-te-ripple-color="light">
        <img src={article.image} className="w-full" alt="Louvre" />
        <Link legacyBehavior href={`/user/newspost/${encodeURIComponent(article.title)}`} passHref={true}>
        <a>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
          </div>
        </a>
        </Link>
      </div>
    </div>
    

    <div className="relative mb-6 md:flex md:flex-col md:items-start mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-7/12">
   
    <div className='m-auto absolute top-16 md:top-8 right-0 flex justify-end'>
    {showWarning && (
     <div className="custom-warning bg-white border border-gray-300 shadow-lg rounded-lg p-4 max-w-xs w-full">
     <div className="warning-text text-lg font-semibold mb-4">
       Are you sure you want to delete this news?
     </div>
     <div className="warning-buttons flex justify-end">
       <button
         onClick={() => {deleteNews(article._id)}}
         className="delete-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
       >
         Delete
       </button>
       <button
         onClick={() => setShowWarning(false)}
         className="cancel-button bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
       >
         Cancel
       </button>
     </div>
   </div>
    )}
    <RiDeleteBin6Line
      onClick={() => setShowWarning(true)}
      className="mr-2 lg:h-8 lg:w-8 h-6 w-6 cursor-pointer"
    />
    <RiEdit2Line
      onClick={handleEditClick}
      className="mr-2 lg:h-8 lg:w-8 h-6 w-6 cursor-pointer"
    />
  </div>

      <Link legacyBehavior href={`/user/newspost/${encodeURIComponent(article.title)}`} passHref={true}> 
      <h5 className="mb-3 text-lg font-bold cursor-pointer">{article.title}</h5>
      </Link>
      
      <div
        className="mb-3 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
          stroke="currentColor" className="mr-2 h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>
        {Cap(article.category)}
      </div>
      <p className="mb-6 text-neutral-500 dark:text-neutral-300">
        <small>Published <u>{formatDate(article.createdAt)}</u> by
          <a href="#!"> {article.author}</a></small>
      </p>
      <p className="text-left break-words max-w-full overflow-hidden text-neutral-500 dark:text-neutral-300">
       {limitDescription(article.desc, 200)}
      </p>
    </div>
    {showModal && (
<div className="fixed top-0 z-50 left-0 flex items-center overflow-y-auto justify-center w-full h-full bg-black bg-opacity-75">
  <div className="bg-white p-4 mt-80 mb-8 rounded w-3/5">
   <EditArticleForm article={article}  />
    <div className="flex justify-end mt-4">
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        onClick={handleCloseModal}
      >
        Close
      </button>
    </div>
  </div>
</div>
)}
  </div>

}) }

 

  </section>
 
</>


  )
}

export default NewsArticles