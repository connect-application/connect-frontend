import React, { useState, useEffect } from 'react';
import Common from '../../Common';
import PostService from "../../services/PostService";

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
      marginLeft:'20%',
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
  },
  textField: {
      width: '100%',
      marginBottom: theme.spacing(1), // Add margin between text field and submit button
  },
  commentText: {
    marginBottom: theme.spacing(1), // Add margin between comment rows
  },
  comment: {
    marginTop:theme.spacing(2),
    backgroundColor: '#e3f4f8',
    marginBottom: theme.spacing(1), // Add margin between comment rows
  },
  usernameLabel: {
    display: 'inline-block',
    backgroundColor: '#c9e7f1',
    padding: theme.spacing(0.5, 1), // Adjust padding as needed
    borderRadius: '4px',
    marginBottom: theme.spacing(1), // Add margin between comment rows
    marginRight: theme.spacing(1), // Add margin to separate from comment text
  },
  }));
  

function HomeComponent() {
    const [posts, setPosts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getPosts();
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

    return (
        <Common dummyData={dummyData}>
            <div  className={classes.root}>
                {posts.map((post, index) => (
                    <PostCard key={index} post={post} classes={classes} />
                ))}
            </div>
        </Common>
    )
}

function PostCard({ post }) {
    const classes = useStyles();
  
    const [liked, setLiked] = useState(post.liked); // Initialize the liked state based on the post data
    const [likeCount, setLikeCount] = useState(post.noOfLikes); // Initialize like count
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState(''); // State to manage comment input text
    const [openDialog, setOpenDialog] = useState(false); // State to track whether dialog is open or not

    const handleToggleDialog = () => {
      setOpenDialog(!openDialog); // Toggle the state to open/close dialog
      if (!openDialog) {
        fetchComments(); // Fetch comments only when the dialog box is opened
    }
  };

  const fetchComments = () => {
    PostService.fetchComments(post.postId)
    .then((response) => {
      if (response != null) {
          if(response.data){
              setComments(response.data);
              console.log("post :", post.postId);
              console.log("comments :", comments);
          }
      }
  })
  .catch((error) => {
      console.error("Error fetching comments:", error);
  });

  };

  const handleLike = () => {
    // Toggle the like status locally
    setLiked(!liked);
    PostService.likePost(post.postId)
    .then((response) => {
        if (response != null) {
            if(response.data){
                setLiked(!liked);
            }
        }
    })
    .catch((error) => {
        console.error("Error fetching likes:", error);
    });
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
  
  const handleCommentInputChange = (event) => {
    setCommentText(event.target.value);
};

const handleCommentSubmit = () => {
    console.log('Submitted comment:', commentText);
    PostService.addComments(post.postId, commentText)
    .then((response) => {
      if (response != null) {
          if(response.data){
            fetchComments();
            console.log("comments :", comments);
          }
      }
  })
  .catch((error) => {
      console.error("Error adding comments:", error);
  });
    setCommentText('');
    // You can also add functionality to send the comment to the server here
};

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            User ID: {post.userId}
          </Typography>
          {post.image && (
            <img src={post.image} alt="Post" className={classes.image} />
          )}
          <Typography variant="body1" className={classes.content}>
            {post.postText}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created At: {post.createdAt}
          </Typography>
          {/* Like and Comment buttons */}
          <div className={classes.actions}>
            <IconButton onClick={handleLike} size="large">
            <FavoriteIcon color={liked ? 'secondary' : 'action'} /> {/* Change color to pink if liked */}
            </IconButton>
            <Typography variant="body2" color="textSecondary">
            {likeCount} Likes
          </Typography>
            <IconButton onClick={handleToggleDialog} size="large">
              <ChatBubbleOutlineIcon />
            </IconButton>
          </div>
        </CardContent>
          {/* Comment Dialog */}
          <Dialog open={openDialog}  TransitionComponent={Transition} keepMounted onClose={handleToggleDialog} fullWidth>
      <DialogTitle style={{color:'#009999'}}>Comments</DialogTitle>
      <DialogContent className={classes.dialogContent}>
          {/* Comments section */}
          <div className={classes.commentsSection}>
              {comments.map((comment, index) => (
                  <div key={index} className={classes.commentContainer}>
                      <Typography variant="body2" className={classes.commentText}>
                          <span className={classes.usernameLabel}>{comment.userName}</span>: {comment.commentText}
                      </Typography>
                  </div>
              ))}
          </div>

          {/* Add comment input */}
          <TextField
              label="Add a comment"
              value={commentText}
              onChange={handleCommentInputChange}
              className={classes.textField}
              variant="outlined"
          />
          <Button onClick={handleCommentSubmit} color="primary" variant="contained" className={classes.submitButton}>
              Submit
          </Button>
      </DialogContent>
  </Dialog>

        </Card>
    );
  }
  

export default HomeComponent;
