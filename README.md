# The Fractal Way

You will note that the most of the answers of this test are solved using recursivenes.
That's because I think the problem is a reduce problem, and also looks elegant, because a small piece of code can create really complex data structures, like fractals.

## Transform Function

```typescript
function arrayToBinTreeNode(arr: InputArray | null): BinTreeNode | null
```

As the input always has the same shape and will result in the same output it's easy to infer that a recursive solution is the best option.
Apart of be simple and elegant, it allows an important perk: It allows us to have a resilient behavior. That means a benefit working with long data structures resolving all the correct nodes and just ignoring those with bad shape without breaking the whole process.

I also have to point that there's something new for me, and that's recursive in types. I think that's new because in past tries I always got an error like: `Type is circular calling itself`. Probably that's a good new feature at Typescript.
```typescript
type InputArray = [id: IdType, left?: InputArray | null, right?: InputArray | null];

interface BinTreeNode {
  id: IdType;
  left?: BinTreeNode | null;
  right?: BinTreeNode | null;
}
```

I keep the support for `null` values since the example is keeping it. Being an `undefined` element will be simply ignored.

## UI Structure

The App consist of 3 main sections: The [`InputFile`](#InputFile), an [`Editor`](#Editor), and the [`Output`](#Output) visualization. All are connected with redux to share the tree information without having explicit connections increasing the app complexity.

### The Store

The store logic is created with the help of the `@reduxjs/toolikt` library which brings all needed tools out of the box and in my point of view, the best way to write a reducer: the slice.

So my slice looks like this:
```typescript
// It's a function because that allow me two useful use cases:
// 1. Always get a brand new object (without referencing another one).
// 2. I can reuse it to pass as initialState and for a factory reset to my state. 
export const getTreeInitialState = () => ({
  error: null as string | null,
  fileName: null as string | null,
  tree: null as BinTreeNode | null,
  originalTree: null as BinTreeNode | null,
});

export const { actions: treeActions, name: treeReducerName, reducer: treeReducer } = createSlice({
  initialState: getTreeInitialState(),
  name: 'tree',
  reducers: {
    loadTree, // Action to load the content from an string input. It also validate if the input has a good shape.
    setTree, // Action to set a new tree when change in the Editor
    setError, // Action that set an Error message
    clearError, // Action to clear the error above
    clearTree: getTreeInitialState, // Factory Reset
  },
});
```

Along with the logic above, I'm also using selectors to have good order in all my data access, so if I need to change something I just need to tweak one single place.

### InputFile
> `src/InputFile`

My first try was about to use the [FileSystemHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle), the only problem was that Typescript still doesn't have full support with `File System Access API` and I have to use the old trusty of using an `input[type=file]` hidden in a `label[for=*]`.

But it can be easily switched once Typescript allows that support because both, the `onchange` event of the input and the `await showOpenFilePicker()` return a `File` type, and the `"Fetch"` action receive a `File` type.

The `"Fetch"` action uses a `FileReader` object to read the file as a text file, and then dispatch the `loadTree` action. That action will care of validating the input.

### Editor
> `src/Editor`

By far this was the most challenging part. Because I didn't want just a text area, I want to allow the user an editor experience. My first try was to highlight using PrismJS, the best library that I know for that purpose, but the worst documented so I waste time trying to find a plugin to perform what I was looking for.

After that, I try by making a `pre[contenteditable=true]`, it worked very well but has three problems:
1. Didn't respect the indent.
2. Lost caret position every change.
3. When I try to modify a big chunk it simply fails.

Finally, I nailed it by finding a really good library that takes care of all the editing stuff and the best part is that uses PrismJS for the code highlight.

The way it works is very simple: You edit the code, it gets validation from a simply `JSON.parse()`, if fails, will throw an error of invalid JSON; if everything is okay will send the new tree dispatching the action `setTree`. That will always pass to the [`Output`](#Output) a valid structure to render. Also, there's a track if the original tree has changed.

### Output
> `src/Output.tsx`

Output also was a problem that I decided to solve by using recursivenes, but now with components basically because is the same behavior as the transform function.

I have to point something that I'm not a big fan of putting two components in one file, but since the Node component is separated to be recursively called.

To get the smallest node in the depest path, I just simply add a tree path and the element with the longest path and without empty id.

### Some descarted ideas

- Use wasm to create the `arrayToBinTreeNode` function. I was thinking to use [AssemblyScript](https://www.assemblyscript.org/). Basically because is very similar to TypeScript, but my time is a limitation.
- Highlight the corresponding block of code of the highlighted node in the output
- Save the file. I would like to explore the `File System Access API`.
- Bad syntax highlight
- Create a manifest to make it work offline
- Enhance even more the UI (Again, time is a stopper)
- My favorite one, but the most expensive in time perspective: Use d3 for the data visualization instead of React Components.

## About my code

You will note that for import types I use `import type { FC } from 'react';` that's just a simple habit that I got working with nextjs and graphql because some times have circular imports and separate types from files help the interpreter to resolve them properly.

Another habit that I have is to keep as most as I can properties sorted alphabetically.

In general, I prefer to write code being very explicit with my intentions. That's why you probably will find some long variable names or not too short algorithms. And it's because I understand that we spend more time reading other people's code, to understand the flow; than writing new lines (with its exemptions). Compilator/Interpreter/Minifier/etc will take care to make the code smaller and ready to machine-read, and these days no one puts code live without any type of transpilation.

## Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
