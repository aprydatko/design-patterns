export interface FileSystemNode {
  getName: () => string;
  getSize: () => number;
}

export class File implements FileSystemNode {
  constructor(
    private readonly name: string,
    private readonly size: number,
  ) {}

  getName = (): string => this.name;

  getSize = (): number => this.size;
}

/** Composite treats individual files and groups of files through one contract. */
export class Directory implements FileSystemNode {
  private readonly children: FileSystemNode[] = [];

  constructor(private readonly name: string) {}

  add = (child: FileSystemNode): this => {
    this.children.push(child);
    return this;
  };

  getName = (): string => this.name;

  getSize = (): number => this.children.reduce((total, child) => total + child.getSize(), 0);
}
