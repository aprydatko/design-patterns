import { describe, expect, it } from 'vitest';

import {
  CsvImporter,
  JsonImporter,
} from '@patterns/behavioral/template-method/template-method-pattern.js';

describe('Template Method Pattern', () => {
  it('reuses the workflow for different input formats', () => {
    const csvResult = new CsvImporter().run('Ada\nGrace');
    const jsonResult = new JsonImporter().run('["Ada", "Grace"]');

    expect(csvResult).toEqual({ format: 'csv', records: ['Ada', 'Grace'] });
    expect(jsonResult).toEqual({ format: 'json', records: ['Ada', 'Grace'] });
  });

  it('validates records after format-specific parsing', () => {
    expect(() => new CsvImporter().run('  \n')).toThrow('Import must contain at least one record');
    expect(() => new JsonImporter().run('{"name":"Ada"}')).toThrow(
      'JSON import must contain an array of strings',
    );
  });
});
