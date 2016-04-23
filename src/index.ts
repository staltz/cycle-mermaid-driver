import {initialize, mermaidAPI} from 'mermaid';
import xs, {Stream} from 'xstream';

export function makeMermaidDriver(container: Element | string, mermaidOptions: Object): Function {
  initialize({mermaid: mermaidOptions});
  const rootElement: Element = typeof container === 'string' ?
    document.querySelector(container) :
    container;
  function mermaidDriver(dsl$: Stream<string>): Stream<any> {
    /* tslint:disable:no-empty */
    dsl$.addListener({
      next: (dsl) => {
        mermaidAPI.render('id1', dsl, (svgCode: string) => {
          rootElement.innerHTML = svgCode;
        });
      },
      error: () => {},
      complete: () => {},
    });
    /* tslint:enable:no-empty */
    return xs.create();
  }
  return mermaidDriver;
}
