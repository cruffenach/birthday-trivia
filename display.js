/* ============================================
   Caitlin's 40th Birthday Trivia v2
   Display Mode Logic
   Shows questions on a projector / big screen.
   Host advances with click or spacebar.
   ============================================ */

(function () {
  'use strict';

  // Build flat screen list: title → (intro + questions per section) → end
  var SCREENS = [];
  SCREENS.push({ type: 'title' });

  var qIdx = 0;
  SECTIONS.forEach(function (sec) {
    SCREENS.push({ type: 'intro', section: sec.id });
    if (sec.id === 'broadway') {
      BROADWAY.forEach(function (_, i) {
        SCREENS.push({ type: 'question', section: 'broadway', index: i, qNum: ++qIdx });
        SCREENS.push({ type: 'answer', section: 'broadway', index: i, qNum: qIdx });
      });
    } else if (sec.id === 'movies') {
      MOVIES.forEach(function (_, i) {
        SCREENS.push({ type: 'question', section: 'movies', index: i, qNum: ++qIdx });
        SCREENS.push({ type: 'answer', section: 'movies', index: i, qNum: qIdx });
      });
    } else if (sec.id === 'pir') {
      PRICE_IS_RIGHT.forEach(function (_, i) {
        SCREENS.push({ type: 'question', section: 'pir', index: i, qNum: ++qIdx });
        SCREENS.push({ type: 'answer', section: 'pir', index: i, qNum: qIdx });
      });
    }
  });

  var TOTAL_Q = qIdx;
  var currentScreen = 0;
  var audioPlayers = {};

  var $ = function (id) { return document.getElementById(id); };

  function showOnly(id) {
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
    $(id).classList.add('active');
  }

  function setSection(sectionId) {
    var sec = SECTIONS.find(function (s) { return s.id === sectionId; });
    if (sec) document.documentElement.style.setProperty('--section-color', sec.color);
  }

  function stopAudio() {
    Object.keys(audioPlayers).forEach(function (k) {
      if (!audioPlayers[k].paused) { audioPlayers[k].pause(); audioPlayers[k].currentTime = 0; }
    });
  }

  function render(idx) {
    stopAudio();
    var s = SCREENS[idx];
    if (!s) return;

    if (s.type === 'title') {
      showOnly('d-title');
    } else if (s.type === 'intro') {
      renderIntro(s);
    } else if (s.type === 'question') {
      renderQuestion(s);
    } else if (s.type === 'answer') {
      renderAnswer(s);
    }
  }

  function renderIntro(s) {
    var sec = SECTIONS.find(function (sc) { return sc.id === s.section; });
    setSection(s.section);
    $('d-intro-round').textContent = 'R O U N D  ' + sec.round + '  O F  3';
    $('d-intro-icon').textContent = sec.icon + ' ' + sec.icon + ' ' + sec.icon;
    $('d-intro-title').textContent = sec.name;
    $('d-intro-title').style.color = sec.color;
    $('d-intro-desc').textContent = sec.intro;
    $('d-intro-instructions').textContent = sec.instructions;
    showOnly('d-intro');
  }

  function renderQuestion(s) {
    var sec = SECTIONS.find(function (sc) { return sc.id === s.section; });
    setSection(s.section);
    $('d-q-header').innerHTML = '<span class="section-badge">' + sec.icon + ' ' + sec.name + '</span>  Q ' + s.qNum + ' of ' + TOTAL_Q;

    var body = $('d-q-body');
    body.innerHTML = '';

    if (s.section === 'broadway') {
      var q = BROADWAY[s.index];
      $('d-q-points').textContent = '300 pts';

      // Large audio player
      var player = document.createElement('div');
      player.className = 'audio-player';
      player.style.width = '100%';
      player.style.maxWidth = '500px';

      var playBtn = document.createElement('button');
      playBtn.className = 'audio-play-btn';
      playBtn.style.width = '72px';
      playBtn.style.height = '72px';
      playBtn.style.fontSize = '2rem';
      playBtn.innerHTML = '&#9654;';
      player.appendChild(playBtn);

      var progress = document.createElement('div');
      progress.className = 'audio-progress';
      var barBg = document.createElement('div');
      barBg.className = 'audio-bar-bg';
      var barFill = document.createElement('div');
      barFill.className = 'audio-bar-fill';
      barBg.appendChild(barFill);
      var timeLabel = document.createElement('span');
      timeLabel.className = 'audio-time';
      timeLabel.textContent = '0:00';
      progress.appendChild(barBg);
      progress.appendChild(timeLabel);
      player.appendChild(progress);

      var note = document.createElement('p');
      note.className = 'audio-note';
      note.textContent = 'click play to hear the clip';
      player.appendChild(note);

      if (!audioPlayers[q.id]) {
        audioPlayers[q.id] = new Audio(q.audio);
        audioPlayers[q.id].preload = 'auto';
      }
      var audio = audioPlayers[q.id];

      playBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (audio.paused) {
          stopAudio();
          audio.play().catch(function () { note.textContent = 'audio not found'; });
          playBtn.classList.add('playing');
          playBtn.innerHTML = '&#9646;&#9646;';
          note.textContent = 'listening...';
        } else {
          audio.pause();
          playBtn.classList.remove('playing');
          playBtn.innerHTML = '&#9654;';
          note.textContent = 'click to play again';
        }
      });
      audio.addEventListener('timeupdate', function () {
        if (audio.duration) {
          barFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
          var sec = Math.floor(audio.currentTime);
          timeLabel.textContent = '0:' + (sec < 10 ? '0' : '') + sec;
        }
      });
      audio.addEventListener('ended', function () {
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '&#9654;';
        note.textContent = 'click to play again';
      });

      body.appendChild(player);

      // Sub-questions
      var subs = document.createElement('div');
      subs.className = 'display-sub-questions';
      subs.style.marginTop = '1.5rem';
      ['1. Name of the song', '2. What musical is it from?', '3. Year of Broadway debut'].forEach(function (t) {
        var p = document.createElement('p');
        p.className = 'display-sub-q';
        p.textContent = t;
        subs.appendChild(p);
      });
      body.appendChild(subs);

    } else if (s.section === 'movies') {
      var q = MOVIES[s.index];
      $('d-q-points').textContent = '300 pts';

      // Headshots
      var grid = document.createElement('div');
      grid.className = 'headshot-grid';
      grid.style.maxWidth = '500px';
      grid.style.width = '100%';
      q.cast.forEach(function (c) {
        var card = document.createElement('div');
        card.className = 'headshot-card';
        var img = document.createElement('img');
        img.className = 'headshot-img';
        img.src = c.image;
        img.alt = '';
        img.onerror = function () {
          card.innerHTML = '<div class="headshot-placeholder">?</div>';
        };
        card.appendChild(img);
        grid.appendChild(card);
      });
      body.appendChild(grid);

      var clue = document.createElement('div');
      clue.className = 'movie-clue';
      clue.style.marginTop = '0.75rem';
      clue.innerHTML = '<span class="movie-year" style="font-size:1.4rem;">' + q.year + '</span> · <span class="movie-genre" style="font-size:1.2rem;">' + q.genre + '</span>';
      body.appendChild(clue);

      var subs = document.createElement('div');
      subs.className = 'display-sub-questions';
      subs.style.marginTop = '1rem';
      ['1. What movie is this?', '2. Domestic box office', '3. Rotten Tomatoes score'].forEach(function (t) {
        var p = document.createElement('p');
        p.className = 'display-sub-q';
        p.textContent = t;
        subs.appendChild(p);
      });
      body.appendChild(subs);

    } else if (s.section === 'pir') {
      var yr = PRICE_IS_RIGHT[s.index];
      $('d-q-points').textContent = (yr.items.length * 200) + ' pts';

      var header = document.createElement('div');
      header.className = 'pir-year-header';
      header.style.maxWidth = '400px';
      header.style.width = '100%';
      header.innerHTML = '<div class="pir-year-number" style="font-size:1.8rem;">' + yr.year + '</div><div class="pir-year-age">Caitlin was ' + yr.age + '</div>';
      body.appendChild(header);

      yr.items.forEach(function (item) {
        var el = document.createElement('div');
        el.className = 'pir-item';
        el.style.maxWidth = '400px';
        el.style.width = '100%';
        el.innerHTML = '<div class="pir-item-badge ' + item.type + '">' + item.badge + '</div>' +
          '<div class="pir-item-name" style="font-size:1.15rem;">' + item.name + '</div>' +
          '<div class="pir-item-desc">' + item.description + '</div>';
        body.appendChild(el);
      });
    }

    showOnly('d-question');
  }

  function renderAnswer(s) {
    var sec = SECTIONS.find(function (sc) { return sc.id === s.section; });
    setSection(s.section);
    $('d-a-header').innerHTML = '<span class="section-badge">' + sec.icon + ' ' + sec.name + '</span>  Q ' + s.qNum + ' — Answer';

    var body = $('d-a-body');
    body.innerHTML = '';

    if (s.section === 'broadway') {
      var q = BROADWAY[s.index];
      addAnswerLine(body, 'Song', q.song);
      addAnswerLine(body, 'Musical', q.musical);
      addAnswerLine(body, 'Broadway Debut', q.year.toString());
      if (q.fun_fact) addFunFact(body, q.fun_fact);

    } else if (s.section === 'movies') {
      var q = MOVIES[s.index];
      addAnswerLine(body, 'Movie', q.title);
      addAnswerLine(body, 'Box Office', '$' + q.box_office + ' million');
      addAnswerLine(body, 'RT Score', q.rt_score + '%');
      if (q.fun_fact) addFunFact(body, q.fun_fact);

    } else if (s.section === 'pir') {
      var yr = PRICE_IS_RIGHT[s.index];
      yr.items.forEach(function (item) {
        addAnswerLine(body, item.name, '$' + formatNum(item.price));
      });
    }

    showOnly('d-answer');
  }

  function addAnswerLine(container, label, value) {
    var row = document.createElement('div');
    row.style.textAlign = 'center';
    var lbl = document.createElement('p');
    lbl.className = 'header-caps';
    lbl.style.color = 'var(--section-color)';
    lbl.textContent = label;
    row.appendChild(lbl);
    var val = document.createElement('p');
    val.className = 'script-text';
    val.style.fontSize = 'clamp(1.4rem, 4vw, 2rem)';
    val.textContent = value;
    row.appendChild(val);
    container.appendChild(row);
  }

  function addFunFact(container, text) {
    var div = document.createElement('div');
    div.style.marginTop = '0.5rem';
    div.style.maxWidth = '500px';
    var p = document.createElement('p');
    p.className = 'eval-fun-fact';
    p.style.fontSize = 'clamp(0.9rem, 2vw, 1.05rem)';
    p.textContent = text;
    div.appendChild(p);
    container.appendChild(div);
  }

  function formatNum(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ── Navigation ─────────────────────────────

  function advance() {
    if (currentScreen < SCREENS.length - 1) {
      currentScreen++;
      render(currentScreen);
    }
  }

  function goBack() {
    if (currentScreen > 0) {
      currentScreen--;
      render(currentScreen);
    }
  }

  document.addEventListener('click', function (e) {
    // Don't advance if clicking the audio play button
    if (e.target.closest('.audio-play-btn')) return;
    advance();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault();
      advance();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goBack();
    }
  });

  // ── Init ───────────────────────────────────

  render(0);
  console.log('[DISPLAY] Loaded. ' + SCREENS.length + ' screens. Click or Space to advance, Left arrow to go back.');

})();
