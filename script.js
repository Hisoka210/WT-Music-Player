// Fetch songs from the API
fetch('http://localhost:3000/api/data') // Change this line
    .then(response => response.json())
    .then(data => {
        songs.push(...data); // Populate the songs array with data from the database
        loadSong(currentSongIndex); // Load the first song
        populatePlaylist(); // Populate the playlist
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to populate the playlist dynamically
function populatePlaylist() {
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("playlist-item");
        listItem.innerHTML = `
            <img src="${song.thumbnail}" alt="${song.title}" class="playlist-thumbnail">
            <span>${song.title} - ${song.artist}</span>
        `;
        listItem.onclick = () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        };
        playlist.appendChild(listItem);
    });
}
// Array of songs with title, artist, source, and thumbnail
const songs = [
    {title: "A Raat Bhrr", artist: "Unknown", src: "Songs/A raat bhrr.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Araam Aata Hai Dedaar Se Tere", artist: "Unknown", src: "Songs/araam aata hy deddar sy tere.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Atif Aslam Mashup", artist: "Atif Aslam", src: "Songs/Atif aslam mashup.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Cheque", artist: "Unknown", src: "Songs/cheque.aac", thumbnail: "Songs/Aashir.jpg"},
    {title: "Dior", artist: "Unknown", src: "Songs/dior.aac", thumbnail: "Songs/Aashir.jpg"},
    {title: "Hasi Ban Gaye", artist: "Unknown", src: "Songs/hasi bn gye.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Kaise Hua", artist: "Unknown", src: "Songs/kaise huaa.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Mera Rom Rom Khali Hai", artist: "Unknown", src: "Songs/mera rom rom khali hy.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Mere Naal Nachda Kyun Nai", artist: "Unknown", src: "Songs/mere naal nchda ku nai.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Mohabat Gumshuda Meri OST", artist: "Unknown", src: "Songs/mohabat gumshuda meri ost.mpeg", thumbnail: "Songs/Aashir.jpg"},
    {title: "Soulmate (Live Video)", artist: "Badshah X Arijit Singh", src: "Songs/yt1z.net - Badshah X Arijit Singh - Soulmate (Live Video)  Ek THA RAJA.mp3", thumbnail: "Songs/Aashir.jpg"},
];

let currentSongIndex = 0;

// Get DOM elements
const song = document.getElementById("song");
const progress = document.getElementById("progress");
const ctrlIcon = document.getElementById("ctrlIcon");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songImg = document.getElementById("song-img");
const songSource = document.getElementById("song-source");
const playlist = document.getElementById("playlist").querySelector("ul");

// Load the current song
function loadSong(index) {
    const currentSong = songs[index];
    songSource.src = currentSong.src;
    songTitle.textContent = currentSong.title;
    songArtist.textContent = currentSong.artist;
    songImg.src = currentSong.thumbnail;
    song.load();
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

// Play/Pause functionality
function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

// Next song functionality
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

// Previous song functionality
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Sync progress bar when the audio loads
song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

// Update progress bar as the song plays
song.ontimeupdate = function() {
    progress.value = song.currentTime;
};

// Seek to different position in the song when progress bar is changed
progress.oninput = function() {
    song.currentTime = progress.value;
};

// Auto-update progress bar every 500ms while the song is playing
setInterval(() => {
    if (!song.paused) {
        progress.value = song.currentTime;
    }
}, 500);

// Load the initial song
loadSong(currentSongIndex);

// Dynamically add songs to playlist
songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("playlist-item");
    listItem.innerHTML = `
        <img src="${song.thumbnail}" alt="${song.title}" class="playlist-thumbnail">
        <span>${song.title} - ${song.artist}</span>
    `;
    listItem.onclick = () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
    };
    playlist.appendChild(listItem);
});

// Toggle playlist visibility
function togglePlaylist() {
    const playlistContainer = document.getElementById("playlist");
    playlistContainer.classList.toggle("show");
}