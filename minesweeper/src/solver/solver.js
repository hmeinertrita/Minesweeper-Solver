//import Game from '../game/game.js';

class Minesweeper {

  static bestMove(game, move) {
    var m = move ? move:new Move(game);
    console.log(m.frontier);
    var nextVisit = m.next.slice();
    var b = m

    while (nextVisit.length > 0) {
      const curr = nextVisit[0];
      nextVisit.splice(0,0,...curr.next.slice());

      if (curr.toFlag.length> b.toFlag.length) {
        b=curr;
      }
    }
    return b;
  }

  static clearFilled(game) {
    var clearedAny = false;
    for (var i = 0; i < game.dim*game.dim; i++) {
      const status = game.getStatus(i);
      if (status>0 && status === game.getFlagsAround(i)) {
        const s = game.getSurrounding(i);
        for (var j = 0; j < s.length; j++) {
          if (!game.isFlagged(s[j])) {
            game.clear(s[j]);
            clearedAny = true;
          }
        }
      }
    }
    return clearedAny;
  }

  static solve() {
    var stuck = false;
    game.clear(0);
    while (!game.isOver() && !stuck) {
      const move = Minesweeper.bestMove(game);
      console.log(move.certainty);
      if (move.certainty > 0 || move.certainty===-1) {
        console.log("guess!");
        return;
      }
      const flags = move.toFlag;
      for (var i = 0; i < flags.length; i++) {
        game.flag(flags[i]);
      }
      stuck = !Minesweeper.clearFilled(game);
    }
    if (stuck) {
      console.log("stuck");
    }
  }
}

class Move {
  constructor(game, toFlag, frontier, target) {
    this.game = game;
    this.toFlag = toFlag ? toFlag:[];
    this.frontier = frontier;
    this.target = target!==undefined ? target:-1;
    if (!this.frontier) {
      this.frontier=[];
      for (var i = 0; i < this.game.dim*this.game.dim; i++) {
        if (this.game.getStatus(i) > 0) {
          this.frontier.push(i);
        }
      }
    }

    this.next = this.nextMoves();
    console.log("target: " + this.frontier[this.target] + " next length: " + this.next.length + " to flag: ["+this.toFlag+"]");
  }

  valid() {
    for (var i = 0; i < this.frontier.length; i++) {
      const s = this.game.getSurrounding(this.frontier[i]);
      var count = this.game.getFlagsAround(this.frontier[i]);
      for (var j = 0; j < s.length; j++) {
        count += this.toFlag.includes(s[j]) ? 1:0;
      }
      if (count > this.game.getStatus(this.frontier[i])) {
        return false;
      }
    }

    return true;
  }

  nextMoves() {
    const tar = this.frontier[this.target+1];
    const next = [];

    if (this.target+1 === this.frontier.length) {
      return next;
    }

    const s = this.game.getSurrounding(tar);
    const flagsNeeded = this.game.getStatus(tar) - this.game.getFlagsAround(tar);

    const pos = [];
    for (var i = 0; i < s.length; i++) {
      if (
        !this.game.isCleared(s[i]) &&
        !this.game.isFlagged(s[i]) &&
        !this.toFlag.includes(s[i])
      ) {
        pos.push(s[i]);
      }
    }
    const targetCombos=[];
    Move.combos(targetCombos, pos, flagsNeeded);

    for (var i = 0; i < targetCombos.length; i++) {
      const newFlag = this.toFlag.slice();
      newFlag.push(...targetCombos[i]);
      const m = new Move(
        this.game,
        newFlag,
        this.frontier,
        (this.target)+1,
      );

      if (m.valid() ) {next.push(m);}
    }

    return next;
  }

  static combos(out, pos, num, c, indx) {

    const idx = indx ? indx:pos.map((v,i) => {return i;});

    const comboIdx = c ? c:[];


    if (comboIdx.length === num) {
      const o = (comboIdx.map((v) => {
        return pos[v];
      }));
      out.push(o);
    }
    comboIdx.push(null);

    for (var i = 0; i < idx.length; i++) {
      if (!comboIdx.includes(idx[i])) {
        comboIdx[comboIdx.length-1] = idx[i];
        idx.splice(i--, 1);

        Move.combos(out, pos, num, comboIdx.slice(), idx.slice());
      }
    }
  }
}
