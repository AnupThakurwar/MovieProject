import React, { useState, useEffect } from "react";
import axios from "axios";
//common component
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import { FaPenSquare, FaPlus, FaTrash, FaTrashRestore } from "react-icons/fa";
import Modal from "../../CommonComponent/Modal/modal";
import { img500 } from "../../Utils/Carousal/constants";
import Dropdown from "../../CommonComponent/Dropdown/dropdown";
import "./moviePlaylist.scss";

function MoviePlaylist() {
  const [movieList, setMovieList] = useState([]);
  const [playListArray, setPlayListArray] = useState([]);
  const [updateField, setUpdateField] = useState({
    id: null,
    name: "",
    selectedMovie: [],
    description: "",
  });
  const [playlist, setPlaylist] = useState({
    name: "",
    selectedMovie: [],
    show: false,
    isEdit: false,
    description: "",
  });

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&page=1`;
    axios
      .get(url)
      .then((response) => {
        // console.log("🚀 response:", response);
        setMovieList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closePlaylist = () => {
    setPlaylist({
      ...playlist,
      show: false,
    });
  };

  const inputHandler = (e) => {
    const { value, name } = e.target;

    setPlaylist({
      ...playlist,
      [name]: value,
    });
  };
  //dropdown onchange
  const onMovieSelect = (e) => {
    const { checked, name } = e.target;
    const selectList = movieList.map((movie) => {
      return movie.title === name ? { ...movie, checked: checked } : movie;
    });
    setMovieList(selectList);
  };

  //dropdown clear selection
  const clearSelection = () => {
    const clearList = movieList.map((movies) => {
      return { ...movies, checked: false };
    });
    setMovieList(clearList);
  };

  //delete playlist (playlist)
  const deletePlayListHandler = (fetchId) => {
    const deletePlayList = playListArray.filter((list) => list.id !== fetchId);
    setPlayListArray(deletePlayList);
  };

  //delete content (movie)
  const deleteListHandler = (fetchId) => {
    const deleteContent = playListArray.map((movie) => {
      return movie.id === fetchId ? { ...movie, selectedMovie: [] } : movie;
    });
    setPlayListArray(deleteContent);
  };

  // create new playlist
  const createNewPlaylist = () => {
    setPlaylist({
      ...playlist,
      show: true,
      name: "",
      isEdit: false,
      description: "",
      selectedMovie: [],
    });
    clearSelection();
  };

  //update playlist
  const updateplaylistHandler = (fetchId) => {
    // console.log(playListArray, "playlistarray");
    let selected = playListArray.map((movie) => {
      if (movie.id === fetchId) {
        setPlaylist({
          ...playlist,
          show: true,
          selectedMovie: movie.selectedMovie,
          name: movie.name,
          isEdit: true,
          description: playlist.description,
        });

        return movie.selectedMovie.map((select) => select.id);
      }
      return movie.selectedMovie;
    });

    let selectList = movieList.map((movie, index) => {
      let selectId = selected.map((ele) => ele.includes(movie.id));
      return selectId.includes(true)
        ? { ...movie, checked: true }
        : { ...movie, checked: false };
    });
    setUpdateField({
      ...updateField,
      name: playlist.name,
      id: fetchId,
      selectedMovie: movieList,
      description: playlist.description,
    });

    setMovieList(selectList);
  };

  // save changes for update or create playlist
  const createUpdatePlaylist = (isEdit, id) => {
    const { name, description } = playlist;
    let unique = [];
    let keyGen = 0;
    if (!unique.includes(keyGen)) {
      keyGen = Math.round(Math.random(10) * 100);
      unique.push(keyGen);
    }

    let selectedMovie = movieList
      .filter((movie) => movie.checked === true)
      .map((item) => item);

    setPlaylist({
      ...playlist,
      selectedMovie,
      show: false,
    });
    if (isEdit) {
      const updatedPlaylist = playListArray.map((movie) => {
        if (movie.id === updateField.id) {
          return {
            ...movie,
            id: updateField.id,
            name: updateField.name,
            selectedMovie: selectedMovie,
            description: updateField.description,
          };
        }
        return movie;
      });
      setPlayListArray(updatedPlaylist);
    } else {
      setPlayListArray((prev) => [
        ...prev,
        { id: keyGen, name, description, selectedMovie },
      ]);
    }
  };

  const actionDisabler = () => {
    if (playlist.isEdit) {
      return playlist.name.trim().length > 0 &&
        movieList.filter((list) => list.checked).length > 0
        ? false
        : true;
    } else {
      return playlist.name.trim().length > 0 &&
        playlist.description.trim().length > 0 &&
        movieList.filter((list) => list.checked).length > 0
        ? false
        : true;
    }
  };

  const createPlayList = () => {
    return (
      <div className="create-playlist-main">
        <div className="playlist-field-container">
          <div className="playlist-title-conatiner">
            <label htmlFor="playlist-title" className="playlist-title">
              Name :
            </label>
            <input
              className="playlist-title-input"
              name="name"
              onChange={inputHandler}
              value={playlist.name}
              placeholder="enter the playlist title"
            />
          </div>

          <div className="description-container">
            <label htmlFor="playlist-title" className="playlist-title">
              description :
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="2"
              onChange={inputHandler}
              placeholder="Enter the playlist description"
              value={playlist.description}
            >
              {playlist.description}
            </textarea>
          </div>

          <div className="movie-search-container">
            <label htmlFor="playlist-title" className="selectMovie-title">
              Search Movies :
            </label>
            <Dropdown
              options={movieList}
              open={true}
              onMovieChange={onMovieSelect}
              clearSelection={clearSelection}
              isEdit={playlist.isEdit}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="playlist-main-container">
      <MovieHeader />
      <div className="create-playlist-container">
        <button
          className="create-playlist-btn"
          id="#exampleModal"
          data-toggle="modal"
          onClick={createNewPlaylist}
        >
          NEW PLAYLIST
          <span className="ms-1">
            <FaPlus />
          </span>
        </button>
      </div>

      <div className="playlist-container">
        <div className="playlist-wrapper">
          {playListArray.map((playlist) => {
            return (
              <div className="playlist-card" key={playlist.id}>
                <div className="pl-card-header">
                  <label className="playlist-name">{playlist.name}</label>
                  {
                    <div className="edit-delete-container">
                      <div
                        className="edit-btn-container"
                        onClick={() => updateplaylistHandler(playlist.id)}
                      >
                        <FaPenSquare />
                      </div>
                      <div
                        className="delete-btn-container"
                        onClick={() => deleteListHandler(playlist.id)}
                      >
                        <FaTrash />
                      </div>
                      <div
                        className="playlistdelete-btn-container"
                        onClick={() => deletePlayListHandler(playlist.id)}
                      >
                        <FaTrashRestore />
                      </div>
                    </div>
                  }
                </div>
                {playListArray.length > 0 ? (
                  playListArray?.map((movie) => {
                    return movie.selectedMovie.map((selected) => {
                      if (movie.id === playlist.id)
                        return (
                          <div className="pl-cardlist" key={movie.id}>
                            <div className="pl-image-container">
                              <img
                                src={img500 + selected.poster_path}
                                alt="movie_Image"
                                className="pl-card-image"
                              />
                            </div>
                            <div className="pl-description">
                              <div className="brief-container">
                                <div className="movie-release">
                                  {selected.release_date}
                                </div>
                              </div>
                              <div className="overview-container">
                                <div className="movie-title">
                                  {selected.title}
                                </div>
                                <div className="movie-overview">
                                  {selected.overview}
                                </div>
                              </div>
                              <div className="action-btn"></div>
                            </div>
                          </div>
                        );
                    });
                  })
                ) : (
                  <div className="no-list-added">No List added</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="playlist-side-containers">
          <label className="created-playlist m-2">Created Playlist</label>
          <div className="playlist-summary-container m-2">
            {playListArray.map((movie) => {
              return (
                <div className="card" key={movie.id}>
                  <div className="card-header">{movie.name}</div>
                  <div className="card-body">
                    <div className="card-image">
                      {movie.selectedMovie.slice(0, 4).map((image) => {
                        return (
                          <img
                            src={img500 + image.poster_path}
                            alt="cardImage"
                            className="movie-image"
                            key={image}
                          />
                        );
                      })}
                    </div>
                    <div className="card-description">{movie.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        show={playlist.show}
        close={closePlaylist}
        renderBody={createPlayList}
        title="New Playlist"
        leftbuttonTitle="Cancel"
        rightbuttonTitle={playlist.isEdit ? "Update" : "Create"}
        actionButton={() =>
          createUpdatePlaylist(playlist.isEdit, updateField.id)
        }
        isEdit={playlist.isEdit}
        disableAction={actionDisabler()}
      />
      <MovieFooter />
    </div>
  );
}

export default MoviePlaylist;
