<script>
  import { userRepoStore, didMount, folderHistoryStore } from './store.js';
  import { getFile, getFolder } from './github.js';

  import Paper from './symbols/Paper.svelte';
  import Folder from './symbols/Folder.svelte';
  import Arrow from './symbols/Arrow.svelte';

  async function handleClick(item) {
    console.log({ item })

    if (item.type === 'file') {
      const file = await getFile(item.url);

      $didMount.sandbox.setText(file);
    } else {
      $folderHistoryStore = [
        ...$folderHistoryStore, 
        { path: item.path, contents: $userRepoStore}
      ];

      const folder = await getFolder(item.url);
      userRepoStore.set(folder);
    }
  }

  function goBack() {
    const folder = $folderHistoryStore.pop()
    userRepoStore.set(folder.contents);

    $folderHistoryStore = $folderHistoryStore;
  }

  function getCurrentFolderName(foldersHistory) {
    if (!foldersHistory.length) return '';

    const lastFolder = foldersHistory[foldersHistory.length - 1];
    return lastFolder.path;
  }

  $: currentFolderName = getCurrentFolderName($folderHistoryStore)
</script> 

<div class="header">
  <div class="back-btn" on:click={goBack} class:active={$folderHistoryStore.length}>
    <Arrow />
  </div>
  <div>
    {currentFolderName}
  </div>
</div>

<div class="tree">
  {#each $userRepoStore as item}
    <div class="type" on:click={() => handleClick(item)}>
      {#if item.type === 'file'}
        <Paper isTypescript={item.name.endsWith('.ts')} />
      {:else}
        <Folder />
      {/if}
    </div>
    <div>{item.name}</div>
  {/each}
</div>

<style>
  :global(.header path) {
    fill: var(--text-color);
  }
  :global(.tree path) {
    fill: var(--bg);
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 20px;

    margin-bottom: 10px;
    text-align: left;
    color: var(--text-color);
  }

  .tree {
    text-align: left;
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-gap: 10px;
    align-items: center;
  }

  .type {
    background: var(--text-color);
    opacity: .2;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;

    display: flex;
    justify-content: center;
  }
  .type:hover {
    opacity: .4;
  }
  .type:active {
    transform: scale(.9);
  }

  .back-btn {
    padding: 5px;
    opacity: .2;
  }
  .back-btn.active {
    opacity: .5; 
  }
  .back-btn.active:hover {
    opacity: .7;
    cursor: pointer;
  }
  .back-btn.active:active {
    transform: scale(.9);
  }
</style>
