import assert from 'node:assert';
import { describe, it, mock } from 'node:test';
import { EventManager } from '../../../src/core/entity/EventManager.js';

describe('EventManager', () => {
    it('quando chamo o método emit, ele deve emitir o evento "event-proxy"', () => {
        const mockfn = mock.fn()
        const eventManager = new EventManager()
        eventManager.on('event-proxy', mockfn)
        eventManager.emit('user-created', { name: 'John Doe' })
        assert.strictEqual(mockfn.mock.calls.length, 1)
    });
})