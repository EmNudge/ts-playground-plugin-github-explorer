// @ts-ignore
import App from "./svelte/App.svelte";
import {
  didMount,
  modelChanged,
  modelChangedDebounce,
  willUnmount,
  didUnmount
} from "./svelte/store";

const customPlugin: import("./vendor/playground").PlaygroundPlugin = {
  id: "github-explorer",
  displayName: "Github Explorer", // The tab label
  willMount: (sandbox, container) => {
    // Not used
  },
  didMount: (sandbox, container) => {
    didMount.set({ sandbox, container });
    // Mount the app and pass in the store objects as props
    new App({
      target: container,
      props: { didMount, modelChanged, modelChangedDebounce }
    });
  },
  modelChanged: (sandbox, model) => {
    modelChanged.set({ sandbox, model });
  },
  modelChangedDebounce(sandbox, model) {
    modelChangedDebounce.set({ sandbox, model });
  },
  willUnmount: (sandbox, container) => {
    willUnmount.set({ sandbox, container });
  },
  didUnmount: (sandbox, container) => {
    didUnmount.set({ sandbox, container });
  }
};

export default customPlugin;
