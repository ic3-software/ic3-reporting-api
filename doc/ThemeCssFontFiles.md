## CSS (Theme)

This page explains how to package and use CSS files when defining a new theme.

### Webpack Configuration

In order to import CSS file in the plugin definition, specific Webpack loaders have to te configured.
For example: `style-loader` and `css-loader`:

```json
    module: {
        rules: [{
            oneOf: [
                ...
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
```

Ensure to have the corresponding `npm` packages in the `devDependencies` of your `package.json`:

```json
    "css-loader": "6.7.1",
    "style-loader": "3.3.1",
```

Then within your plugin Typescript definition you can import CSS files as any other module
and use the CSS classes defined in this file:

```typescript
    import "myCss.css"
```

### Example: @fontsource

The Statos theme as defined in icCube is using the `lato` font from the `@fontsource` project
and package this font in the kit using its CSS definitions as following.

#### package.json

```json
    "css-loader": "6.7.1",
    "postcss": "8.4.14",
    "postcss-loader": "7.0.0",
    "style-loader": "3.3.1",
```

#### Webpack Configuration

```json
    module: {
        rules: [{
            oneOf: [
                ...
                {
                    test: /@fontsource.*\.css$/,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
```

#### Post CSS Configuration

icCube is using the `postcss-loader` to change the `font-display` descriptor (from `swap` to `block`)
as defined in `@fontsource`:

```js
    module.exports = {
        plugins: [
            {
                postcssPlugin: true,
                Declaration: {
                    'font-display': (node) => {
                        if (node.parent.name === 'font-face' && node.parent.type === 'atrule') {
                            node.value = 'block'
                        }
                    }
                }
            }
        ],
    };
```

#### Usage in the Theme Typescript Definition

```typescript
    import "@fontsource/lato/400.css";
    import "@fontsource/lato/700.css";


    typography: {

        fontFamily: "Lato",
        fontSize: 14,

        ...
```

_
