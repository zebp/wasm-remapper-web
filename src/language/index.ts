import * as monaco from "monaco-editor";

type WatLang = {
    keywords: string[],
    typeKeywords: string[],
}

const wat: monaco.languages.IMonarchLanguage | WatLang = {
    keywords: ["module",
        "table",
        "memory",
        "export",
        "import",
        "func",
        "result",
        "offset",
        "anyfunc",
        "type",
        "data",
        "start",
        "element",
        "global",
        "local",
        "mut",
        "param",
        "result"],
    typeKeywords: ["i32", "i64", "f32", "f64", "funcref", "call"],
    tokenizer: {
        root: [
            [/\$\w+/, "identifier"],
            [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],
            [/".*"/, "string"],
            [/\(;.*;\)/, "comment"],
            [/;;.*/, "comment"],
            [/(\w+)\./, { token: "type.keyword" }],
            [/[a-zA-Z_]\w*/, {
                cases: {
                    "@typeKeywords": "type.keyword",
                    "@keywords": { token: "keyword.$0" }
                }
            }]
        ]
    }
};

export function register() {
    monaco.languages.register({ id: "wat" });
    monaco.languages.setMonarchTokensProvider("wat", wat as unknown as monaco.languages.IMonarchLanguage);
    monaco.editor.defineTheme('vs-dark-wat', {
        base: 'vs-dark',
        inherit: true,
        colors: {},
        rules: [
            { token: 'identifier', foreground: 'DCDCAA' },
        ]
    });
}