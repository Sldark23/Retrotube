document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value;
  const videos = await fetchVideos(query);
  renderVideos(videos);
  await saveSearchQuery(query);
});

async function fetchVideos(query) {
  const response = await fetch(`/api/videos?query=${query}`);
  const data = await response.json();
  return data;
}

function renderVideos(videos) {
  const app = document.getElementById('app');
  app.innerHTML = videos.map(video => `
    <div class="video" data-video-id="${video.id.videoId}">
      <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
      <h3>${video.snippet.title}</h3>
    </div>
  `).join('');

  document.querySelectorAll('.video').forEach(element => {
    element.addEventListener('click', (e) => {
      const videoId = e.currentTarget.getAttribute('data-video-id');
      playVideo(videoId);
    });
  });
}

function playVideo(videoId) {
  const player = document.getElementById('player');
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
  player.style.display = 'block';
}

async function saveSearchQuery(query) {
  await fetch('/api/saveQuery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
}

async function loadFeed() {
  const response = await fetch('/api/queries');
  const queries = await response.json();
  let allVideos = [];
  
  for (const query of queries) {
    const videos = await fetchVideos(query);
    allVideos = allVideos.concat(videos);
  }

  // Shuffle the videos
  allVideos = allVideos.sort(() => 0.5 - Math.random());
  renderVideos(allVideos);
}

loadFeed();