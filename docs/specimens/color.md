> The Color Specimen is used to document colors.

### Props

- __`value: string`__ defines the color
- `name: string` defines the color name
- `span: number[1–6]` width of the specimen
- `rows: array` An array of objects with two properties. If specified, a table will shown instead of the `name`


### Examples

#### Color swatch

The color swatches are useful to document single or important colors like the main brand scheme.

```color
span: 3
name: "Light Blue"
value: "#b0f6ff"
rows:
	- name: "HEX"
	  value: "#b0f6ff"
	- name: "RGB"
	  value: "rgb(176, 246, 255)"
	- name: "CMYK"
	  value: "31, 3, 0, 0"
	- name: "Pantone"
	  value: "304 C"
```

```color
span: 2
name: "Dark Blue"
value: "#2666a4"
```

```color
span: 1
name: "Bright Red"
value: "#ff5555"
```

````code
```color
span: 3
name: "Light Blue"
value: "#b0f6ff"
rows:
	- name: "HEX"
	  value: "#b0f6ff"
	- name: "RGB"
	  value: "rgb(176, 246, 255)"
	- name: "CMYK"
	  value: "31, 3, 0, 0"
	- name: "Pantone"
	  value: "304 C"
```

```color
span: 2
name: "Dark Blue"
value: "#2666a4"
```

```color
span: 1
name: "Bright Red"
value: "#ff5555"
```
````


### Color palette

Catalog also has a [Color Palette Specimen](/specimens/color-palette).
