import React from "react";
import requests from "../../Auth/requests";
import Row from "../../Components/Row";
import Banner from "../../Components/Banner";
import Nav from "../../Components/Nav";
import "./HomeScreen.css";

function HomeScreen() {
  return (
    <div className="app">
      <Nav showOptions />
      <Banner />
      <div className="row-wrapper">
        <Row id={0} title="Trending Now" fetchURL={requests.fetchTrending} />
        <Row
          id={1}
          title="NETFLIX ORIGINALS"
          fetchURL={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row id={2} title="Top Rated" fetchURL={requests.fetchTopRated} />
        <Row
          id={3}
          title="Action Movies"
          fetchURL={requests.fetchActionMovies}
        />
        <Row
          id={4}
          title="Comedy Movies"
          fetchURL={requests.fetchComedyMovies}
        />
        <Row
          id={5}
          title="Horror Movies"
          fetchURL={requests.fetchHorrorMovies}
        />
        <Row
          id={6}
          title="Romance Movies"
          fetchURL={requests.fetchRomanceMovies}
        />
        <Row
          id={7}
          title="Documentaries"
          fetchURL={requests.fetchDocumentaries}
        />
      </div>
      <div className="row-wrapper-background"></div>
    </div>
  );
}

export default HomeScreen;
