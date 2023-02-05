import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewCommunityThunk } from "../store/communities";

const CreateCommunityForm = () => {
  const user = useSelector((state) => state.session.user);
  const [headerErrors, setHeaderErrors] = useState([]);
  const [nameErrors, setNameErrors] = useState([]);
  const [aboutErrors, setAboutErrors] = useState([]);
  const [header, setHeader] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const createCommunity = async (e) => {
    e.preventDefault();
    console.log(name, header, about);
    const data = await dispatch(createNewCommunityThunk(name, header, about));
    if (typeof data !== "number") {
      const hErrors = [];
      const nErrors = [];
      const aErrors = [];
      data.forEach((error) => {
        let fieldsAndErrors = error.split(":");
        if (fieldsAndErrors[0] === "header ") {
          hErrors.push(fieldsAndErrors[1]);
        }
        if (fieldsAndErrors[0] === "name ") {
          nErrors.push(fieldsAndErrors[1]);
        }
        if (fieldsAndErrors[0] === "about ") {
          aErrors.push(fieldsAndErrors[1]);
        }
      });
      setHeaderErrors(hErrors);
      setNameErrors(nErrors);
      setAboutErrors(aErrors);
    } else {
      history.push(`/communities/${data}`);
    }
  };

  const updateHeader = (e) => {
    e.preventDefault();
    setHeader(e.target.value);
  };
  const updateName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const updateAbout = (e) => {
    e.preventDefault();
    setAbout(e.target.value);
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="flex-row">
      <div className="com-filler" />
      <div id="community-feed">
        <form
          className="community-feed-header"
          id="new-frm-cm"
          onSubmit={createCommunity}
        >
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
          {nameErrors.map((error, ind) => (
            <div key={`name-err-${ind}`} className="error-text">
              {error}
            </div>
          ))}

          <input
            className="community-feed-header-name new-input"
            id="new-name"
            type="text"
            name="name"
            placeholder="community_name*"
            onChange={updateName}
            value={name}
          ></input>

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
          <button type="submit" className="nav-btn-btn" id="new-community-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityForm;
