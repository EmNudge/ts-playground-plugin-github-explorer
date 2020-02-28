export async function getFolder(path) {
  const res = await fetch(path);
  const userRepo = await res.json();

  const cleanedRepo = userRepo
    .map(file => {
      const { url, name, path, type, download_url } = file;
      return { url, name, path, type, downloadUrl: download_url }
    })
    .sort(f1 => f1.type === "dir" ? -1 : 1);

  return cleanedRepo;
}

export async function getRepo({ repo, username }) {
  const repoName = repo.replace(' ', '-');

  const url = `https://api.github.com/repos/${username}/${repoName}/contents`;

  return await getFolder(url);
}

export async function getFile(url) {
  const res = await fetch(url);
  const file = await res.json();

  const rawUrl = file.download_url
  const res2 = await fetch(rawUrl);
  return await res2.text()
}