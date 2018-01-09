class Position {

  protected final int row;
  protected final int col;

  protected Position(int row, int col) {
    this.row = row;
    this.col = col;
  }

  public boolean equals(Object o) {
    if (o instanceof Position) {
      Position p = (Position)(o);
      return (p.row == this.row && p.col == this.col);
    }
    return false;
  }
}
