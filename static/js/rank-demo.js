/* ------------------------------------------------------------
   Rank demo (projects/localized-certification.html only)

   A toy version of the paper's point, with made-up numbers.
   200 items get a score. The lowest-scoring items, up to the
   budget, are "selected" (in the paper: deferred). Then some
   noise is added to every score and the page compares:

     Spearman rank correlation: how similar the two orderings
       are overall. 1 means the order did not change at all.
     Churn: how much the selected set changed, 1 − Jaccard
       overlap of the before and after sets.

   The chart draws every item as a line from its rank before
   the noise (top row) to its rank after (bottom row). Lines
   that crossed the threshold are highlighted.
   ------------------------------------------------------------ */

(function () {
  var chart = document.getElementById('demo-chart');
  if (!chart) {
    return;
  }

  var noiseInput = document.getElementById('demo-noise');
  var budgetInputs = document.querySelectorAll('input[name="demo-budget"]');
  var spearmanOutput = document.getElementById('demo-spearman');
  var churnOutput = document.getElementById('demo-churn');

  var COUNT = 200;
  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* Chart geometry, in the SVG's own units (viewBox 0 0 800 220). */
  var LEFT = 70;
  var RIGHT = 780;
  var TOP_ROW = 46;
  var BOTTOM_ROW = 176;

  /* A seeded random number generator, so the toy draws the same
     scores on every visit. Math.random() would change each time. */
  var seed = 23;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  /* Normally distributed noise from two uniform numbers (Box–Muller). */
  function gaussian() {
    var u = 1 - random();
    var v = random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  var scores = [];
  var noise = [];
  for (var i = 0; i < COUNT; i++) {
    scores.push(random());
    noise.push(gaussian());
  }

  /* ranks(values)[i] is item i's position when sorted, 0 = lowest. */
  function ranks(values) {
    var order = values.map(function (value, index) { return index; });
    order.sort(function (a, b) { return values[a] - values[b]; });
    var result = [];
    order.forEach(function (item, position) { result[item] = position; });
    return result;
  }

  /* Spearman's formula for rankings without ties. */
  function spearman(before, after) {
    var n = before.length;
    var sum = 0;
    for (var i = 0; i < n; i++) {
      var d = before[i] - after[i];
      sum += d * d;
    }
    return 1 - (6 * sum) / (n * (n * n - 1));
  }

  function xForRank(rank) {
    return LEFT + (rank / (COUNT - 1)) * (RIGHT - LEFT);
  }

  function svgElement(name, attributes) {
    var element = document.createElementNS(SVG_NS, name);
    Object.keys(attributes).forEach(function (key) {
      element.setAttribute(key, attributes[key]);
    });
    return element;
  }

  function label(x, y, text, anchor) {
    var element = svgElement('text', {
      x: x, y: y, 'class': 'fig-label fig-small fig-muted', 'text-anchor': anchor || 'start'
    });
    element.textContent = text;
    return element;
  }

  function selectedBudget() {
    var value = 0.05;
    budgetInputs.forEach(function (input) {
      if (input.checked) {
        value = parseFloat(input.value);
      }
    });
    return value;
  }

  function draw() {
    var spread = (parseInt(noiseInput.value, 10) / 100) * 0.08;
    var noisy = scores.map(function (score, index) {
      return score + spread * noise[index];
    });

    var before = ranks(scores);
    var after = ranks(noisy);
    var budget = Math.round(selectedBudget() * COUNT);

    /* Count how many items are selected both times, then Jaccard. */
    var kept = 0;
    for (var i = 0; i < COUNT; i++) {
      if (before[i] < budget && after[i] < budget) {
        kept++;
      }
    }
    var jaccard = kept / (2 * budget - kept);

    /* Redraw the chart from scratch: it is only a few hundred lines. */
    chart.querySelectorAll(':scope > :not(title)').forEach(function (node) {
      node.remove();
    });

    var threshold = xForRank(budget - 0.5);
    chart.appendChild(svgElement('rect', {
      'class': 'fig-region', x: LEFT, y: TOP_ROW - 14,
      width: threshold - LEFT, height: BOTTOM_ROW - TOP_ROW + 28
    }));
    chart.appendChild(label(LEFT - 12, TOP_ROW + 5, 'before', 'end'));
    chart.appendChild(label(LEFT - 12, BOTTOM_ROW + 5, 'after', 'end'));
    chart.appendChild(label(LEFT, TOP_ROW - 22, 'selected'));
    chart.appendChild(label(RIGHT, BOTTOM_ROW + 34, 'rank, lowest score on the left', 'end'));

    var crossing = [];
    for (var j = 0; j < COUNT; j++) {
      var line = svgElement('line', {
        'class': 'demo-link',
        x1: xForRank(before[j]), y1: TOP_ROW,
        x2: xForRank(after[j]), y2: BOTTOM_ROW
      });
      if ((before[j] < budget) !== (after[j] < budget)) {
        line.classList.add('is-crossing');
        crossing.push(line);       /* drawn last, so they sit on top */
      } else {
        chart.appendChild(line);
      }
    }
    crossing.forEach(function (line) { chart.appendChild(line); });

    chart.appendChild(svgElement('line', {
      'class': 'fig-line', x1: threshold, y1: TOP_ROW - 14, x2: threshold, y2: BOTTOM_ROW + 14
    }));

    spearmanOutput.textContent = spearman(before, after).toFixed(3);
    churnOutput.textContent = (1 - jaccard).toFixed(2);
  }

  noiseInput.addEventListener('input', draw);
  budgetInputs.forEach(function (input) {
    input.addEventListener('change', draw);
  });
  draw();
})();
