<script>
  import FileTree from './FileTree.svelte';
  import { getRepo } from './github.js'
  import {
    userRepoStore,
    didMount,
    modelChanged,
    modelChangedDebounce
  } from "./store";

  $: {
    const {sandbox, container} = $didMount;
    console.groupCollapsed("didMount");
    console.info("sandbox", sandbox);
    console.info("container", container);
    console.groupEnd();
  }

  $: {
    const { sandbox, model } = $modelChanged;
    console.groupCollapsed("modelChanged");
    console.info("sandbox", sandbox);
    console.info("model", model);
    console.groupEnd();
  }

  $: {
    const { sandbox, model } = $modelChangedDebounce;
    console.groupCollapsed("modelChangedDebounce");
    console.info("sandbox", sandbox);
    console.info("model", model);
    console.groupEnd();
  }
  let isError = false;
  let isFetched = false;
  let githubName, githubRepo;

  async function handleGetRepo() {
    try {
      const repo = await getRepo({ username: githubName, repo: githubRepo })

      userRepoStore.set(repo);

      isFetched = true;
    } catch {
      isError = true;
    }
  }
</script>

<main>
  <h1>Show Github Code</h1>

  <br />

  {#if !isFetched} 
    <form on:submit|preventDefault={handleGetRepo}>
      <div class="form">
        <span>Github Username</span>
        <input type="text" placeholder="username here" bind:value={githubName} />

        <span>Github Repo</span>
        <input type="text" placeholder="repo name here" bind:value={githubRepo} />
      </div>

      <br />

      <input type="submit" placeholder="Fetch Repo" />
    </form>
    {#if isError}
      <div class="error">
        <p>There was an error fetching that repo.</p>
        <p>Make sure the the user and repo are spelled correctly.</p>
      </div>
    {/if}
  {:else}
    <FileTree />
  {/if}
</main>

<style>
  main {
    margin: 0 auto;
    text-align: center;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    --text-color: #0a0a0a;
    --bg: white;
    --drop-shadow: 2px 2px 3px 0px #2b2b2b66; 

    color: var(--text-color);
    background: var(--bg);
  }

  @media (prefers-color-scheme: dark) {
    main {
      --text-color: white;
      --bg: #202022;
      --drop-shadow: inset 2px 2px 3px 0px #0008;
    }
  }

  h1 {
    font-weight: 200;
    color: var(--text-color);
    margin: 3px;
  }

  .form {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    align-items: center;
    text-align: left;
  }

  .error {
    color: red;
  }

  input[type=text] {
    height: 20px;
    border: none;
    border-radius: .4rem;
    padding: 10px;
    font-size: 1.1rem;
    background: var(--bg);
    color: var(--text-color);
    outline: none;
    box-shadow: var(--drop-shadow);
    transition: box-shadow .3s;
  }

  input[type=submit] {
    border: none;
    background: none;
    color: dodgerblue;
    cursor: pointer;
    font-size: 1rem;
    padding: 3px 5px;
    margin: 5px;
    outline: none;
    border-radius: .3rem;
    transition: background-color .5s;
  }
</style>
