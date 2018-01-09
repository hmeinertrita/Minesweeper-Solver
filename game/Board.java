class Board {
  private int[][] mines;
  private int mineCount;

  protected Board(int height, int width, double minePercentage) {
    mineCount = (int)(width*height*minePercentage+0.5);
    mines = new int[height][width];

    int minesToPlace = mineCount;
    List<Position> minePositions= new Arraylist<Position>();

    while (minesToPlace>0) {
      int row = (int)(Math.random()*height);
      int col = (int)(Math.random()*width);
      if (!(mines[row][col]==-1)) {
        mines[row][col]=-1;
        minePositions.add(new Position(row, col));

        minesToPlace--;
      }
    }
    for (Position i:minePositions) {
      List<Position> neighbours = getNeighbours(i.row, i.col);

      for (Position j:neighbours) {
        if (mines[j.row][j.col]!=-1) {
          mines[j.row][j.col]++;
        }
      }
    }
  }

  protected int checkPosition(int row, int col) {
    return mines[row][col];
  }

  protected List<Position> getNeighbours(int row, int col) {
    List<Position> neighbours = new ArrayList<Position>();

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        if (((i == 0 && j != 0) || (j == 0 && i != 0)) && row+i >= 0 && row+i < mines.length && col+j >=0 && col+j < mines[0].length) {
          neighbours.add(new Position(row+i, col+j));
        }
      }
    }

    return neighbours;
  }
}
