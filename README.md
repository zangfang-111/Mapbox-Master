# MAPBOX MASTER

## What has been completed?
- ### [Implemented all required functionalities](https://github.com/zangfang-111/Ishak-Technical-Challenge/blob/main/REQUIREMENT.md)
    - Upload GeoJSON and display the plot on the map
    - Draw a building in the center of the plot
    - Coverage, floor height, floor number handle
    - Display statistics that map general information, land area, building area, building floor area, volume, building height
    - Wrote the unit test
    - [Deployed to Vercel](https://ishak-technical-challenge.vercel.app/)
    - [Deployed to Netlify](https://ishak-technical-challenge.netlify.app/)
    - Documented the code
- ### Additionally
    - Handle real-time render types for performance purposes
    - Handle map style change
    - Handle 3d building format
    - Cypress test (currently, I removed the dependencies for cypress because of the network problem to install it. plese try "yarn add cypress @cypress/react @cypress/webpack-dev-server --dev" before test it)
    - Storybook

## What I tried to show?
- React project folder structure
- Typescript use case
- Style use case both styled component and CSS
- Common style defines cases 
- MUI use case
- Redux + Saga + Redux toolkit use case
- Validation and exception handle (not fully)
- Notification use case to user friendly
- Lint config and auto link fix use case
- Git commit naming case
- [Git PR and description define case](https://github.com/zangfang-111/Ishak-Technical-Challenge/pull/1)
- React code-splitting feature for performance
- Comment with a tag like "//TODO": if it is a todo thing

## I was going to add it but didn't because of the time limit and test task case.
- CI/CD for deployment to Vercel automatically
- Beautiful styles
- Full unit test and storybook
- Husky to pre-commit
- Git rebase before merging for clean history
- Git tag create for release
- Git squash and merge for clean
- Performance improves
- SEO handle
- Font define

## What is not perfect for now in the implementation:
- When we try to change the floor number, generating the polygon with Turf and loading it in the map will take delay. so the issues appear as sometimes it is working with real-time sync, but sometimes, the sync is not so good working. Asyncronlly sync it, we need one more functionality. so I skip it for now.
