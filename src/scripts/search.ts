export {};

interface SearchResult {
  data(): Promise<{
    url: string;
    meta: { title?: string };
    excerpt: string;
  }>;
}

interface Pagefind {
  options(options: { baseUrl: string }): Promise<void>;
  search(query: string): Promise<{ results: SearchResult[] }>;
}

const container = document.querySelector<HTMLElement>("#site-search-results");
const status = document.querySelector<HTMLElement>("#search-status");
const errorMessage = document.querySelector<HTMLElement>("#search-error");
const list = document.querySelector<HTMLOListElement>("#search-results");
const more = document.querySelector<HTMLButtonElement>("#search-more");

if (container && status && errorMessage && list && more) {
  const query = new URLSearchParams(window.location.search).get("q")?.trim() ?? "";
  const base = (container.dataset.baseUrl ?? "/").replace(/\/+$/, "") + "/";
  const pageSize = 10;
  let matches: SearchResult[] = [];
  let loaded = 0;

  const syncQuery = () => {
    document.querySelectorAll<HTMLInputElement>('.site-search-form input[name="q"]').forEach(input => {
      input.value = query;
    });
  };
  syncQuery();
  window.addEventListener("pageshow", () => {
    // History restoration can overwrite form values after pageshow.
    window.setTimeout(syncQuery, 0);
  });

  const reportError = (error: unknown) => {
    console.error("Site search failed:", error);
    errorMessage.hidden = false;
    status.textContent = "Search is unavailable. Please try again.";
  };

  const loadMore = async () => {
    more.disabled = true;
    errorMessage.hidden = true;
    list.setAttribute("aria-busy", "true");
    try {
      const results = await Promise.all(matches.slice(loaded, loaded + pageSize).map(match => match.data()));
      const fragment = document.createDocumentFragment();
      for (const result of results) {
        const item = document.createElement("li");
        const heading = document.createElement("h2");
        const link = document.createElement("a");
        link.href = result.url;
        link.textContent = result.meta.title || result.url;
        heading.append(link);
        const excerpt = document.createElement("p");
        // Pagefind HTML-escapes source text before adding its search highlighting.
        excerpt.innerHTML = result.excerpt;
        item.append(heading, excerpt);
        fragment.append(item);
      }
      const firstNewLink = fragment.querySelector("a");
      const wasExpanded = loaded > 0;
      list.append(fragment);
      loaded += results.length;
      status.textContent = matches.length
        ? `Showing ${loaded} of ${matches.length} results for "${query}".`
        : `No results for "${query}". Try different or fewer words.`;
      more.hidden = loaded >= matches.length;
      if (wasExpanded) firstNewLink?.focus();
    } catch (error) {
      reportError(error);
    } finally {
      more.disabled = false;
      list.removeAttribute("aria-busy");
    }
  };

  const search = async () => {
    if (!query) {
      status.textContent = "Enter a search term to find pages on this site.";
      return;
    }
    status.textContent = `Searching for "${query}"...`;
    try {
      const pagefind: Pagefind = await import(/* @vite-ignore */ `${base}pagefind/pagefind.js`);
      await pagefind.options({ baseUrl: base });
      const response = await pagefind.search(query);
      matches = response.results;
      await loadMore();
    } catch (error) {
      reportError(error);
    }
  };

  more.addEventListener("click", loadMore);
  void search();
}
