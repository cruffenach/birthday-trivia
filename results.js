/* ============================================
   Caitlin's 40th Birthday Trivia v2
   Evaluation / Results Mode
   ============================================ */

(function () {
  'use strict';

  // ── State ──────────────────────────────────

  var players = [];     // [{ name, emoji, answers: { b, m, p } }]
  var scores = [];      // [{ name, emoji, score }]
  var currentQ = 0;
  var questionList = []; // flat list of { section, index, qNum }

  // Build question list
  var qNum = 0;
  SECTIONS.forEach(function (sec) {
    if (sec.id === 'broadway') {
      BROADWAY.forEach(function (_, i) { questionList.push({ section: 'broadway', index: i, qNum: ++qNum }); });
    } else if (sec.id === 'movies') {
      MOVIES.forEach(function (_, i) { questionList.push({ section: 'movies', index: i, qNum: ++qNum }); });
    } else if (sec.id === 'pir') {
      PRICE_IS_RIGHT.forEach(function (_, i) { questionList.push({ section: 'pir', index: i, qNum: ++qNum }); });
    }
  });
  var TOTAL_Q = qNum;

  var $ = function (id) { return document.getElementById(id); };

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
    $(id).classList.add('active');
  }

  function setSection(sectionId) {
    var sec = SECTIONS.find(function (s) { return s.id === sectionId; });
    if (sec) document.documentElement.style.setProperty('--section-color', sec.color);
  }

  // ── Parse Player URLs ──────────────────────

  function parseUrls() {
    var text = $('eval-urls').value.trim();
    var lines = text.split('\n').map(function (l) { return l.trim(); }).filter(function (l) { return l.length > 0; });

    players = [];
    var chipContainer = $('eval-players');
    chipContainer.innerHTML = '';

    lines.forEach(function (line) {
      var data = window.decodePlayerUrl(line);
      if (data && data.n) {
        players.push({
          name: data.n,
          emoji: data.e || '?',
          answers: { b: data.b || [], m: data.m || [], p: data.p || [] }
        });
        var chip = document.createElement('span');
        chip.className = 'eval-player-chip';
        chip.textContent = data.e + ' ' + data.n;
        chipContainer.appendChild(chip);
      }
    });

    $('btn-begin-eval').disabled = (players.length === 0);
    if (players.length > 0) {
      chipContainer.insertAdjacentHTML('beforeend', '<span class="body-text" style="font-size:0.85rem;margin-left:0.25rem;">' + players.length + ' player' + (players.length > 1 ? 's' : '') + ' found</span>');
    }
  }

  // ── Begin Reveal ───────────────────────────

  function beginReveal() {
    if (players.length === 0) return;
    scores = players.map(function (p) { return { name: p.name, emoji: p.emoji, score: 0 }; });
    currentQ = 0;
    renderReveal(0);
    showScreen('eval-reveal');
  }

  // ── Render Reveal ──────────────────────────

  function renderReveal(idx) {
    currentQ = idx;
    var q = questionList[idx];
    var sec = SECTIONS.find(function (s) { return s.id === q.section; });
    setSection(q.section);

    $('ev-header').innerHTML = '<span class="section-badge">' + sec.icon + ' ' + sec.name + '</span>  Q ' + q.qNum + ' of ' + TOTAL_Q;

    var content = $('ev-content');
    content.innerHTML = '';
    content.scrollTop = 0;

    if (q.section === 'broadway') {
      renderBroadwayReveal(content, q.index);
      $('ev-points').textContent = '300 pts';
    } else if (q.section === 'movies') {
      renderMovieReveal(content, q.index);
      $('ev-points').textContent = '300 pts';
    } else if (q.section === 'pir') {
      renderPIRReveal(content, q.index);
      var itemCount = PRICE_IS_RIGHT[q.index].items.length;
      $('ev-points').textContent = (itemCount * 200) + ' pts';
    }

    renderLeaderboard($('ev-leaderboard'));

    $('ev-prev').disabled = (idx === 0);
    $('ev-next').textContent = (idx === questionList.length - 1) ? 'Show Winner →' : 'Next →';
  }

  // ── Broadway Reveal ────────────────────────

  var evalAudioPlayers = {};

  function stopEvalAudio() {
    Object.keys(evalAudioPlayers).forEach(function (k) {
      if (!evalAudioPlayers[k].paused) { evalAudioPlayers[k].pause(); evalAudioPlayers[k].currentTime = 0; }
    });
  }

  function renderBroadwayReveal(container, index) {
    var q = BROADWAY[index];
    stopEvalAudio();

    // Audio player
    var player = document.createElement('div');
    player.className = 'audio-player';
    player.style.marginBottom = '0.6rem';

    var playBtn = document.createElement('button');
    playBtn.className = 'audio-play-btn';
    playBtn.type = 'button';
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

    if (!evalAudioPlayers[q.id]) {
      evalAudioPlayers[q.id] = new Audio(q.audio);
      evalAudioPlayers[q.id].preload = 'auto';
    }
    var audio = evalAudioPlayers[q.id];

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        stopEvalAudio();
        audio.play().catch(function () {});
        playBtn.classList.add('playing');
        playBtn.innerHTML = '&#9646;&#9646;';
      } else {
        audio.pause();
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '&#9654;';
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
    });

    container.appendChild(player);

    // Correct answers
    var correct = document.createElement('div');
    correct.className = 'eval-correct-area';
    correct.style.borderTop = 'none';
    correct.style.paddingTop = '0';

    addCorrectLine(correct, 'Song', q.song);
    addCorrectLine(correct, 'Musical', q.musical);
    addCorrectLine(correct, 'Year', q.year.toString());

    if (q.fun_fact) {
      var ff = document.createElement('p');
      ff.className = 'eval-fun-fact';
      ff.style.marginTop = '0.5rem';
      ff.textContent = q.fun_fact;
      correct.appendChild(ff);
    }
    container.appendChild(correct);

    // Player answers
    var row = document.createElement('div');
    row.className = 'eval-answer-row';
    players.forEach(function (p, pi) {
      var ans = (p.answers.b && p.answers.b[index]) || ['', '', ''];
      var songMatch = fuzzyMatch(ans[0], q.song);
      var musicalMatch = fuzzyMatch(ans[1], q.musical);
      var yearMatch = (ans[2] === q.year.toString());

      var pts = 0;
      if (songMatch) pts += 100;
      if (musicalMatch) pts += 100;
      if (yearMatch) pts += 100;
      scores[pi].score += pts;

      var card = createPlayerCard(p, [
        { label: 'Song', value: ans[0] || '—', correct: songMatch },
        { label: 'Musical', value: ans[1] || '—', correct: musicalMatch },
        { label: 'Year', value: ans[2] || '—', correct: yearMatch }
      ], pts);
      row.appendChild(card);
    });
    container.appendChild(row);
  }

  // ── Movie Reveal ───────────────────────────

  function renderMovieReveal(container, index) {
    var q = MOVIES[index];

    var correct = document.createElement('div');
    correct.className = 'eval-correct-area';
    correct.style.borderTop = 'none';
    correct.style.paddingTop = '0';

    addCorrectLine(correct, 'Movie', q.title);
    addCorrectLine(correct, 'Box Office', '$' + q.box_office + 'M');
    addCorrectLine(correct, 'RT Score', q.rt_score + '%');

    if (q.fun_fact) {
      var ff = document.createElement('p');
      ff.className = 'eval-fun-fact';
      ff.style.marginTop = '0.5rem';
      ff.textContent = q.fun_fact;
      correct.appendChild(ff);
    }
    container.appendChild(correct);

    var row = document.createElement('div');
    row.className = 'eval-answer-row';
    players.forEach(function (p, pi) {
      var ans = (p.answers.m && p.answers.m[index]) || ['', '', ''];
      var titleMatch = fuzzyMatch(ans[0], q.title);
      var boMatch = numericClose(ans[1], q.box_office, 0.2); // within 20%
      var rtMatch = numericClose(ans[2], q.rt_score, 0.07); // within ±5pts on 100 scale

      var pts = 0;
      if (titleMatch) pts += 100;
      if (boMatch) pts += 100;
      if (rtMatch) pts += 100;
      scores[pi].score += pts;

      var card = createPlayerCard(p, [
        { label: 'Movie', value: ans[0] || '—', correct: titleMatch },
        { label: 'Box Office', value: ans[1] ? '$' + ans[1] + 'M' : '—', correct: boMatch },
        { label: 'RT', value: ans[2] ? ans[2] + '%' : '—', correct: rtMatch }
      ], pts);
      row.appendChild(card);
    });
    container.appendChild(row);
  }

  // ── PIR Reveal ─────────────────────────────

  function renderPIRReveal(container, index) {
    var yr = PRICE_IS_RIGHT[index];

    yr.items.forEach(function (item, itemIdx) {
      var itemSection = document.createElement('div');
      itemSection.style.marginBottom = '0.75rem';

      // Item header + correct price
      var hdr = document.createElement('div');
      hdr.innerHTML = '<span class="pir-item-badge ' + item.type + '" style="display:inline;">' + item.badge + '</span> ' +
        '<span class="pir-item-name" style="display:inline;font-size:0.95rem;">' + item.name + '</span>';
      itemSection.appendChild(hdr);

      var correctLine = document.createElement('p');
      correctLine.className = 'eval-correct-value';
      correctLine.style.fontSize = '1rem';
      correctLine.textContent = 'Actual price: $' + formatNum(item.price);
      itemSection.appendChild(correctLine);

      // Player guesses — closest without going over
      var guesses = players.map(function (p, pi) {
        var pirAnswers = p.answers.p && p.answers.p[index] ? p.answers.p[index] : [];
        var guess = parseInt(pirAnswers[itemIdx], 10) || 0;
        return { playerIdx: pi, guess: guess };
      });

      // Find winner: closest without going over
      var eligible = guesses.filter(function (g) { return g.guess > 0 && g.guess <= item.price; });
      eligible.sort(function (a, b) { return b.guess - a.guess; }); // highest first (closest)
      var winnerIdx = eligible.length > 0 ? eligible[0].playerIdx : -1;

      if (winnerIdx >= 0) {
        scores[winnerIdx].score += 200;
      }

      // Show guesses
      var row = document.createElement('div');
      row.className = 'eval-answer-row';
      players.forEach(function (p, pi) {
        var guess = guesses.find(function (g) { return g.playerIdx === pi; }).guess;
        var isWinner = (pi === winnerIdx);
        var isOver = (guess > item.price);

        var card = document.createElement('div');
        card.className = 'eval-answer-card';
        if (isWinner) {
          card.style.borderColor = 'var(--correct)';
          card.style.background = 'rgba(106, 155, 92, 0.08)';
        } else if (isOver) {
          card.style.opacity = '0.5';
        }

        card.innerHTML = '<div class="eval-card-header">' +
          '<span class="eval-card-emoji">' + p.emoji + '</span>' +
          '<span class="eval-card-name">' + p.name + '</span>' +
          '</div>' +
          '<p class="eval-card-answer">' + (guess > 0 ? '$' + formatNum(guess) : '—') +
          (isOver ? ' <span style="color:var(--incorrect);font-size:0.8rem;">OVER</span>' : '') +
          (isWinner ? ' <span style="color:var(--correct);font-size:0.8rem;">✓ +200</span>' : '') +
          '</p>';
        row.appendChild(card);
      });
      itemSection.appendChild(row);
      container.appendChild(itemSection);
    });
  }

  // ── Helpers ────────────────────────────────

  function addCorrectLine(container, label, value) {
    var wrapper = document.createElement('div');
    wrapper.style.marginBottom = '0.25rem';
    var lbl = document.createElement('span');
    lbl.className = 'header-caps eval-correct-label';
    lbl.style.marginRight = '0.5rem';
    lbl.textContent = label + ':';
    wrapper.appendChild(lbl);
    var val = document.createElement('span');
    val.className = 'eval-correct-value';
    val.style.fontSize = '1rem';
    val.textContent = value;
    wrapper.appendChild(val);
    container.appendChild(wrapper);
  }

  function createPlayerCard(player, fields, pts) {
    var card = document.createElement('div');
    card.className = 'eval-answer-card';

    var header = document.createElement('div');
    header.className = 'eval-card-header';
    header.innerHTML = '<span class="eval-card-emoji">' + player.emoji + '</span>' +
      '<span class="eval-card-name">' + player.name + '</span>' +
      (pts > 0 ? '<span style="color:var(--correct);font-size:0.75rem;margin-left:auto;">+' + pts + '</span>' : '');
    card.appendChild(header);

    fields.forEach(function (f) {
      var row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.gap = '0.25rem';
      row.innerHTML = '<span style="font-size:0.7rem;color:var(--charcoal-soft);">' + f.label + ':</span>' +
        '<span class="eval-card-answer" style="font-size:0.85rem;' + (f.correct ? 'color:var(--correct);' : '') + '">' + f.value + '</span>' +
        (f.correct ? '<span style="color:var(--correct);font-size:0.7rem;">✓</span>' : '');
      card.appendChild(row);
    });

    return card;
  }

  function fuzzyMatch(input, target) {
    if (!input || !target) return false;
    var a = normalize(input);
    var b = normalize(target);
    if (a === b) return true;
    // Check if one contains the other
    if (a.length > 2 && b.indexOf(a) >= 0) return true;
    if (b.length > 2 && a.indexOf(b) >= 0) return true;
    // Levenshtein for close matches
    if (a.length > 3 && b.length > 3 && levenshtein(a, b) <= 2) return true;
    return false;
  }

  function normalize(str) {
    return str.toLowerCase()
      .replace(/^(the |a |an )/i, '')
      .replace(/[''`]/g, '')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function levenshtein(a, b) {
    var m = a.length, n = b.length;
    var dp = [];
    for (var i = 0; i <= m; i++) {
      dp[i] = [i];
      for (var j = 1; j <= n; j++) {
        if (i === 0) { dp[i][j] = j; continue; }
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return dp[m][n];
  }

  function numericClose(input, target, tolerance) {
    if (!input) return false;
    var val = parseInt(input, 10);
    if (isNaN(val)) return false;
    var diff = Math.abs(val - target) / target;
    return diff <= tolerance;
  }

  function formatNum(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ── Leaderboard ────────────────────────────

  function renderLeaderboard(container) {
    var wasCollapsed = container.classList.contains('collapsed');
    container.innerHTML = '';

    var title = document.createElement('p');
    title.className = 'header-caps leaderboard-title';
    title.innerHTML = 'Leaderboard <span class="leaderboard-toggle">&#9660;</span>';
    title.addEventListener('click', function () {
      container.classList.toggle('collapsed');
    });
    container.appendChild(title);
    if (wasCollapsed) container.classList.add('collapsed');

    var sorted = scores.slice().sort(function (a, b) { return b.score - a.score; });
    var maxScore = sorted.length > 0 ? sorted[0].score : 1;
    if (maxScore === 0) maxScore = 1;

    sorted.forEach(function (s, i) {
      var row = document.createElement('div');
      row.className = 'leaderboard-row';

      var rank = document.createElement('span');
      rank.className = 'lb-rank';
      rank.textContent = (i + 1) + '.';
      row.appendChild(rank);

      var emoji = document.createElement('span');
      emoji.className = 'lb-emoji';
      emoji.textContent = s.emoji;
      row.appendChild(emoji);

      var name = document.createElement('span');
      name.className = 'lb-name';
      name.textContent = s.name;
      row.appendChild(name);

      var barBg = document.createElement('div');
      barBg.className = 'lb-bar-bg';
      var barFill = document.createElement('div');
      barFill.className = 'lb-bar-fill';
      if (i === 0) barFill.classList.add('first');
      else if (i === 1) barFill.classList.add('second');
      else if (i === 2) barFill.classList.add('third');
      barFill.style.width = (s.score / maxScore * 100) + '%';
      barBg.appendChild(barFill);
      row.appendChild(barBg);

      var score = document.createElement('span');
      score.className = 'lb-score';
      score.textContent = s.score;
      row.appendChild(score);

      container.appendChild(row);
    });
  }

  // ── Winner ─────────────────────────────────

  function showWinner() {
    var sorted = scores.slice().sort(function (a, b) { return b.score - a.score; });
    var winner = sorted[0];

    if (sorted.length > 1 && sorted[0].score === sorted[1].score) {
      $('winner-label').textContent = "It's a Tie!";
    } else {
      $('winner-label').textContent = 'The Winner';
    }

    $('w-emoji').textContent = winner.emoji;
    $('w-name').textContent = winner.name + '!';
    $('w-score').textContent = winner.score + ' points';

    renderLeaderboard($('w-leaderboard'));
    showScreen('eval-winner');
    createConfetti();
  }

  function createConfetti() {
    var container = $('confetti');
    container.innerHTML = '';
    var colors = ['#C47A8A', '#D4A853', '#7A9B6D', '#8FA3C4', '#B5607A', '#4A6FA5'];
    for (var i = 0; i < 60; i++) {
      var petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = (Math.random() * 100) + '%';
      petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      petal.style.animationDuration = (3 + Math.random() * 4) + 's';
      petal.style.animationDelay = (Math.random() * 3) + 's';
      petal.style.width = (6 + Math.random() * 10) + 'px';
      petal.style.height = (8 + Math.random() * 12) + 'px';
      petal.style.opacity = (0.5 + Math.random() * 0.4).toString();
      container.appendChild(petal);
    }
  }

  // ── Init ───────────────────────────────────

  function init() {
    $('eval-urls').addEventListener('input', parseUrls);
    $('btn-begin-eval').addEventListener('click', beginReveal);

    $('ev-prev').addEventListener('click', function () {
      if (currentQ > 0) {
        // Recalculate scores from scratch up to prev question
        recalcScoresUpTo(currentQ - 1);
        renderReveal(currentQ - 1);
      }
    });

    $('ev-next').addEventListener('click', function () {
      if (currentQ < questionList.length - 1) {
        renderReveal(currentQ + 1);
      } else {
        showWinner();
      }
    });
  }

  function recalcScoresUpTo(upToIdx) {
    // Reset scores and re-render each question to recalculate
    scores = players.map(function (p) { return { name: p.name, emoji: p.emoji, score: 0 }; });
    for (var i = 0; i <= upToIdx; i++) {
      // Silently score each question
      var q = questionList[i];
      if (q.section === 'broadway') {
        scoreBroadwaySilent(q.index);
      } else if (q.section === 'movies') {
        scoreMovieSilent(q.index);
      } else if (q.section === 'pir') {
        scorePIRSilent(q.index);
      }
    }
  }

  function scoreBroadwaySilent(index) {
    var q = BROADWAY[index];
    players.forEach(function (p, pi) {
      var ans = (p.answers.b && p.answers.b[index]) || ['', '', ''];
      if (fuzzyMatch(ans[0], q.song)) scores[pi].score += 100;
      if (fuzzyMatch(ans[1], q.musical)) scores[pi].score += 100;
      if (ans[2] === q.year.toString()) scores[pi].score += 100;
    });
  }

  function scoreMovieSilent(index) {
    var q = MOVIES[index];
    players.forEach(function (p, pi) {
      var ans = (p.answers.m && p.answers.m[index]) || ['', '', ''];
      if (fuzzyMatch(ans[0], q.title)) scores[pi].score += 100;
      if (numericClose(ans[1], q.box_office, 0.2)) scores[pi].score += 100;
      if (numericClose(ans[2], q.rt_score, 0.07)) scores[pi].score += 100;
    });
  }

  function scorePIRSilent(index) {
    var yr = PRICE_IS_RIGHT[index];
    yr.items.forEach(function (item, itemIdx) {
      var guesses = players.map(function (p, pi) {
        var pirAnswers = p.answers.p && p.answers.p[index] ? p.answers.p[index] : [];
        return { playerIdx: pi, guess: parseInt(pirAnswers[itemIdx], 10) || 0 };
      });
      var eligible = guesses.filter(function (g) { return g.guess > 0 && g.guess <= item.price; });
      eligible.sort(function (a, b) { return b.guess - a.guess; });
      if (eligible.length > 0) {
        scores[eligible[0].playerIdx].score += 200;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
