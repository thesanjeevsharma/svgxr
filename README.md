# svgxr

Convert SVGs to React components

---

#### How to use?

1. To install run:

```
npm i -g svgxr
```

2. Once the package is installed globally, run:

```
svgxr YourFile.svg
```

This command will create a React component with the same name as the input file.

Alternatively, you can also run:

```
npx svgxr YourFile.svg
```

##### Options

You can pass your own React component name by using the `o` flag:

```
svgxr YourFile.svg -o Hello
```

This will create a React component file with the name `Hello.jsx`.

To generate a TypeScript component, use the `t` flag:

```
svgxr YourFile.svg -o Hello -t ts
```

This will create a React component file with the name `Hello.tsx`.
