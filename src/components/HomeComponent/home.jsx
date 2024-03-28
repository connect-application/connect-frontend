import React, { useState, useEffect } from 'react';
import Common from '../../Common';
import PostService from "../../services/PostService";

import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import waterlooImage from '../../assets/img/logos/waterloo.png';
import { SIDEBAR_DATA as dummyData } from '../Data';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
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
        <h2 style={{ color: '#009999' }}>Home</h2>
            <div id="colorPage" className={classes.root}>
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
    console.log('Response:', post);
  const handleLike = () => {
    // Toggle the like status locally
    setLiked(!liked);
    console.log('Liked post:', post.postId);
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
  
    const handleComment = () => {
      // Implement your comment functionality here
      console.log('Commented on post:', post.postId);
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
            <IconButton onClick={handleComment} size="large">
              <ChatBubbleOutlineIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    );
  }
  

export default HomeComponent;
