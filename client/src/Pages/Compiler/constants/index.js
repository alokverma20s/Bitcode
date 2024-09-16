export const LANGUAGE_VERSIONS = {
    cpp: "10.2.0",
    // javascript: "18.15.0",
    // python: "3.10.0",
    // java: "15.0.2",
    // c: "10.2.0",
}

export const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name){\nconsole.log("Hello, " + name);\n}\n\n// Call the function\n\ngreet("World");`,
    python: `\ndef greet(name):\n    return "Hello, " + name\n\n# Call the function\n\nprint(greet("World"))`,
    java: `\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    c: `\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}`,
    cpp: `\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`,
}