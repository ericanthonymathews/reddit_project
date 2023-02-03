import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityPostsThunk } from "../store/posts";
import { getCommunityThunk, editCommunityThunk } from "../store/communities";
import PostCard from "./PostCard";
import PostButton from "./PostButton";

const CommunityFeed = () => {
  const user = useSelector((state) => state.session.user);
  const communityPosts = useSelector((state) => state.posts.communityPosts);
  const community = useSelector((state) => state.communities.singleCommunity);
  const { communityId } = useParams();
  const dispatch = useDispatch();

  const [showHeaderEdit, setShowHeaderEdit] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [headerErrors, setHeaderErrors] = useState([]);
  const [aboutErrors, setAboutErrors] = useState([]);
  const [header, setHeader] = useState([]);
  const [about, setAbout] = useState([]);

  const openHeaderEdit = (e) => {
    e.preventDefault();
    setHeader(community.header);
    setAbout(community.about);
    setShowEdit(true);
  };

  const updateHeader = (e) => {
    e.preventDefault();
    setHeader(e.target.value);
  };
  const updateAbout = (e) => {
    e.preventDefault();
    setAbout(e.target.value);
  };

  const cancel = (e) => {
    e.preventDefault();
    setHeader(community.header);
    setAbout(community.about);
    setShowEdit(false);
  };
  const save = async (e) => {
    e.preventDefault();
    if (header === community.header && about === community.about) {
      setShowEdit(false);
    }
    const data = await dispatch(
      editCommunityThunk(community.id, header, about)
    );
    if (data) {
      let hErrors = [];
      let aErrors = [];
      data.forEach((error) => {
        let fieldsAndErrors = error.split(":");
        if (fieldsAndErrors[0] === "header ") {
          hErrors.push(fieldsAndErrors[1]);
        }
        if (fieldsAndErrors[0] === "about ") {
          aErrors.push(fieldsAndErrors[1]);
        }
      });
      setHeaderErrors(hErrors);
      setAboutErrors(aErrors);
    } else {
      dispatch(getCommunityThunk(communityId));
      setShowEdit(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setHeader(community.header);
      setAbout(community.about);
      setShowEdit(false);
    }
  }, [user, community]);

  useEffect(() => {
    dispatch(getCommunityPostsThunk(communityId));
    dispatch(getCommunityThunk(communityId));
  }, [dispatch, communityId]);
  return (
    <>
      <>
        <div className="flex-row">
          <div className="com-filler" />

          <div id="community-feed">
            <>
              {Object.values(community).length > 0 && (
                <div className="community-feed-header">
                  {!showEdit && (
                    <div className="community-feed-header-header">
                      {community.header}
                      {user?.id === community?.user_id && (
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={openHeaderEdit}
                        ></i>
                      )}
                    </div>
                  )}
                  {showEdit && (
                    <>
                      {headerErrors.map((error, ind) => (
                        <div key={`header-err-${ind}`} className="error-text">
                          {error}
                        </div>
                      ))}
                      <input
                        className="community-feed-header-header new-input"
                        type="text"
                        name="header"
                        id="new-header"
                        placeholder="Community Header*"
                        onChange={updateHeader}
                        value={header}
                      ></input>
                    </>
                  )}
                  <div className="community-feed-header-name">
                    r/{community.name}
                  </div>
                  {!showEdit && (
                    <div className="community-feed-header-about">
                      {community.about}
                    </div>
                  )}
                  {showEdit && (
                    <>
                      {aboutErrors.map((error, ind) => (
                        <div key={`about-err-${ind}`} className="error-text">
                          {error}
                        </div>
                      ))}
                      <textarea
                        className="community-feed-header-about new-input"
                        rows="8"
                        cols="80"
                        name="about"
                        placeholder="Tell us about your community*"
                        value={about}
                        onChange={updateAbout}
                      ></textarea>
                    </>
                  )}
                  {!showEdit && <PostButton />}
                  {showEdit && (
                    <>
                      <button
                        onClick={cancel}
                        className="nav-btn-btn margin1em"
                      >
                        Cancel
                      </button>
                      <button onClick={save} className="nav-btn-btn margin1em">
                        Save
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
            {Object.values(communityPosts).length > 0 && (
              <>
                <div className="feed">
                  {Object.values(communityPosts).map((post) => (
                    <PostCard post={post} key={`feed-postcard-${post.id}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default CommunityFeed;
