import React, { useState, useEffect } from 'react';
import Common from '../../Common';
import PostService, { getPostAttachments } from "../../services/PostService";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import waterlooImage from '../../assets/img/logos/waterloo.png';
import { SIDEBAR_DATA as dummyData } from '../Data';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { blue } from '@mui/material/colors';
import defaultProfilePic from "../../assets/img/logos/base.png";
import PostCard from '../PostCard';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '40%',
    marginLeft: '20%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  icon: {
    marginLeft: 'auto',
  },
  commentsSection: {
    marginBottom: theme.spacing(1), // Add margin between comments and text field
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2), // Add margin between text field and submit button
  },
  commentText: {
    marginBottom: theme.spacing(1), // Add margin between comment rows
    marginLeft: "62px !important" /* Width of profile pic + margin */
  },
  separator: {
    marginTop: "10px", /* Adjust margin as needed */
    backgroundImage: "linear-gradient(to right, rgba(0, 153, 153, 0.2), transparent)",/* Faded gradient */
  },
  comment: {
    marginTop: theme.spacing(2),
    backgroundColor: '#e3f4f8',
    marginBottom: theme.spacing(1), // Add margin between comment rows
  },
  usernameLabel: {
    display: 'inline-block',
    marginBottom: theme.spacing(1), // Add margin between comment rows
  },
}));


function HomeComponent() {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(1);

  useEffect(() => {
    getPosts();
    getCurrentUser();
  }, []);

  const getPosts = () => {
    PostService.getAllPosts()
      .then((response) => {
        if (response != null) {
          setPosts(response.data['SUCCESS']);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };
  const getCurrentUser = () => {
    PostService.getCurrentUser()
      .then((response) => {
        if (response != null) {
          setCurrentUser(response.data.id);
          console.log("current user: " + response.data.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };
  const handleDeletePost = (deletedPostId) => {
    setPosts(prevPostData => prevPostData.filter(item => item.postId !== deletedPostId));
  };
  const handleEditPost = (postId, editedText) => {
    // Make an API call to update the post text
    PostService.updatePost(postId, editedText)
      .then((response) => {
        if (response != null && response.data) {
          // If the post was successfully updated, you might want to update the UI or take other actions
          const updatedPosts = posts.map((post) =>
          post.postId === postId ? { ...post, postText: editedText } : post
        );
        setPosts(updatedPosts); 
        } else {
          console.error("Failed to update post.");
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <Common dummyData={dummyData}>
      <h2 style={{ color: '#009999', textAlign: 'left', marginLeft: '20%' }}>Timeline</h2>
      <div className={classes.root}>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} onDeletePost={handleDeletePost} onEditPost={handleEditPost} currentUser={currentUser} classes={classes} />
        ))}
      </div>
    </Common>
  )
}


export default HomeComponent;
