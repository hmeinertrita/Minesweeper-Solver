class Game {

  private Board board;
  private List<Position> cleared;
  private List<Position> flagged;

  public Game(int height, int width, double minePercentage) {
    board = new Board(height, width, minePercentage);
    cleared = new ArrayList<Position>();
    flagged = new ArrayList<Position>();
  }

  private void clear(int row, int col) {
    Position p = new Position(row, col);
    if (!cleared.contains(p) && !flagged.contains(p)) {
      if (board.checkPosition(row, col) == -1) {
        lose();
      }
      else {
        cleared.add(p);

        checkWin();
      }
    }
  }

  public void tap(int row, int col) {
    Position p = new Position(row, col);
    if (cleared.contains(p)) {
      List<Position> neighbours = getNeighbours(row, col);
      List<Position> neighboursNotFlagged = getNeighbours(row, col);
      for (Position i:neighbours) {
        if (flagged.contains(i)) {
          neighboursNotFlagged.remove(i);
        }
      }
      if (neighbours.size()-neighboursNotFlagged.size() == board.checkPosition(row, col)) {
        for (Position i:neighboursNotFlagged) {
          clear(i.row,i.col);
        }
      }
    }
    else {
      if (!flagged.contains(p)) {
        clear(row, col);
      }
    }
  }

  public void toggleFlag(int row, int col) {
    Position p = new Position(row, col);
    if (!cleared.contains(p)) {
      if (flagged.contains(p)) {
        flagged.remove(p);
      }
      else {
        flagged.add(p);

        checkWin();
      }
    }
  }

  private void checkWin() {
    if (board.getSpaceCount()-board.getMineCount() == cleared.size() && board.getMineCount() == flagged.size()) {
      System.out.println("You Win!");
    }
  }

  private void lose() {
    System.out.println("You Lose!");
  }
}
