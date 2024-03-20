import React, { useState, useEffect } from "react";
import Common from "../../Common";
// import PostService from "../../services/PostService";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import waterlooImage from "../../assets/img/logos/waterloo.png";
import { SIDEBAR_DATA as dummyData } from "../Data";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxHeight: "100vh", // Set maximum height to viewport height
    width: "100%",
    flexDirection: "column", // Set flex direction to column
    padding: theme.spacing(2),
    overflowX: "hidden", // Add vertical scrollbar if content overflows // Add margin between cards
    overflowY: "auto", // Add vertical scrollbar if content overflows // Add margin between cards
  },
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "50%",
    marginRight: theme.spacing(2),
    overflowY: "auto", // Add vertical scrollbar if content overflows // Add margin between cards
    border: "2px solid #325d66", // Add a border with a light gray color
    borderRadius: theme.spacing(1), // Add a border radius for rounded corners
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a box shadow for depth
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
}));

function HomeComponent() {
  var status = "ERROR";
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {};

  return (
    <Common dummyData={dummyData}>
      <div>
        <ul>
          <h1></h1>
          <div id="colorPage" className={classes.root}>
            {posts.map((post) => (
              <Card
                className={`${classes.card} ${classes.additionalClass}`}
                key={post.postId}
              >
                <CardContent>
                  {post.postId === 1 && (
                    <img src={waterlooImage} alt="Waterloo" />
                  )}
                  <Typography color="textSecondary" gutterBottom>
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      User ID:
                    </span>
                    <span style={{ marginLeft: "4px" }}>{post.userId}</span>
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.postText}
                  </Typography>
                  <Typography color="textSecondary">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Created At:
                    </span>
                    <span style={{ marginLeft: "4px" }}>{post.createdAt}</span>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </ul>
      </div>
    </Common>
  );
}

export default HomeComponent;
