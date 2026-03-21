/* ============================================
   Caitlin's 40th Birthday Trivia v2
   Player Mode Logic
   ============================================ */

(function () {
  'use strict';

  // ── Constants ────────────────────────────────

  var EMOJIS = [
    '🌸', '🌺', '🎭', '🎬', '🌟', '💫', '🦋', '🎪',
    '🎂', '🎁', '🍰', '🌻', '🌷', '💐', '🎀', '🎵',
    '✨', '🌙', '🦩', '🍷', '🎤', '🎹', '🌈', '🫧'
  ];

  // Build screen flow: welcome, then for each section: intro + questions, then submit
  var SCREEN_FLOW = [];
  SCREEN_FLOW.push({ type: 'welcome' });

  var questionIndex = 0;
  SECTIONS.forEach(function (sec) {
    SCREEN_FLOW.push({ type: 'intro', section: sec.id });
    if (sec.id === 'broadway') {
      BROADWAY.forEach(function (_, i) {
        SCREEN_FLOW.push({ type: 'question', section: 'broadway', index: i, globalIndex: questionIndex++ });
      });
    } else if (sec.id === 'movies') {
      MOVIES.forEach(function (_, i) {
        SCREEN_FLOW.push({ type: 'question', section: 'movies', index: i, globalIndex: questionIndex++ });
      });
    } else if (sec.id === 'pir') {
      PRICE_IS_RIGHT.forEach(function (_, i) {
        SCREEN_FLOW.push({ type: 'question', section: 'pir', index: i, globalIndex: questionIndex++ });
      });
    }
  });
  SCREEN_FLOW.push({ type: 'submit' });

  var TOTAL_QUESTIONS = questionIndex;

  // ── State ──────────────────────────────────

  var state = {
    name: '',
    emoji: '',
    currentScreen: 0,
    answers: {
      broadway: [],
      movies: [],
      pir: []
    },
    audioPlayers: {} // cache audio elements
  };

  // Initialize answer arrays
  BROADWAY.forEach(function () {
    state.answers.broadway.push({ song: '', musical: '', year: '' });
  });
  MOVIES.forEach(function () {
    state.answers.movies.push({ title: '', box_office: '', rt_score: '' });
  });
  PRICE_IS_RIGHT.forEach(function (yr) {
    var items = [];
    yr.items.forEach(function () { items.push(''); });
    state.answers.pir.push(items);
  });

  // ── DOM Refs ───────────────────────────────

  var $ = function (id) { return document.getElementById(id); };

  var screens = {
    welcome: $('welcome'),
    'section-intro': $('section-intro'),
    question: $('question'),
    submit: $('submit')
  };

  // ── Screen Management ──────────────────────

  function showScreen(name) {
    Object.values(screens).forEach(function (s) { s.classList.remove('active'); });
    screens[name].classList.add('active');
  }

  function setSection(sectionId) {
    var sec = SECTIONS.find(function (s) { return s.id === sectionId; });
    if (sec) {
      document.documentElement.style.setProperty('--section-color', sec.color);
    }
  }

  // ── Welcome Screen ─────────────────────────

  function initWelcome() {
    var grid = $('emoji-grid');
    grid.innerHTML = '';
    EMOJIS.forEach(function (em) {
      var btn = document.createElement('button');
      btn.className = 'emoji-btn';
      btn.textContent = em;
      btn.type = 'button';
      btn.addEventListener('click', function () {
        state.emoji = em;
        grid.querySelectorAll('.emoji-btn').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        updateStartButton();
      });
      grid.appendChild(btn);
    });

    $('player-name').addEventListener('input', function () {
      state.name = this.value.trim();
      updateStartButton();
    });

    $('btn-start').addEventListener('click', function () {
      if (state.name && state.emoji) {
        navigateTo(1); // first section intro
      }
    });
  }

  function updateStartButton() {
    var btn = $('btn-start');
    btn.disabled = !(state.name && state.emoji);
    if (state.name.toUpperCase() === 'FJ') {
      btn.textContent = 'Fuck You FJ \uD83D\uDD95';
      btn.style.background = 'var(--incorrect)';
      btn.style.borderColor = 'var(--incorrect)';
      btn.style.transform = 'scale(1.08)';
      btn.style.transition = 'all 0.3s ease';
      setTimeout(function () { btn.style.transform = 'scale(1)'; }, 300);
    } else {
      btn.textContent = "Let's Go!";
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.transform = '';
    }
  }

  // ── Navigation ─────────────────────────────

  function navigateTo(screenIdx) {
    if (screenIdx < 0 || screenIdx >= SCREEN_FLOW.length) return;

    // Stop any playing audio
    stopAllAudio();

    state.currentScreen = screenIdx;
    saveState();
    var screen = SCREEN_FLOW[screenIdx];

    if (screen.type === 'welcome') {
      showScreen('welcome');
    } else if (screen.type === 'intro') {
      renderSectionIntro(screen.section);
      showScreen('section-intro');
    } else if (screen.type === 'question') {
      setSection(screen.section);
      renderQuestion(screen);
      showScreen('question');
    } else if (screen.type === 'submit') {
      renderSubmit();
      showScreen('submit');
    }
  }

  function goNext() {
    var current = SCREEN_FLOW[state.currentScreen];
    var nextIdx = state.currentScreen + 1;

    // Save current inputs before navigating
    if (current.type === 'question') {
      saveCurrentInputs(current);
    }

    if (nextIdx < SCREEN_FLOW.length) {
      navigateTo(nextIdx);
    }
  }

  function goPrev() {
    var current = SCREEN_FLOW[state.currentScreen];

    // Save current inputs before navigating
    if (current.type === 'question') {
      saveCurrentInputs(current);
    }

    // Skip back over intros to the previous question
    var prevIdx = state.currentScreen - 1;
    if (prevIdx >= 0 && SCREEN_FLOW[prevIdx].type === 'intro') {
      prevIdx--;
    }
    if (prevIdx >= 1) { // don't go back to welcome
      navigateTo(prevIdx);
    }
  }

  function goToQuestionByGlobalIndex(gi) {
    for (var i = 0; i < SCREEN_FLOW.length; i++) {
      if (SCREEN_FLOW[i].globalIndex === gi) {
        var current = SCREEN_FLOW[state.currentScreen];
        if (current.type === 'question') {
          saveCurrentInputs(current);
        }
        navigateTo(i);
        return;
      }
    }
  }

  // ── Section Intro ──────────────────────────

  function renderSectionIntro(sectionId) {
    var sec = SECTIONS.find(function (s) { return s.id === sectionId; });
    if (!sec) return;

    setSection(sectionId);
    $('intro-round').textContent = 'R O U N D  ' + sec.round + '  O F  3';
    $('intro-icon').textContent = sec.icon + ' ' + sec.icon + ' ' + sec.icon;
    $('intro-title').textContent = sec.name;
    $('intro-title').style.color = sec.color;
    $('intro-desc').textContent = sec.intro;
    $('intro-instructions').textContent = sec.instructions;

    var btn = $('btn-begin-section');
    btn.style.borderColor = sec.color;
    btn.style.background = sec.color;

    btn.onclick = function () {
      goNext();
    };
  }

  // ── Question Rendering ─────────────────────

  function renderQuestion(screen) {
    var sec = SECTIONS.find(function (s) { return s.id === screen.section; });
    var qNum = screen.globalIndex + 1;

    // Header
    $('q-header-left').innerHTML = '<span class="section-badge">' + (sec ? sec.icon + ' ' + sec.name : '') + '</span>  Q ' + qNum + ' of ' + TOTAL_QUESTIONS;

    // Body
    var body = $('question-body');
    body.innerHTML = '';
    body.scrollTop = 0;

    if (screen.section === 'broadway') {
      renderBroadwayQuestion(body, screen.index);
      $('q-header-right').textContent = '';
    } else if (screen.section === 'movies') {
      renderMovieQuestion(body, screen.index);
      $('q-header-right').textContent = '';
    } else if (screen.section === 'pir') {
      renderPIRQuestion(body, screen.index);
      var itemCount = PRICE_IS_RIGHT[screen.index].items.length;
      $('q-header-right').textContent = '';
    }

    // Nav buttons
    updateNavButtons();
    renderTimeline();
  }

  // ── Broadway Question ──────────────────────

  function renderBroadwayQuestion(container, index) {
    var q = BROADWAY[index];
    var ans = state.answers.broadway[index];

    // Audio player
    var player = document.createElement('div');
    player.className = 'audio-player';

    var playBtn = document.createElement('button');
    playBtn.className = 'audio-play-btn';
    playBtn.type = 'button';
    playBtn.innerHTML = '&#9654;'; // ▶
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
    note.textContent = 'tap to play the clip';
    player.appendChild(note);

    // Wire up audio
    var audio = getOrCreateAudio(q.audio, q.id);
    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        stopAllAudio();
        audio.play().catch(function () {
          note.textContent = 'audio file not found';
        });
        playBtn.classList.add('playing');
        playBtn.innerHTML = '&#9646;&#9646;'; // ⏸
        note.textContent = 'listening...';
      } else {
        audio.pause();
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '&#9654;';
        note.textContent = 'tap to play again';
      }
    });

    audio.addEventListener('timeupdate', function () {
      if (audio.duration) {
        var pct = (audio.currentTime / audio.duration * 100);
        barFill.style.width = pct + '%';
        var sec = Math.floor(audio.currentTime);
        timeLabel.textContent = '0:' + (sec < 10 ? '0' : '') + sec;
      }
    });

    audio.addEventListener('ended', function () {
      playBtn.classList.remove('playing');
      playBtn.innerHTML = '&#9654;';
      note.textContent = 'tap to play again';
    });

    container.appendChild(player);

    // Input fields
    addTextInput(container, 'Name of the song:', 'Enter song title...', ans.song, 'broadway', index, 'song');
    addTextInput(container, 'What musical is it from?', 'Enter musical name...', ans.musical, 'broadway', index, 'musical');
    addNumericInput(container, 'Year of Broadway debut:', 'e.g. 1960', ans.year, 'broadway', index, 'year', '', '');
  }

  // ── Movie Question ─────────────────────────

  function renderMovieQuestion(container, index) {
    var q = MOVIES[index];
    var ans = state.answers.movies[index];

    // Headshot grid
    var grid = document.createElement('div');
    grid.className = 'headshot-grid';
    q.cast.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'headshot-card';
      var img = document.createElement('img');
      img.className = 'headshot-img';
      img.alt = '';
      img.src = c.image;
      img.onerror = function () {
        // Show placeholder on missing image
        card.innerHTML = '';
        var ph = document.createElement('div');
        ph.className = 'headshot-placeholder';
        ph.textContent = '?';
        card.appendChild(ph);
      };
      card.appendChild(img);
      grid.appendChild(card);
    });
    container.appendChild(grid);

    // Year + Genre clue
    var clue = document.createElement('div');
    clue.className = 'movie-clue';
    clue.innerHTML = '<span class="movie-year">' + q.year + '</span> · <span class="movie-genre">' + q.genre + '</span>';
    container.appendChild(clue);

    var div = document.createElement('div');
    div.className = 'divider';
    div.style.margin = '0.4rem auto';
    container.appendChild(div);

    // Input fields
    addTextInput(container, 'What movie is this?', 'Enter movie title...', ans.title, 'movies', index, 'title');
    addMillionsInput(container, 'Domestic box office (in millions):', ans.box_office, 'movies', index, 'box_office');
    addPercentInput(container, 'Rotten Tomatoes score:', ans.rt_score, 'movies', index, 'rt_score');
  }

  // ── PIR Question ───────────────────────────

  function renderPIRQuestion(container, index) {
    var yr = PRICE_IS_RIGHT[index];
    var ans = state.answers.pir[index];

    // Year header
    var header = document.createElement('div');
    header.className = 'pir-year-header';
    header.innerHTML = '<div class="pir-year-number">' + yr.year + '</div>' +
      '<div class="pir-year-age">Caitlin was ' + yr.age + '</div>';
    container.appendChild(header);

    // Items
    yr.items.forEach(function (item, itemIdx) {
      var itemEl = document.createElement('div');
      itemEl.className = 'pir-item';

      var badge = document.createElement('div');
      badge.className = 'pir-item-badge ' + item.type;
      badge.textContent = item.badge;
      itemEl.appendChild(badge);

      var name = document.createElement('div');
      name.className = 'pir-item-name';
      name.textContent = item.name;
      itemEl.appendChild(name);

      var desc = document.createElement('div');
      desc.className = 'pir-item-desc';
      desc.textContent = item.description;
      itemEl.appendChild(desc);

      // Showcase image
      if (item.image) {
        var showcase = document.createElement('div');
        showcase.className = 'pir-showcase';
        var sImg = document.createElement('img');
        sImg.className = 'pir-showcase-img';
        sImg.src = item.image;
        sImg.alt = item.name;
        showcase.appendChild(sImg);
        itemEl.appendChild(showcase);
      }

      // Podium
      var podium = document.createElement('div');
      podium.className = 'podium-display';

      var screen = document.createElement('div');
      screen.className = 'podium-screen';

      var prefix = document.createElement('span');
      prefix.className = 'podium-prefix';
      prefix.textContent = '$';
      screen.appendChild(prefix);

      var valueDisplay = document.createElement('span');
      valueDisplay.className = 'podium-value' + (ans[itemIdx] ? '' : ' empty');
      valueDisplay.textContent = ans[itemIdx] ? formatPrice(ans[itemIdx]) : '0';
      if (ans[itemIdx]) screen.classList.add('has-value');
      screen.appendChild(valueDisplay);

      var input = document.createElement('input');
      input.type = 'text';
      input.inputMode = 'decimal';
      input.className = 'podium-input';
      input.value = ans[itemIdx] || '';

      input.addEventListener('input', function () {
        var cleaned = input.value.replace(/[^0-9.]/g, '');
        // Only allow one decimal point
        var parts = cleaned.split('.');
        if (parts.length > 2) cleaned = parts[0] + '.' + parts.slice(1).join('');
        input.value = cleaned;
        state.answers.pir[index][itemIdx] = cleaned;
        if (cleaned) {
          valueDisplay.textContent = formatPrice(cleaned);
          valueDisplay.classList.remove('empty');
          screen.classList.add('has-value');
        } else {
          valueDisplay.textContent = '0';
          valueDisplay.classList.add('empty');
          screen.classList.remove('has-value');

        }
        updateTimeline();
      });

      input.addEventListener('focus', function () { podium.classList.add('focused'); });
      input.addEventListener('blur', function () { podium.classList.remove('focused'); });

      podium.appendChild(screen);
      podium.appendChild(input);
      itemEl.appendChild(podium);

      container.appendChild(itemEl);
    });
  }

  // ── Input Helpers ──────────────────────────

  function addTextInput(container, labelText, placeholder, value, section, qIndex, field) {
    var label = document.createElement('label');
    label.className = 'question-label';
    label.textContent = labelText;
    container.appendChild(label);

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-input';
    input.placeholder = placeholder;
    input.value = value || '';
    input.autocomplete = 'off';
    input.addEventListener('input', function () {
      state.answers[section][qIndex][field] = input.value;
      updateTimeline();
    });
    container.appendChild(input);
  }

  function addNumericInput(container, labelText, placeholder, value, section, qIndex, field) {
    var label = document.createElement('label');
    label.className = 'question-label';
    label.textContent = labelText;
    container.appendChild(label);

    var input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.pattern = '[0-9]*';
    input.className = 'text-input';
    input.placeholder = placeholder;
    input.value = value || '';
    input.autocomplete = 'off';
    input.addEventListener('input', function () {
      var digits = input.value.replace(/[^0-9]/g, '');
      input.value = digits;
      state.answers[section][qIndex][field] = digits;
      updateTimeline();
    });
    container.appendChild(input);
  }

  function addCurrencyInput(container, labelText, value, section, qIndex, field) {
    var label = document.createElement('label');
    label.className = 'question-label';
    label.textContent = labelText;
    container.appendChild(label);

    var wrapper = document.createElement('div');
    wrapper.className = 'numeric-field';

    var pre = document.createElement('span');
    pre.className = 'numeric-prefix';
    pre.textContent = '$';
    wrapper.appendChild(pre);

    var input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.className = 'text-input';
    input.placeholder = '0';
    input.value = value ? formatWithCommas(value) : '';
    input.autocomplete = 'off';
    input.addEventListener('input', function () {
      var digits = input.value.replace(/[^0-9]/g, '');
      state.answers[section][qIndex][field] = digits;
      input.value = digits ? formatWithCommas(digits) : '';
      updateTimeline();
    });
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  }

  function addMillionsInput(container, labelText, value, section, qIndex, field) {
    var label = document.createElement('label');
    label.className = 'question-label';
    label.textContent = labelText;
    container.appendChild(label);

    var wrapper = document.createElement('div');
    wrapper.className = 'numeric-field';

    var pre = document.createElement('span');
    pre.className = 'numeric-prefix';
    pre.textContent = '$';
    wrapper.appendChild(pre);

    var input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.className = 'text-input';
    input.placeholder = '0';
    input.value = value || '';
    input.autocomplete = 'off';
    input.addEventListener('input', function () {
      var digits = input.value.replace(/[^0-9]/g, '');
      input.value = digits;
      state.answers[section][qIndex][field] = digits;
      updateTimeline();
    });
    wrapper.appendChild(input);

    var suf = document.createElement('span');
    suf.className = 'numeric-suffix';
    suf.textContent = 'M';
    wrapper.appendChild(suf);

    container.appendChild(wrapper);
  }

  function addPercentInput(container, labelText, value, section, qIndex, field) {
    var label = document.createElement('label');
    label.className = 'question-label';
    label.textContent = labelText;
    container.appendChild(label);

    var rtRow = document.createElement('div');
    rtRow.className = 'rt-input-row';

    var wrapper = document.createElement('div');
    wrapper.className = 'numeric-field rt-field';

    var input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.className = 'text-input';
    input.placeholder = '0';
    input.value = value || '';
    input.autocomplete = 'off';

    var suf = document.createElement('span');
    suf.className = 'numeric-suffix';
    suf.textContent = '%';

    wrapper.appendChild(input);
    wrapper.appendChild(suf);

    // RT icon
    var icon = document.createElement('div');
    icon.className = 'rt-icon';
    var iconImg = document.createElement('img');
    iconImg.className = 'rt-icon-img';
    iconImg.alt = '';
    icon.appendChild(iconImg);

    function updateRT(val) {
      var num = parseInt(val, 10);
      if (!val || isNaN(num)) {
        icon.className = 'rt-icon';
        iconImg.src = '';
        iconImg.style.display = 'none';
        wrapper.classList.remove('rt-fresh', 'rt-rotten');
      } else if (num >= 60) {
        icon.className = 'rt-icon rt-icon-fresh';
        iconImg.src = 'assets/images/misc/rt-fresh.png';
        iconImg.style.display = '';
        wrapper.classList.add('rt-fresh');
        wrapper.classList.remove('rt-rotten');
      } else {
        icon.className = 'rt-icon rt-icon-rotten';
        iconImg.src = 'assets/images/misc/rt-rotten.png';
        iconImg.style.display = '';
        wrapper.classList.remove('rt-fresh');
        wrapper.classList.add('rt-rotten');
      }
    }

    input.addEventListener('input', function () {
      var digits = input.value.replace(/[^0-9]/g, '');
      if (parseInt(digits) > 100) digits = '100';
      input.value = digits;
      state.answers[section][qIndex][field] = digits;
      updateRT(digits);
      updateTimeline();
    });
    input.addEventListener('focus', function () {
      setTimeout(function () { rtRow.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
    });

    rtRow.appendChild(wrapper);
    rtRow.appendChild(icon);
    container.appendChild(rtRow);

    // Set initial state
    updateRT(value);
  }

  function formatPrice(str) {
    var s = str + '';
    var parts = s.split('.');
    var whole = (parts[0] || '0').replace(/^0+/, '') || '0';
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts.length > 1) return whole + '.' + parts[1];
    return whole;
  }

  function formatWithCommas(str) {
    var num = (str + '').replace(/^0+/, '') || '0';
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ── Audio Management ───────────────────────

  function getOrCreateAudio(src, id) {
    if (state.audioPlayers[id]) return state.audioPlayers[id];
    var audio = new Audio(src);
    audio.preload = 'auto';
    state.audioPlayers[id] = audio;
    return audio;
  }

  function stopAllAudio() {
    Object.keys(state.audioPlayers).forEach(function (key) {
      var a = state.audioPlayers[key];
      if (!a.paused) {
        a.pause();
        a.currentTime = 0;
      }
    });
  }

  // ── Save Inputs ────────────────────────────

  function saveCurrentInputs(screen) {
    // Inputs are saved on every keystroke via event listeners, so this is a no-op.
    // Kept as a hook in case we need batch-saving later.
  }

  // ── Nav Buttons ────────────────────────────

  function updateNavButtons() {
    var cur = state.currentScreen;
    var prev = $('prev-btn');
    var next = $('next-btn');

    // Disable prev on first question (don't go back to welcome/intro)
    var isFirstQuestion = true;
    for (var i = cur - 1; i >= 0; i--) {
      if (SCREEN_FLOW[i].type === 'question') {
        isFirstQuestion = false;
        break;
      }
    }
    prev.disabled = isFirstQuestion;

    // Last question → "Finish"
    var isLast = (cur === SCREEN_FLOW.length - 2); // last before submit
    if (isLast) {
      next.innerHTML = 'finish &rarr;';
      next.style.color = 'var(--section-color)';
      next.style.fontWeight = '600';
    } else {
      next.innerHTML = 'next &rarr;';
      next.style.color = '';
      next.style.fontWeight = '';
    }
  }

  // ── Timeline ───────────────────────────────

  function renderTimeline() {
    var tl = $('timeline');
    tl.innerHTML = '';

    var currentGI = SCREEN_FLOW[state.currentScreen].globalIndex;
    var lastSection = null;

    SCREEN_FLOW.forEach(function (s) {
      if (s.type !== 'question') return;

      // Add gap between sections
      if (lastSection && lastSection !== s.section) {
        var gap = document.createElement('div');
        gap.className = 'timeline-section-gap';
        tl.appendChild(gap);
      }
      lastSection = s.section;

      var dot = document.createElement('div');
      dot.className = 'timeline-dot';

      // Color by section
      var sec = SECTIONS.find(function (sc) { return sc.id === s.section; });
      if (sec) {
        dot.style.borderColor = sec.color;
      }

      // Current
      if (s.globalIndex === currentGI) {
        dot.classList.add('current');
      }

      // Answered
      if (isQuestionAnswered(s)) {
        dot.classList.add('answered');
        if (sec) {
          dot.style.backgroundColor = sec.color;
          dot.style.borderColor = sec.color;
        }
      }

      dot.addEventListener('click', function () {
        goToQuestionByGlobalIndex(s.globalIndex);
      });

      tl.appendChild(dot);
    });
  }

  function updateTimeline() {
    renderTimeline();
    saveState();
  }

  // ── Persistence (localStorage) ─────────────

  var STORAGE_KEY = 'caitlin-trivia-v2';

  function saveState() {
    try {
      var data = {
        name: state.name,
        emoji: state.emoji,
        currentScreen: state.currentScreen,
        answers: state.answers
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* quota exceeded or private browsing */ }
  }

  function restoreState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      if (!data.name || !data.emoji) return false;

      state.name = data.name;
      state.emoji = data.emoji;
      state.answers = data.answers;

      // Restore welcome inputs visually
      $('player-name').value = state.name;
      var btns = $('emoji-grid').querySelectorAll('.emoji-btn');
      btns.forEach(function (b) {
        if (b.textContent === state.emoji) b.classList.add('selected');
      });
      updateStartButton();

      // Jump back to where they were
      navigateTo(data.currentScreen || 1);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function isQuestionAnswered(screen) {
    if (screen.section === 'broadway') {
      var a = state.answers.broadway[screen.index];
      return !!(a.song || a.musical || a.year);
    } else if (screen.section === 'movies') {
      var a = state.answers.movies[screen.index];
      return !!(a.title || a.box_office || a.rt_score);
    } else if (screen.section === 'pir') {
      var items = state.answers.pir[screen.index];
      return items.some(function (v) { return !!v; });
    }
    return false;
  }

  // ── Submit Screen ──────────────────────────

  function renderSubmit() {
    $('submit-emoji').textContent = state.emoji;
    $('submit-name').textContent = state.name;

    var encoded = encodeAnswers();
    var fullUrl = window.location.origin + window.location.pathname + '#' + encoded.forUrl;
    $('url-display').value = encoded.raw;

    // Text Collin button — sends raw data, not a URL
    var smsUrl = 'sms:4802806571&body=' + encodeURIComponent(encoded.raw);
    $('text-collin-btn').href = smsUrl;

    // Count unanswered
    var total = 0;
    var answered = 0;

    state.answers.broadway.forEach(function (a) {
      total += 3;
      if (a.song) answered++;
      if (a.musical) answered++;
      if (a.year) answered++;
    });
    state.answers.movies.forEach(function (a) {
      total += 3;
      if (a.title) answered++;
      if (a.box_office) answered++;
      if (a.rt_score) answered++;
    });
    state.answers.pir.forEach(function (items) {
      items.forEach(function (v) {
        total++;
        if (v) answered++;
      });
    });

    var unanswered = total - answered;
    var note = $('unanswered-note');
    if (unanswered > 0) {
      note.textContent = unanswered + ' unanswered — tap to go back';
      note.onclick = function () {
        // Go back to the first unanswered question
        navigateTo(state.currentScreen - 1);
      };
    } else {
      note.textContent = '';
      note.onclick = null;
    }
  }

  // ── URL Encoding / Decoding ────────────────

  function encodeAnswers() {
    var data = {
      n: state.name,
      e: state.emoji,
      b: state.answers.broadway.map(function (a) {
        return [a.song || '', a.musical || '', a.year || ''];
      }),
      m: state.answers.movies.map(function (a) {
        return [a.title || '', a.box_office || '', a.rt_score || ''];
      }),
      p: state.answers.pir.map(function (items) {
        return items.map(function (v) { return v || ''; });
      })
    };
    var b64 = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    var b64url = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return { forUrl: 'data=' + encodeURIComponent(b64), raw: b64url };
  }

  function decodePlayerUrl(input) {
    if (!input) return null;
    input = input.trim();

    function b64urlToStandard(s) {
      s = s.replace(/-/g, '+').replace(/_/g, '/');
      while (s.length % 4) s += '=';
      return s;
    }

    function tryDecode(b64str) {
      try {
        var standard = b64urlToStandard(b64str);
        var binary = atob(standard);
        var json = decodeURIComponent(escape(binary));
        return JSON.parse(json);
      } catch (e) {
        console.log('[DECODE] failed:', e.message);
        return null;
      }
    }

    // Try as full URL with #data=
    if (input.indexOf('#') >= 0) {
      var hash = input.substring(input.indexOf('#') + 1);
      var params = new URLSearchParams(hash);
      var d = params.get('data');
      if (d) {
        var r = tryDecode(decodeURIComponent(d));
        if (r) return r;
      }
    }

    // Try as data=XXXXX
    if (input.indexOf('data=') >= 0) {
      var after = input.substring(input.indexOf('data=') + 5);
      var r = tryDecode(after);
      if (r) return r;
    }

    // Try as raw base64url string
    return tryDecode(input);
  }

  // Expose for results page
  window.decodePlayerUrl = decodePlayerUrl;
  window.SECTIONS = SECTIONS;
  window.BROADWAY = BROADWAY;
  window.MOVIES = MOVIES;
  window.PRICE_IS_RIGHT = PRICE_IS_RIGHT;
  window.reset = function () { clearState(); location.reload(); };

  // ── Copy Link ──────────────────────────────

  function copyLink() {
    var url = $('url-display').value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showCopied, function () { fallbackCopy(url); });
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    $('url-display').select();
    document.execCommand('copy');
    showCopied();
  }

  function showCopied() {
    var btn = $('copy-btn');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'Copy Link';
      btn.classList.remove('copied');
    }, 2000);
  }

  // ── Initialize ─────────────────────────────

  function init() {
    // Skip player mode init if we're not on the player page
    if (!$('emoji-grid')) return;

    initWelcome();

    $('prev-btn').addEventListener('click', goPrev);
    $('next-btn').addEventListener('click', goNext);
    $('copy-btn').addEventListener('click', copyLink);

    // Restore saved progress
    if (!restoreState()) {
      console.log('[TRIVIA] Fresh start. ' + TOTAL_QUESTIONS + ' questions across ' + SECTIONS.length + ' sections.');
    } else {
      console.log('[TRIVIA] Restored saved progress.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
