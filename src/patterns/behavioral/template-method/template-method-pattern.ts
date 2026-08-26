export type ImportedData = Readonly<{
  format: string;
  records: readonly string[];
}>;

/**
 * Template Method Pattern defines the workflow once while subclasses customize
 * selected steps of that workflow.
 */
export abstract class DataImporter {
  protected abstract readonly format: string;

  public run = (input: string): ImportedData => {
    const records = this.parse(input);
    this.validate(records);

    return {
      format: this.format,
      records,
    };
  };

  protected abstract parse(input: string): readonly string[];

  protected validate = (records: readonly string[]): void => {
    if (records.length === 0) {
      throw new Error('Import must contain at least one record');
    }
  };
}

export class CsvImporter extends DataImporter {
  protected readonly format = 'csv';

  protected parse = (input: string): readonly string[] =>
    input
      .split('\n')
      .map((record) => record.trim())
      .filter((record) => record.length > 0);
}

export class JsonImporter extends DataImporter {
  protected readonly format = 'json';

  protected parse = (input: string): readonly string[] => {
    const value: unknown = JSON.parse(input);

    if (!Array.isArray(value) || !value.every((record) => typeof record === 'string')) {
      throw new Error('JSON import must contain an array of strings');
    }

    return value;
  };
}
