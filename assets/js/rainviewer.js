  /**
   * RainViewer radar animation part
   * @type {number[]}
   */
  let apiData = {};
  let mapFrames = [];
  let lastPastFramePosition = -1;
  let radarLayers = [];
  let optionKind = 'radar'; // can be 'radar' or 'satellite'
  let animationPosition = 0;
  let animationTimer = false;

  /**
   * Load all the available maps frames from RainViewer API
   */
  let apiRequest = new XMLHttpRequest();
  apiRequest.open("GET", URL.rv, true);
  apiRequest.onload = function (e) {
      // store the API response for re-use purposes in memory
      apiData = JSON.parse(apiRequest.response);
      initialize(apiData, optionKind);
  };
  apiRequest.send();

  /**
   * Initialize internal data from the API response and options
   */
  function initialize(api, kind) {
      // remove all already added tiled layers
      for (let i in radarLayers) {
          map.removeLayer(radarLayers[i]);
      }
      mapFrames = [];
      radarLayers = [];
      animationPosition = 0;

      if (!api) {
          return;
      }
      if (kind == 'satellite' && api.satellite && api.satellite.infrared) {
          mapFrames = api.satellite.infrared;

          lastPastFramePosition = api.satellite.infrared.length - 1;
          showFrame(lastPastFramePosition);
      } else if (api.radar && api.radar.past) {
          mapFrames = api.radar.past;
          lastPastFramePosition = api.radar.past.length - 1;
          showFrame(lastPastFramePosition);
      }
  }

  /**
   * Animation functions
   * @param path - Path to the XYZ tile
   */
  function addLayer(frame) {
      if (!radarLayers[frame.path]) {
          let colorScheme = optionKind == 'satellite' ? 0 : 7;
          let smooth = optionKind == 'satellite' ? 0 : 1;
          let snow = optionKind == 'satellite' ? 0 : 1;

          radarLayers[frame.path] = new L.TileLayer(apiData.host + frame.path + '/' + 512 + '/{z}/{x}/{y}/' + colorScheme + '/' + smooth + '_' + snow + '.png', {
              tileSize: 256,
              opacity: 0.001,
              zIndex: frame.time
          });
      }
      if (!map.hasLayer(radarLayers[frame.path])) {
          map.addLayer(radarLayers[frame.path]);
      }
  }

  /**
   * Display particular frame of animation for the @position
   * If preloadOnly parameter is set to true, the frame layer only adds for the tiles preloading purpose
   * @param position
   * @param preloadOnly
   */
  function changeRadarPosition(position, preloadOnly) {
      while (position >= mapFrames.length) {
          position -= mapFrames.length;
      }
      while (position < 0) {
          position += mapFrames.length;
      }

      let currentFrame = mapFrames[animationPosition];
      let nextFrame = mapFrames[position];

      addLayer(nextFrame);

      if (preloadOnly) {
          return;
      }

      animationPosition = position;

      if (radarLayers[currentFrame.path]) {
          radarLayers[currentFrame.path].setOpacity(0);

      }
      radarLayers[nextFrame.path].setOpacity(0.7);

      setFrameTime(nextFrame)
  }

  /**
   * Check avialability and show particular frame position from the timestamps list
   */
  function showFrame(nextPosition) {
      let preloadingDirection = nextPosition - animationPosition > 0 ? 1 : -1;

      changeRadarPosition(nextPosition);

      // preload next next frame (typically, +1 frame)
      // if don't do that, the animation will be blinking at the first loop
      changeRadarPosition(nextPosition + preloadingDirection, true);
  }

  /**
   * Stop the animation
   * Check if the animation timeout is set and clear it.
   */
  function stop() {
      if (animationTimer) {
          clearTimeout(animationTimer);
          animationTimer = false;
          return true;
      }
      return false;
  }

  function play() {
      showFrame(animationPosition + 1);

      // Main animation driver. Run this function every 200 ms
      animationTimer = setTimeout(play, 200);
  }

  function playStop() {
      if (!stop()) {
          play();
      }
  }

  /**
   * Change map options
   */
  function setKind(kind) {
      optionKind = kind;
      initialize(apiData, optionKind);
  }