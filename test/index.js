'use strict';
/* global describe, it, beforeEach */
let assert = require('assert');
let Cycle = require('@cycle/xstream-run').default;
let {makeMermaidDriver} = require('../lib/index');
let xs = require('xstream').default;

function createRenderTarget(id = null) {
  let element = document.createElement('div');
  element.className = 'cycletest';
  if (id) {
    element.id = id;
  }
  document.body.appendChild(element);
  return element;
}

describe('Mermaid driver', function () {
  it('should correctly render a simple flowchart given a stream of DSL', function (done) {
    function main() {
      return {
        Mermaid: xs.of(`
          graph TD;
              A-->B;
              A-->C;
              B-->D;
              C-->D;
        `)
      };
    }

    const {sinks, sources, run} = Cycle(main, {
      Mermaid: makeMermaidDriver(createRenderTarget())
    });

    let dispose;
    setTimeout(() => {
      assert.strictEqual(document.querySelectorAll('svg').length, 1);
      assert.strictEqual(document.querySelectorAll('g.edgePath').length, 4);
      assert.strictEqual(document.querySelectorAll('g.node').length, 4);
      dispose();
      done();
    }, 100);
    dispose = run();
  });
});
