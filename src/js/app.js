/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       JEEVAN VICTOR VARGHESE
 *      Student ID: 142216225
 *      Date:       22/03/2024
 */

// All of our data is available on the global window object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
//console.log({ artists, songs }, "Appdata");

document.addEventListener("DOMContentLoaded", () => {
  function createButton() {
    const menu = document.getElementById("menu");
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", function () {
        displaySongs(artist);
      });
      menu.appendChild(button);
    });
  }

  function displaySongs(artist) {
    const url = artist.urls
      .map(function (link) {
        return `<a href="${link.url}" target="_blank">${link.name}</a>`;
      })
      .join(", ");

    const artistSelect = document.getElementById("selected-artist");
    artistSelect.innerHTML = `${artist.name} (${url})`;

    const cardContainer = document.querySelector(".container");
    cardContainer.innerHTML = "";

    const artistSongs = songs.filter(function (song) {
      return song.artistId === artist.artistId && song.explicit;
    });

    artistSongs.forEach(function (song) {
      const card = createSongCard(song);
      cardContainer.appendChild(card);
    });
  }
  /*Creating song card*/
  function createSongCard(song) {
    // Create div for card
    const card = document.createElement("div");
    //add it to card
    card.classList.add("card");

    //create an element for image
    const songImage = document.createElement("img");
    songImage.src = song.imageUrl;
    songImage.classList.add("card-image");

    // Add event listener to open or follow link to the new tab
    songImage.addEventListener("click", function () {
      window.open(song.url, "_blank");
    });

    // Creating song title
    const songTitle = document.createElement("h3");
    songTitle.textContent = song.title;
    songTitle.classList.add("card-title");

    //time element
    const yearRecorded = document.createElement("time");
    yearRecorded.textContent = song.year;
    yearRecorded.classList.add("card-time");

    // Created <span> element for the duration
    const duration = document.createElement("span");
    duration.textContent = formatDuration(song.duration);
    duration.classList.add("duration");

    // Append the elements to the card
    card.appendChild(songImage);
    card.appendChild(songTitle);
    card.appendChild(yearRecorded);
    card.appendChild(duration);

    // Return the card's <div> element
    return card;
  }

  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Call the function to create buttons for each artist
  createButton();
  // Show songs for the default artist (the first one in the list)
  displaySongs(artists[0]);
});
