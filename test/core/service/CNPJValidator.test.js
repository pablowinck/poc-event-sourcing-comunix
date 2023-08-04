import { CNPJValidator } from "../../../src/core/service/CNPJValidator.js";
import assert from 'node:assert';
import { describe, it } from 'node:test';

describe('CNPJValidator', () => {
    describe('#valid()', () => {
        it('should throw an error for invalid CNPJs', () => {
            assert.throws(() => CNPJValidator.valid('1234567890123'), Error);
            assert.throws(() => CNPJValidator.valid('123456789012345'), Error);
            assert.throws(() => CNPJValidator.valid('00000000000000'), Error);
            assert.throws(() => CNPJValidator.valid('11111111111111'), Error);
            assert.throws(() => CNPJValidator.valid('99999999999999'), Error);
            assert.throws(() => CNPJValidator.valid(''), Error);
            assert.throws(() => CNPJValidator.valid(null), Error);
            assert.throws(() => CNPJValidator.valid(undefined), Error);
        });

        it('should not throw an error for valid CNPJs', () => {
            assert.doesNotThrow(() => CNPJValidator.valid('11222333000181'), Error);
            assert.doesNotThrow(() => CNPJValidator.valid('11.222.333/0001-81'), Error);
        });

        it('should throw an error if CNPJ has non-numeric characters', () => {
            assert.throws(() => CNPJValidator.valid('11.222.333/0001-A1'), Error);
        });

        it('should throw an error if CNPJ has wrong check digits', () => {
            assert.throws(() => CNPJValidator.valid('11222333000180'), Error);
        });
    });
});