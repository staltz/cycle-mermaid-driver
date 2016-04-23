interface IMermaidAPI {
  render: (id: string, txt: string, cb: Function, container?: Element) => void;
}

interface IMermaidAll {
  initialize: (options: any) => void;
  mermaidAPI: IMermaidAPI;
}

declare module 'mermaid' {
  let MermaidAll: IMermaidAll;
  export = MermaidAll;
}
