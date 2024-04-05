import React, { useState, useEffect } from 'react';
import PostService, { getPostAttachments } from "../services/PostService";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import defaultProfilePic from "../assets/img/logos/base.png";
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: '50%',
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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function PostCard({ post , onDeletePost, onEditPost, currentUser}) {
    const classes = useStyles();
  
    const [liked, setLiked] = useState(post.liked); // Initialize the liked state based on the post data
    const [likeCount, setLikeCount] = useState(post.noOfLikes); // Initialize like count
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState(''); // State to manage comment input text
    const [openDialog, setOpenDialog] = useState(false); // State to track whether dialog is open or not
    const [openDeleteBox, setOpenDeleteBox] = useState(false); // State to track whether dialog is open or not
    const [deleteStatus, setDeleteStatus] = useState(null); // null: not attempted, true: success, false: failure
    const [isEditing, setIsEditing] = useState(false);
    const [editedPostText, setEditedPostText] = useState(post.postText);
    const handleSave = () => {
      // Call the parent component function to handle saving
      onEditPost(post.postId, editedPostText); // Pass postId and editedText to parent
      // Exit edit mode
      setIsEditing(false);
    };
    const toggleEditMode = () => {
      setIsEditing(!isEditing);
    };

    const handleToggleDialog = () => {
      setOpenDialog(!openDialog); // Toggle the state to open/close dialog
      if (!openDialog) {
        fetchComments(); // Fetch comments only when the dialog box is opened
      }
    };

    const handleDeletePost = () => {
      setOpenDeleteBox(!openDeleteBox); // Toggle the state to open/close dialog
    };
    const handleEditPost = () => {
      // Call the parent component function or navigate to the edit page
      onEditPost();
    };
    const deletePost = () => {
      PostService.deletePost(post.postId)
        .then((response) => {
          if (response != null) {
            if (response.data) {
              setDeleteStatus(true);
              handleDeletePost();
              onDeletePost(post.postId); // Update postData in ParentComponent
            }else {
              setDeleteStatus(false);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setDeleteStatus(false);
        });
    }
    const fetchComments = () => {
      PostService.fetchComments(post.postId)
        .then((response) => {
          if (response != null) {
            if (response.data) {
              setComments(response.data);
              console.log("post :", post.postId);
              console.log("comments :", comments);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
    const handleLike = () => {
      // Toggle the like status locally
      setLiked(!liked);
      PostService.likePost(post.postId)
        .then((response) => {
          if (response != null) {
            if (response.data) {
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
            if (response.data) {
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
      <Card style={{ border: '1px solid #ccc' }} className={classes.card}>
        <CardContent>
  
          <Typography variant="body1" className={classes.content} style={{ marginTop: '10px' }}>
            {post.profilePic ? (
              <img
                src={`data:image/jpeg;base64,${post.profilePic}`}
                alt={`${post.userName}'s avatar`}
                className="rounded-circle"
                style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "6px" }}
              />
            ) : (
              <img
                src={defaultProfilePic}
                alt={`${post.userName}'s avatar`}
                className="rounded-circle"
                style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "6px" }}
              />
            )}
            {post.userName}
            {post.groupName !=null && (` posted in ${post.groupName}`)}
          </Typography>
          {post.files != null && (
            <img
              src={`data:image/jpeg;base64,${post.files}`}
              alt="Post attachment"
              style={{
                width: "100%", // Set width to 100% to ensure it takes the full width of the container
                maxHeight: "600px", // Set maximum height to prevent the image from exceeding a certain size
                objectFit: "cover", // Use "cover" to maintain aspect ratio and cover the entire container
                borderRadius: "5px", // Optional: Add border radius for rounded corners
                marginTop: "10px"
              }} />
          )}
            {isEditing ? (
          // If in edit mode, show text field for editing
          <TextField
            value={editedPostText} style={{ marginTop: '10px' }}
            onChange={(e) => setEditedPostText(e.target.value)}
            multiline
            fullWidth
          />
        ) : (
          // If not in edit mode, show post text
          <Typography variant="body1" className={classes.content} style={{ marginTop: '10px' }}>
            {post.postText}
          </Typography>
        )}

          <Typography variant="body2" color="textSecondary">
            Created At: {post.createdAt}
          </Typography>
          {/* Like and Comment buttons */}
          <div className={classes.actions} style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLike} size="large">
              <FavoriteIcon color={liked ? 'secondary' : 'inherit'} />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {likeCount} Likes
            </Typography>
            <IconButton onClick={handleToggleDialog} size="large">
              <ChatBubbleOutlineIcon />
            </IconButton>
            {currentUser === post.userId && (
                    <>
                        {isEditing ? (
                            <Button onClick={handleSave} variant="outlined" color="primary" style={{ color: '#009999' }}>
                                Save
                            </Button>
                        ) : (
                            <IconButton onClick={toggleEditMode} size="large">
                                <EditIcon />
                            </IconButton>
                        )}
                        <IconButton onClick={handleDeletePost} size="large">
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            <Dialog open={openDeleteBox} TransitionComponent={Transition} keepMounted onClose={handleDeletePost} fullWidth>
                    <DialogTitle style={{ color: '#009999' }}>
                    {deleteStatus === true ? 'Post deleted' : deleteStatus === false ? 'Post Not Deleted' : 'Are you sure you want to delete this Post?'}
                      </DialogTitle>
                    <DialogContent>            
                      <div>
                      <Button onClick={deletePost} style={{ backgroundColor: '#009999', marginTop: '20px' }} variant="contained">
                        Yes
                      </Button>
                      <Button onClick={handleDeletePost} style={{ backgroundColor: '#009999', marginTop: '20px', marginLeft: '20px' }} variant="contained">
                        No
                      </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
          </div>
        </CardContent>
        {/* Comment Dialog */}
        <Dialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={handleToggleDialog} fullWidth>
          <DialogTitle style={{ color: '#009999' }}>Comments</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            {/* Comments section */}
            <div className={classes.commentsSection}>
              {comments.map((comment, index) => (
                <div key={index} className={classes.commentContainer}>
                  <div className={classes.userProfile}>
                    {comment.profilePic ? (
                      <img
                        src={`data:image/jpeg;base64,${comment.profilePic}`}
                        alt={`${comment.userName}'s avatar`}
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "6px" }}
                      />
                    ) : (
                      <img
                        src={defaultProfilePic}
                        alt={`${comment.userName}'s avatar`}
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "6px" }}
                      />
                    )}
                    <span className={classes.usernameLabel}>{comment.userName}</span>
                  </div>
                  <div className={classes.commentText}>{comment.commentText}</div>
                  {index !== comments.length - 1 && <hr className={classes.separator} />}
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
            <Button onClick={handleCommentSubmit} style={{ backgroundColor: '#009999', marginTop: '20px' }} variant="contained" className={classes.submitButton}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>
  
      </Card>
    );
  }
  

export default PostCard;
