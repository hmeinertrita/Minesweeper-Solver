class Game {

  constructor(dim, mine_factor) {
    this.dim = dim;
    this.initialized = false;

    var field = Array(this.dim*this.dim).fill(false);
    const cleared = {};
    const flags = {};

    this.mine_count = Math.floor(field.length*mine_factor);
    this.mine_count += this.mine_count===this.dim*this.dim ? -1 : 0;

    var over = false;

    this.clear = (i) => {
      if (!this.initialized) {
        field = this.initializeField(field, i, this.mine_count);
        this.initialized = true;
      }
      if (i<0 || i>field.length) {
        return;
      }
      if (!over) {
        if (!(flags[i])) {
          if (field[i]) {
            //TODO lose
            over = true;
            console.log("lose!");
          }
          else if (!(i in cleared)){
            cleared[i] = true;
            console.log("cleared " + i);
            if (this.getStatus(i) === 0) {
              const surroundings = this.getSurrounding(i);
              for (var j = 0; j < surroundings.length; j++) {
                if (!(surroundings[j] in cleared)) {
                  this.clear(surroundings[j]);
                }
              }
            }
          }
        }
      }
    };

    this.isCleared = (i) => {return (i in cleared);};

    this.flag = (i) => {
      if (!over) {
        if (i in cleared) {
          return;
        }
        if (flags[i]) {console.log("unflagged " + i);}
        else {console.log("flagged " + i);}

        flags[i]=!flags[i];
      }
    };

    this.getFlagCount = () => {
      var count = 0;
      for (var key in flags) {
          count+=(flags[key] ? 1 : 0);
      }
      return count;
    };

    this.getStatus = (i) => {
      if (flags[i]) {
        if (!field[i] && over) {
          return -3;
        }
        return -1;
      }
      else if (cleared[i] || over) {
        if (field[i]) {
          return -2;
        }
        const surroundings = this.getSurrounding(i);
        var count = 0;
        for (var j = 0; j < surroundings.length; j++) {
          if (field[surroundings[j]]) {
            count++;
          }
        }
        return count;
      }
    };

    this.getFlagsAround = (i) => {
      const surroundings = this.getSurrounding(i);
      var count = 0;
      for (var j = 0; j < surroundings.length; j++) {
        if (flags[surroundings[j]]) {
          count++;
        }
      }
      return count;
    };

    this.print = () => {
      //const out = (field.map((val, i) => {
      //  return this.getStatus(i);
      //}));
      for (var i = 0; i < this.dim; i++) {
        var line = "";
        for (var j = 0; j < this.dim; j++) {
          if (i*this.dim+j in flags) {
            line = line + " F";
          }
          line = line + (" " + this.getStatus(i*this.dim+j));
        }
        console.log(line);
      }
    };
  }

  getSurrounding(i) {
    const out = [];
    const surroundings = [
      i-this.dim-1, i-this.dim, i-this.dim+1,
      i-1,                               i+1,
      i+this.dim-1, i+this.dim, i+this.dim+1,
    ];
    if (i%this.dim === 0) {
      surroundings[0] = null;
      surroundings[3] = null;
      surroundings[5] = null;
    }
    if (i%this.dim === this.dim-1) {
      surroundings[2] = null;
      surroundings[4] = null;
      surroundings[7] = null;
    }
    if (Math.floor(i/this.dim) === 0) {
      surroundings[0] = null;
      surroundings[1] = null;
      surroundings[2] = null;
    }
    if (Math.floor(i/this.dim) === this.dim-1) {
      surroundings[5] = null;
      surroundings[6] = null;
      surroundings[7] = null;
    }

    for (var j = 0; j < surroundings.length; j++) {
      if (surroundings[j] != null) {
        out.push(surroundings[j]);
      }
    }
    return out;
  }

  initializeField(field, first, mine_count) {
    const f = field.slice();
  
    var indices = f.map((val, i) => {return i;});
    indices.splice(first, 1);

    for (var i = 0; i < mine_count; i++) {
      const j = Math.floor(Math.random()*indices.length);
      f[indices[j]] = true;
      indices.splice(j, 1);
    }
    return f;
  }


}

export default Game;
