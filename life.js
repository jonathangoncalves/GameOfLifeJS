var GameOfLife = function (init_state, timeout) {
  this.size_x_initial = 0;
  this.size_y_initial = 0;
  this.init_state = [];
  this.start_state = [];
  this.generate_initial_state = function (random, size_x, size_y) {
    var new_state = new Array(size_x);
    for (var x = 0; x < size_x; x++) {
      new_state[x] = new Array(size_y);
      for (var y = 0; y < size_y; y++) {
        if (random) {
          new_state[x][y] = Math.round(Math.random());
        } else {
          new_state[x][y] = 0;
        }
      }
    }
    return new_state;
  };

  this.render_state = function (current_state) {
    var html = '';
    for (var x in current_state) {
      html += '<div class="linha">';
      for (var y in current_state[x]) {
        html += "<div class='coluna " + (current_state[x][y] === 1 ? 'alive' : 'dead') + "'></div>";
      }
      html += '</div>';
    }
    this.write_board(html);
  };
  this.calc_new_state = function (initial_state) {
    var new_state = this.generate_initial_state(0, this.size_x_initial, this.size_y_initial);
    for (var x in initial_state) {
      for (var y in initial_state[x]) {
        new_state[x][y] = this.get_life_state(initial_state, x, y);
      }
    }
    return new_state;
  };

  this.write_board = function (html) {
    document.getElementById('board').innerHTML = html;
  };
  this.get_position_state = function (initial_state, x, y) {
    var new_state = 0;
    if (initial_state[x] !== undefined) {
      if (initial_state[x][y] !== undefined) {
        new_state = initial_state[x][y];
      }
    }

    return new_state;
  };
  this.calculate_neightborhood = function (initial_state, x, y) {
    return this.get_position_state(initial_state, parseInt(x) - 1, parseInt(y) - 1) +
      this.get_position_state(initial_state, parseInt(x) - 1, parseInt(y)) +
      this.get_position_state(initial_state, parseInt(x) - 1, parseInt(y) + 1) +
      this.get_position_state(initial_state, parseInt(x), parseInt(y) - 1) +
      this.get_position_state(initial_state, parseInt(x), parseInt(y) + 1) +
      this.get_position_state(initial_state, parseInt(x) + 1, parseInt(y) - 1) +
      this.get_position_state(initial_state, parseInt(x) + 1, parseInt(y)) +
      this.get_position_state(initial_state, parseInt(x) + 1, parseInt(y) + 1);
  };

  this.get_life_state = function(initial_state, x, y){
    var vizinhos = this.calculate_neightborhood(initial_state, x, y);
    var life_state = 0;
    if (initial_state[x][y] > 0) {
      switch (vizinhos) {
        case 0:
          life_state = 0;
          break;
        case 1:
          life_state = 0;
          break;
        case 2:
          life_state = 1;
          break;
        case 3:
          life_state = 1;
          break;
        case 4:
          life_state = 0;
          break;
        case 5:
          life_state = 0;
          break;
        default:
          life_state = 0;
          break;
      }
    } else {
      if (vizinhos === 3) {
        life_state = 1;
      }
    }
    return life_state;
  };

  this.intervalInteration = function () {
    var new_state = this.calc_new_state(this.init_state);
    this.render_state(new_state);
    this.init_state = new_state;
  };

  this.init = function (init_state, timeout) {
    this.size_x_initial = init_state.length;
    this.size_y_initial = init_state[0].length;
    this.start_state = this.init_state = init_state;
  };

  this.start = function(){
    this.render_state(this.init_state);
    var self = this;
    this.stop();
    return this.interval = setInterval(
      function () {
        self.intervalInteration()
      },
      timeout !== undefined ? timeout : 1000
    );
  };

  this.stop = function(){
    return clearInterval(this.interval);
  };

  this.restart = function(){
    this.init_state = this.start_state;
    this.start();
  };

  this.random = function(){
    this.start_state = this.init_state = this.generate_initial_state(1, 50, 50);
    this.render_state(this.init_state);
    this.init(this.init_state, timeout);
  };

  this.init(init_state, timeout);
};


