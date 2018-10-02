# Header Components

These components are helpers for creating custom header renderers. 
You don't need theseif you are just changing the default text, 
but they will be helpful if you are adding custom components into your headers.

This example uses custom header renderers that let you hide columns.

<!-- STORY -->


## Prop Types

### HeaderContainer

This component is styled to take up the full width and height of its parent, 
and is a flexbox container that renders top to bottom. This makes it easy to 
emulate the top vertical alignment of the parent `th`.

Name | Type | Description
:--- | :--- | :---
className? | string | Optional extra class name applied to this element
style?     | object | Optional style object applied to this element

### HeaderTitle

This component renders the title while respecting alignment and overflow. It takes
the same properties as a `HeaderRenderer`. By default it renders the `header.title` 
property, but this can be overridden by providing explicit `children`.

```jsx
<HeaderTitle header={props.header} col={props.col} overflow={props.overflow}>
  {whatever}
</HeaderTitle>
```
