# PF2E Item Hacks

Very scary module that does scary but cool things. Run at your own risk, and always disable before reporting bugs.

## How to Install

### Manual Install
In Foundry setup, click on the Install Module button and put the following path in the Manifest URL. You could also use a path from a specific release.

`https://github.com/CarlosFdez/pf2e-persistent-damage/releases/latest/download/module.json`


## How to Build
It is recommended to use VSCode for the project, but anything else that can handle typescript will work. Node 14 or higher is required.

1) Open a terminal in the root folder
2) `npm install`
3) `npm run watch` for development or `npm run build` for a one time build
4) Build will be in the `dist` folder. Create a symlink to the foundry modules folder for development.

## Exporting types from the core system implementation

Add the following to the main pathfinder tsconfig.json and run `npx tsc`
```json
{
        "noEmit": false,
        "declaration": true,
        "declarationDir": "dist/types",
        "emitDeclarationOnly": true
}```

Copy dist/types to types/
Copy types to types/types (so that its types/types/foundry...)
Update types/en.json in this repo
Update types/global.d.ts
Update src/module/system/localize.d.ts imports to point to the localization files
